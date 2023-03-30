import './App.css';
import React from 'react';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Landing} from "./components/pages/landing";
import {SignUp} from "./components/pages/signup";

export const HyprCrd = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Landing/>}/>
          <Route path = "/signup" element = {<SignUp/>}/>
        </Routes>
      </BrowserRouter>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HyprCrd/>);