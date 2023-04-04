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


export const ForgotPassword = () => {


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
                <Grid container spacing={2}>

                    <TextField
                    
                        autoComplete="email"
                        name="email"
                        required
                        fullWidth
                        id="enterEmail"
                        label="Email"
                        autoFocus
                    />


                </Grid>
                </Box>

                <Button
                    type="submit"
                    halfWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Email Me Reset
                </Button>

                <Grid item>
                    <Link to="/signup" style={{
                        color:"rgba(0, 0, 0, 0.75)",
                        fontFamily:"Open Sans",
                        fontWeight:300,
                        fontSize:"12px"
                        }}>
                        Don't have an account? Sign up
                    </Link>
                </Grid>

            </Box>

            </Container>
        </ThemeProvider>
    );
}