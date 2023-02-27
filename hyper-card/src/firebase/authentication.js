import { 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, 
    } from "firebase/auth";
import { auth } from "./firebase-config";

export const createUser = async (registerEmail, registerPassword) => {
    try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
};

export const loginUser = async (loginEmail, loginPassword) =>{
    try {
        const user = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }
};

export const signoutUser = async () => {
    await signOut(auth);
}

export const authStateChange  = async (setUser) => onAuthStateChanged(auth, (currentUser) => {
    return setUser(currentUser);
});

