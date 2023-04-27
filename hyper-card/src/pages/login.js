import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import logoCircle from '../components/media/logo-circle.png'
import { Link } from 'react-router-dom';
import {theme} from "./theme";
import {React, useEffect, useState} from "react";
// 

// backend integration imports
import {signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {auth, db, googleProv} from "./firebase-config";



export const Login = () => {
  
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuth, setIsAuth] = useState("");

    const loginWithGoogle = async () => {
      try {
        const userCredential = await signInWithPopup(auth, googleProv);
        const usersRef = doc(db, "users", userCredential.user.uid);
        const snap = await getDoc(usersRef);
        navigate ("/u/" + snap.data().displayname);

      } catch (error) {

        console.error(error);
        
      }

    };


    const alreadyLoggedIn = async () => {

      try {

        onAuthStateChanged(auth, (user) => {
          if (user){
            setIsAuth(user.uid);
          }
      
        });
        if (isAuth){
          const usersRef = doc(db, "users", isAuth);
          const snap = await getDoc(usersRef);
          navigate ("/u/" + snap.data().displayname);
        }


      } catch (error) {
        console.error(error);
      }


    }
    useEffect(() => {
      alreadyLoggedIn();
    }, [isAuth])

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            const usersRef = doc(db, "users", userCredential.user.uid);
            const snap = await getDoc(usersRef);
          
            navigate ("/u/" + snap.data().displayname);

        } catch (error) {
            console.error(error);
        }
    }


    return (
      
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              
            }}
          >
            <img src={logoCircle} style={{ width: "150px", height: "150px" }}/>
            <Typography variant='h1' color="#5B7ABC" 
            component={Link} to="/" 
            style={{ textDecoration:"none"}}>
              hypr
              <span style={{color:"#1B1B1B"}}>crd</span>
            </Typography>
            <text style={{
              fontFamily: "Montserrat",
              fontWeight: 400,
              fontSize: "16px",
              color: "#1B1B1B"
            }}>
              a visual resume for creatives.
            </text>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                halfWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick = {loginWithGoogle}
              >
                Sign In With Google
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick = {login}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgotpassword" style={{
                    color:"rgba(0, 0, 0, 0.75)",
                    fontFamily:"Open Sans",
                    fontWeight:300,
                    fontSize:"12px"
                    }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" style={{
                    color:"rgba(0, 0, 0, 0.75)",
                    fontFamily:"Open Sans",
                    fontWeight:300,
                    fontSize:"12px"
                    }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
        </Container>
      </ThemeProvider>
    );
  }

  