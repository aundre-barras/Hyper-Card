import { auth, providerGoogle, db} from "../firebase-config.js";
import { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  createUserWithEmailAndPassword} 
from "firebase/auth";

import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const GoogleAuth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      cookies.set("hyprcrd-auth", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};

export const LoginAuth = ({setIsAuth}) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const UserLogin = async () => {
    try{
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      auth.onAuthStateChanged((user) => {
        if (user){
          cookies.set("hyprcrd-auth", user.refreshToken);
          setIsAuth(true);
        }
      });
    } catch(error){
      return(error.message);
    };
    
  };
  return (
    <div className = "login-auth">

      <h3> Login </h3>
      <input
        placeholder="Email..."
        onChange={(event) => {
          setLoginEmail(event.target.value);
        }}
      />
      <input
        placeholder="Password..."
        onChange={(event) => {
          setLoginPassword(event.target.value);
        }}
        
      />
      <button onClick={UserLogin}>Login</button>

    </div>

  );
}

export const Register = ({setIsAuth}) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const userRef = collection(db, "users");



  const RegisterUser = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      if (registerEmail == "" || registerPassword == "" || registerUsername == "" || registerFirstName == "" || registerLastName == "") return;
      await addDoc(userRef, {
        created_account: serverTimestamp(),
        user_name: registerUsername,
        first_name: registerFirstName,
        last_name: registerLastName,
        created_account: serverTimestamp(),
        email: registerEmail
      })
      auth.onAuthStateChanged((user) => {
        if (user){
          cookies.set("hyprcrd-auth", user.refreshToken);
          setIsAuth(true);
        }
      });

    } catch (error) {
      console.log(error.message);
    } 
  };
  return (

    <div>
        <h3> Register User </h3>
        <input
          placeholder="Email"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
      
        <input
          placeholder="Password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <input
          placeholder="Username"
          onChange={(event) => {
            setRegisterUsername(event.target.value);
          }}
        />
        <input
          placeholder="First Name"
          onChange={(event) => {
            setRegisterFirstName(event.target.value);
          }}
        />
        <input
          placeholder="Last Name"
          onChange={(event) => {
            setRegisterLastName(event.target.value);
          }}
        />

        <button onClick={RegisterUser}>Create User</button>
      </div>
  )
}