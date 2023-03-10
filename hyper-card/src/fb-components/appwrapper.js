import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth}) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("hyprcrd-auth");
    setIsAuth(false);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1> hyprcrd </h1>
      </div>

      <div className="app-container">{children}</div>
      {isAuth && (
        <div className="sign-out">
          <button onClick={signUserOut}> Sign Out</button>
        </div>
      )}
    </div>
  );
};