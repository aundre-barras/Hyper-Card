
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


// backend imports 
import {useState} from "react";

import { sendPasswordResetEmail, getAuth } from 'firebase/auth';


export const ForgotPassword = () => {
    const [isSent, setIsSent] = useState(false);

    const [email, setEmail] = useState("");
    const auth = getAuth();

    const sendEmail = async () => {

        try {

            await sendPasswordResetEmail(auth, email);
            setIsSent(true);

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

                {isSent ? 
                    <div>
                    <Box
                        sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                            <Typography style={{
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
                            </Typography>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 1 }}
                                onClick = {sendEmail}
                            >
                                resend email
                            </Button>

                            <Link to="/login" style={{
                                color:"rgba(0, 0, 0, 0.75)",
                                fontFamily:"Open Sans",
                                fontWeight:300,
                                fontSize:"12px"
                                }}>
                                Sign in
                            </Link>

                            <Link to="/signup" style={{
                                color:"rgba(0, 0, 0, 0.75)",
                                fontFamily:"Open Sans",
                                fontWeight:300,
                                fontSize:"12px"
                                }}>
                                Don't have an account? Sign up.
                            </Link>
                    </Box>
 
                    </div> : 
                    
                    <div>

                    <Box
                        sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    > 
                    <TextField
                        autoComplete="email"
                        name="email"
                        required
                        fullWidth
                        id="enterEmail"
                        label="Email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 1 }}
                        onClick = {sendEmail}
                    >
                        Email Me Reset
                    </Button>


                        <Link to="/signup" style={{
                            color:"rgba(0, 0, 0, 0.75)",
                            fontFamily:"Open Sans",
                            fontWeight:300,
                            fontSize:"12px"
                            }}>
                            Don't have an account? Sign up.
                        </Link>


                        <Link to="/login" style={{
                                color:"rgba(0, 0, 0, 0.75)",
                                fontFamily:"Open Sans",
                                fontWeight:300,
                                fontSize:"12px"
                                }}>
                                Remembered? Sign in.
                        </Link>
                    </Box>
                    </div>
                }








            </Box>

            </Container>
        </ThemeProvider>
    );
}