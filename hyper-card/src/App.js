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
// import { SpotifySearch } from './components/pages/userPageComponents/spotify/spotifysearch';
// import { TwitchUserSearch } from './components/pages/userPageComponents/twitch/twitchusersearch';
import { TwitterSearch } from './components/pages/userPageComponents/twitter/twittersearch';
import {SelectColors} from './components/pages/userPageComponents/stylizers/selectcolor';
export const HyprCrd = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<Landing/>}/>
            <Route path = "/signup" element = {<SignUp/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/u/:id" element = {<UserPage/>}/>
            <Route path = "/forgotpassword" element = {<ForgotPassword/>}/>
            {/* <Route path = "/twitchtest" element = {<TwitchUserSearch/>}/>
            <Route path = "/spotifytest" element = {<SpotifySearch/>}/> */}
            <Route path = "/colortest" element = {<SelectColors/>}/>
            <Route path = "/twittertest" element = {<TwitterSearch/>}/>
            <Route path = "*" to = "/nopage" element = {<NoPage/>}/>

            
          </Routes>
        </BrowserRouter>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HyprCrd/>);