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
import logoCircle from '../media/logo-circle.png'
import { Link } from 'react-router-dom';
import {theme} from "./theme";
// --------------------------------------

// Backend integration imports
import {React, useState} from "react";
import {db} from "../firebase-config";
import {collection, query, limit, where} from "firebase/firestore";


export const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signup = async () => {
        
        try {
            console.log(birthday);
        } catch (error) {
            
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
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Create Account With Google
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