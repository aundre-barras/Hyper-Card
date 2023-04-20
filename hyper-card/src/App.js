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
import { SpotifySearch } from './components/pages/userPageComponents/spotify/spotifysearch';

export const HyprCrd = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<Landing/>}/>
            <Route path = "/signup" element = {<SignUp/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/u/:id" element = {<UserPage/>}/>
            <Route path = "/forgotpassword" element = {<ForgotPassword/>}/>
            <Route path = "/spotifytest" element = {<SpotifySearch/>}/>
            <Route path = "*" to = "/nopage" element = {<NoPage/>}/>
          </Routes>
        </BrowserRouter>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HyprCrd/>);