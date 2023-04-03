import {React} from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import logoCircle from '../media/logo-circle.png'
import { Link } from 'react-router-dom';
import {theme} from "./theme";


export const Landing = () => {
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
          <img src={logoCircle} alt = "logo" style={{ width: "150px", height: "150px" }}/>
          <Typography variant='h1' color="#5B7ABC">
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Link to="/login" style={{
              textDecoration: "none"
            }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  color:"#FFFFFF",
                  fontFamily:"Outfit",
                  fontWeight:600,
                  fontSize:"24px"
                }}>
                  Login
              </Button>
            </Link>
            <Link to="/signup" style={{
              textDecoration: "none"
            }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  color:"#FFFFFF",
                  fontFamily:"Outfit",
                  fontWeight:600,
                  fontSize:"24px"
                }}>
                  Sign Up
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}