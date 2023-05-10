import {
    useParams,
    useNavigate,
    useLocation,
} from "react-router-dom"

import { collection, query, where, onSnapshot } from "firebase/firestore";


import {db, storage} from "./firebase-config";


import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebase-config';
//
import { TopMenu } from './userPageComponents/mainUserComponents/topmenu';
import { ProfileArea } from './userPageComponents/mainUserComponents/profilearea';
import { Fragment, useEffect, useState } from "react";


export const UserPage = () => {

  const [isAuth, setIsAuth] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();

  const getUserData = async () => {
    try {
      
      const userQuery = query(collection(db, "users"), where("displayname", "==", id));

      const unsubscribe = onSnapshot(userQuery, (snapshot) => {


        const filteredData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        
        if (filteredData.length === 0) {
          setIsAuth(false);
          setUserData([]);
        } else {
          onAuthStateChanged(auth, (user) => {
            if (user && filteredData[0].id === user.uid) {
              setIsAuth(true);
            } else {
              setIsAuth(false);
            }
          });
          setUserData(filteredData);
        }
        
      });
      return unsubscribe;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      window.location.reload();
    });
  }, []);

  return (
    <Fragment>
      <TopMenu userData={userData} isAuth={isAuth}/>
      <ProfileArea userData={userData} isAuth={isAuth} isEdit={isEdit} setIsEdit={setIsEdit} />
    </Fragment>
  );
};
