import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCUWBfpN8eEslVAok6A4KqWfR16x3LE2Qg",
  authDomain: "hyper-card.firebaseapp.com",
  projectId: "hyper-card",
  storageBucket: "hyper-card.appspot.com",
  messagingSenderId: "88905218781",
  appId: "1:88905218781:web:30dedda14122abf022f934",
  measurementId: "G-MJE2HGHMBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Google provider 
export const googleProv = new GoogleAuthProvider();

// call this to connect to the db
export const db = getFirestore(app);
