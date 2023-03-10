import React, { useState, useEffect } from "react";
import { GoogleAuth, LoginAuth, Register} from "./fb-components/authentication.js";
import { AppWrapper } from "./fb-components/appwrapper.js";
import Cookies from "universal-cookie";
import "./App.css";

const cookies = new Cookies();

function HyprCrd() {
  const [isAuth, setIsAuth] = useState(cookies.get("hyprcrd-auth"));

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
      >
        <LoginAuth setIsAuth={setIsAuth}/>
        <GoogleAuth setIsAuth={setIsAuth} />
        <Register setIsAuth = {setIsAuth}/>
        
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth}>
        Welcome back!
    </AppWrapper>
  );
}

export default HyprCrd;