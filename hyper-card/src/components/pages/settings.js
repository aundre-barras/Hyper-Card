import { React, Fragment, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
  useParams,
  useNavigate
} from "react-router-dom"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { TopMenu } from './userPageComponents/mainUserComponents/topmenu';
import {theme} from "./theme";
import { GlobalStyles } from "@mui/material";
import { auth } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import {db, storage} from "./firebase-config";

export const Settings = (props) => {
  const [isAuth, setIsAuth] = useState();
  const [userData, setUserData] = useState([]);

  const { id } = useParams();

  const getAuth = async () => {
    try {
      const userAuth = auth.currentUser;
      if (userAuth) { // check if userAuth is not null
        console.log(userAuth.uid);
        const usersRef = doc(db, "users", userAuth.uid);
        const snap = await getDoc(usersRef);
        if (snap.data().displayname === id) {
          setUserData(snap.data());
          setIsAuth(true);
        } else {
          // handle case where displayname does not match
        }
      } else {
        // handle case where there is no authenticated user
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  

  useEffect(() => { 
    getAuth();
  }, [id, isAuth]);


  return (
    <div>
      <GlobalStyles
      styles = {{
        body: {
          background: "white",
          backgroundAttachment: "fixed",
        }
      }}
    />
    <ThemeProvider theme={theme}>
    <GlobalStyles
            styles = {{
              body: {
                backgroundImage: "white",
                backgroundAttatchment: "relative",
                overflow: "hidden",
                width: "100%",
                minHeight: "100vh"
              }
            }}
          />
      <TopMenu userData={userData} isAuth={isAuth}/>
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
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                <text style={{
                    "fontFamily":"'Outfit'",
                    "fontWeight":"700",
                    "fontSize":"48px",
                    "lineHeight":"60px",
                    "letterSpacing":"-0.05em",
                    "color":"#000000",
                }}>
                    settings
                </text>
                </Grid>
              <Grid item >
              <text style={{
                "fontFamily":"'Outfit'",
                "fontWeight":"700",
                "fontSize":"24px",
                "lineHeight":"30.24px",
                "letterSpacing":"-0.05em",
                "color":"#000000",
              }}>
                change email
            </text>
              </Grid>
              <Grid item xs={8}>
                <TextField
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                // onChange={(e) => setEmail(e.target.value)}
                size="small"
                InputProps={{sx:{height:"37px", borderRadius:"35px"}}}
                />
              </Grid>
              <Grid item xs={4} >
                <Button 
                type="submit"
                variant="outlined"
                // onClick={}
                sx={{
                  height:"37px",
                  borderRadius:"35px",
                  color:"#000000",
                  textTransform:"lowercase",
                }}
                >
                  submit
                </Button>
              </Grid>
              <Grid item >
              <text style={{
                "fontFamily":"'Outfit'",
                "fontWeight":"700",
                "fontSize":"24px",
                "lineHeight":"30.24px",
                "letterSpacing":"-0.05em",
                "color":"#000000",
              }}>
                update password
            </text>
              </Grid>
              <Grid item xs={8}>
                <TextField
                id="previousPassword"
                label="previous password"
                name="previousPassword"
                autoComplete="password"
                // onChange={}
                size="small"
                InputProps={{sx:{height:"37px", borderRadius:"35px"}}}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                id="newPassword"
                label="new password"
                name="newPassword"
                autoComplete="newPassword"
                // onChange={(e) => setPassword(e.target.value)}
                size="small"
                InputProps={{sx:{height:"37px", borderRadius:"35px"}}}
                />
              </Grid>
              <Grid item xs={4} >
                <Button 
                type="submit"
                variant="outlined"
                // onClick={}
                sx={{
                  height:"37px",
                  borderRadius:"35px",
                  color:"#000000",
                  textTransform:"lowercase",
                }}
                >
                  submit
                </Button>
              </Grid>
            </Grid>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}