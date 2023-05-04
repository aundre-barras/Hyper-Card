import {React, Fragment, useState, useEffect} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom"

import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";

import {getDownloadURL, ref, listAll} from "firebase/storage";

import {db, storage} from "./firebase-config";


import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebase-config';
//
import {TopMenu} from './userPageComponents/mainUserComponents/topmenu';
import { ProfileArea } from './userPageComponents/mainUserComponents/profilearea';


export const UserPage = (props) => {
    const [isMenuOpen , setMenuOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const navigate = useNavigate();
    const userContent = useParams();

    // userData: State to hold data of user
    // userProfilePhoto: used to store users profile image thats stored in firebase storage

    const [userData, setUserData] = useState([]);
    const [userProfilePhoto, setUserProfilePhoto] = useState("");

    // References to collections of database and storage

    const usersRef = collection(db, "users");
    const imagesListRef = ref(storage, "profile_images/");
    
    // Calls this everytime an update is changed and on initial rendering 
    // (technically does it after the first render but this is intentional)

    useEffect(() => {
        getUserData();
    }, []);

    const getUserImage = async () => {
        const storageRef = ref(storage, );
        return;

    }
    
    // Gets users data from Firestore (db) 
    const getUserData = async () => {
        try {
          const userQuery = query(usersRef, where("displayname", "==", userContent.id));
      
          const unsubscribe = onSnapshot(userQuery, (snapshot) => {
            if (snapshot.empty) {
              navigate("/login");
              setTimeout(window.alert("User does not exist!"), 1500);
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
      
          return unsubscribe; // optional, if you want to unsubscribe when component unmounts
        } catch (error) {
          console.error(error);
        }
      };

    const setSubMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    return(
        <Fragment>
            <TopMenu/>
            <ProfileArea
               userData = {userData} isAuth = {isAuth} isEdit={isEdit} setIsEdit={setIsEdit}/>
        </Fragment>
    )
}
