import './App.css';
import React from 'react';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Landing} from "./components/pages/landing";
import {SignUp} from "./components/pages/signup";
import {Login} from "./components/pages/login";
import {UserPage} from "./components/pages/userpage";
import {NoPage} from "./components/pages/nopage";
import {ForgotPassword} from "./components/pages/forgotpassword";
import { Settings } from "./components/pages/settings";
import {QRCode} from "./components/pages/qrcode";

export const HyprCrd = () => {
  return (
     <div>
        <BrowserRouter>
          <Routes >
            <Route path = "/" element = {<Landing/>}/>
            <Route path = "/signup" element = {<SignUp/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/u/:id" element = {<UserPage/>}/>
            <Route path = "/forgotpassword" element = {<ForgotPassword/>}/>
            <Route path = "u/:id/settings" element = {<Settings/>}/>
            <Route path = "u/:id/qrcode" element = {<QRCode/>}/>
            <Route path = "*" to = "/nopage" element = {<NoPage/>}/>


          </Routes>
        </BrowserRouter>
      </div>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HyprCrd/>);