import { React, Fragment, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {ThemeProvider } from '@mui/material/styles';
import {
  useParams,
  useNavigate
} from "react-router-dom"
import { TopMenu } from './userPageComponents/mainUserComponents/topmenu';
import {theme} from "./theme";
import { GlobalStyles } from "@mui/material";
import { auth } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import {db} from "./firebase-config";

export const Settings = (props) => {
  const [isAuth, setIsAuth] = useState();
  const [newEmail, setNewEmail] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getAuth = async () => {
    try {
      const userAuth = auth.currentUser;
      if (userAuth) { // check if userAuth is not null
        const usersRef = doc(db, "users", userAuth.uid);
        const snap = await getDoc(usersRef);
        if (snap.data().displayname === id) {
          setUserData(snap.data());
          setIsAuth(true);
        } else {
          navigate("/login");
          window.location.reload();
        }
      } else {
        navigate("/login");
        window.location.reload();
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
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                size="small"
                InputProps={{sx:{height:"37px", borderRadius:"35px"}}}
              />
              </Grid>
              <Grid item xs={4} >
              <Button 
                type="submit"
                variant="outlined"
                onClick={async () => {
                  try {
                    const auth = getAuth();
                    await auth.updateEmail(auth.currentUser, newEmail);
                    alert("Email updated successfully!");
                  } catch (error) {
                    console.error(error);
                    alert("Error updating email. Please try again later.");
                  }
                }}
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