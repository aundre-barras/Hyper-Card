// Front end imports that will need to be set away from this
// ---------------------------------------
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import logoCircle from '../components/media/logo-circle.png'
import { Link } from 'react-router-dom';
import {theme} from "./theme";
// --------------------------------------

// Backend integration imports
import {React, useState} from "react";

import {useNavigate} from "react-router-dom";

import {auth, 
        db, 
        googleProv
        } from "./firebase-config";

import {
    getDocs, 
    doc, 
    collection, 
    query, 
    where,
    setDoc,
    Timestamp,
    } from "firebase/firestore";

import { 
        createUserWithEmailAndPassword, 
        onAuthStateChanged, 
        signInWithPopup,
        sendEmailVerification
        } from 'firebase/auth';





export const SignUp = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signUpWithGoogle = async () => {

        try {

            await signInWithPopup(auth, googleProv);
            await sendEmailVerification(auth.currentUser);

            onAuthStateChanged(auth, (user) => {
                
                const users = collection(db, "users");

                setDoc(doc(users, user.uid), {
                    firstname: user.displayName.substring(0, user.displayName.indexOf(" ")),
                    lastname: user.displayName.substring(user.displayName.indexOf(" ") + 1,user.displayName.length),
                    birthday: Timestamp.fromDate(new Date(Date.now())),
                    displayname: user.email.substring(0, user.email.indexOf("@")),
                    description: "",
                    colors: {
                        button_color: "#4c697d",
                        main_color: "#eeeeee",
                        secondary_color: "#96aebc",
                        text_color: "#96aebc"
                    },
                    profile_image: "gs://hyper-card.appspot.com/profile_images/ghost_icon.png",
                    content : [],
                    theme : {
                        background_color: "#eeeeee",
                        background: "",
                        background_position: "",
                        background_size: "",
                        background_repeat: ""
                    }
                    
                });

                navigate("/u/" + user.email.substring(0, user.email.indexOf("@")));

            });
        } catch (error) {
            console.error(error);
        }

    }

    const isDisplayNameInUse = async () => {

        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("displayname", "==", username));
            
        const userQuerySnapshot = await getDocs(userQuery);
        if (userQuerySnapshot.empty) return true;
        return false;
    }

    const isPasswordConfirmed= async () => { return password === confirmPassword}

    const correctBirthday = async () => {
        const thirteenYearsAgo = new Date();
        console.log(Timestamp.fromDate(new Date(birthday)).seconds);
        console.log(thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13));
        if (Timestamp.fromDate(new Date(birthday)).seconds >= thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13)){
            console.log("huh")
            return true;
        }
        else{
            return false;
        }
    }

    const signup = async () => {

        try {
            // if (! await correctBirthday()) {return window.alert("birthday to young :(");}
            if (! await isDisplayNameInUse()) { return window.alert("username is already in use."); }

            else if (! await isPasswordConfirmed()) { return window.alert("Please confirm password."); }

            else {                
                await createUserWithEmailAndPassword(auth, email, password);

                await sendEmailVerification(auth.currentUser);

                onAuthStateChanged(auth, (user) => {

                    const users = collection(db, "users");

                    setDoc(doc(users, user.uid), {
                        firstname: firstName,
                        lastname: lastName,
                        birthday: Timestamp.fromDate(new Date(birthday)),
                        displayname: username,
                        description: "",
                        colors: {
                            button_color: "#4c697d",
                            main_color: "#eeeeee",
                            secondary_color: "#96aebc",
                            text_color: "#eeeeee"
                        },
                        profile_image: "gs://hyper-card.appspot.com/profile_images/ghost_icon.png",
                        content : [],
                        theme : {
                            background_color: "#eeeeee",
                            background: "",
                            background_position: "",
                            background_size: "",
                            background_repeat: ""
                        }
                    });
                    
                    navigate("/u/" + username);
                    return;
                });
            }

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
            <img src={logoCircle} style = {{ width: "150px", height: "150px" }}/> 
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

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="birthday"
                    label="Birthday"
                    name="birthday"
                    autoComplete="birthday"
                    type="date"
                    InputLabelProps={{ shrink: true, required: true }}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username "
                    onChange={(e) => setUserName(e.target.value)}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </Grid>

            </Grid>

            <Button
                type="submit"
                halfWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick = {signUpWithGoogle}
            >
                Sign up With Google
            </Button>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick = {signup}
            >
                Create Account
            </Button>

            <Grid container justifyContent="flex-end">
                <Grid item>
                <Link to="/login" style={{
                    color:"rgba(0, 0, 0, 0.75)",
                    fontFamily:"Open Sans",
                    fontWeight:300,
                    fontSize:"12px"
                    }}>
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </Box>

        </Container>
    </ThemeProvider>
    );
}
