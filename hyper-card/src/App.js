import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Landing from './components/pages/Landing';
import ForgotPassword from './components/pages/ForgotPassword';

function App() {
  return ( 
  <Router>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="forgotpassword" element={<ForgotPassword/>}/>
    </Routes>
  </Router>
  );
}

export default App;
