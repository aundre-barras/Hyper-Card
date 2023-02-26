import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
 // empty for now until database and/or repo is secure.
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);