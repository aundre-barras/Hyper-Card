import {React, Fragment, useState, useEffect} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom"

import { collection, query, where, onSnapshot } from "firebase/firestore";


import {db, storage} from "./firebase-config";


import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebase-config';
//
import {TopMenu} from './userPageComponents/mainUserComponents/topmenu';
import { ProfileArea } from './userPageComponents/mainUserComponents/profilearea';


export const UserPage = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userQuery = query(collection(db, "users"), where("displayname", "==", id));

        const unsubscribe = onSnapshot(userQuery, (snapshot) => {
          if (snapshot.empty) {
            navigate("/login");
            window.location.reload();
            return;
          }

          const filteredData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          onAuthStateChanged(auth, (user) => {
            if (user && filteredData[0].id === user.uid) {
              setIsAuth(true);
            }
          });

          setUserData(filteredData);
          
        });

        return unsubscribe;
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, [id]); // add id as a dependency

  const setSubMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <Fragment>
      <TopMenu />
      <ProfileArea userData={userData} isAuth={isAuth} isEdit={isEdit} setIsEdit={setIsEdit} />
    </Fragment>
  );
};
