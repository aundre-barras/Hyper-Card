
// front end imports 
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import logoCircle from '../media/logo-circle.png';
import menu from '../media/menu.png';
import { Link } from 'react-router-dom';
import {theme} from "./theme";

import { userEmail } from './forgotpassword';
// backend imports 
import {useState} from "react";

import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import {auth} from "../firebase-config";
export const ResendEmail = () => {
    
    const email = userEmail[0];

    const auth = getAuth();

    const sendEmail = async () => {

        try {
            console.log(email);
            await sendPasswordResetEmail(auth, email);

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

                <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
                >
                    <text style={{
                        fontFamily: "Outfit",
                        fontWeight: 600,
                        fontSize: "20px",
                        lineHeight: "25px",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        color: "#000000"
                    }}>
                        please check your email and spam folder 
                        to follow the password reset process
                    </text>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 1 }}
                        onClick = {sendEmail}
                    >
                        resend email
                    </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}