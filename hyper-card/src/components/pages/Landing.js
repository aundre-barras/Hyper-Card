import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoCircle from '../logos/logo-circle.png'
import { Link } from 'react-router-dom';


const theme = createTheme({
  palette: {
      primary: {
          main: "#6377ba"
      },
      secondary: {
          main: "#5B7ABC"
      }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(167.95deg, #FFFFFF 63.36%, #5C7BBD 100%)",
          backgroundAttachment: "fixed"
        },
      }
    }
  },
  typography: {
    fontFamily: ["Outfit", "Open Sans", "Montserrat"].join(','),
    fontWeight:700,
    h1: {
      fontFamily: "Outfit",
      fontStyle: "normal",
      fontSize:"48px",
      fontWeight:600
    },
    body2: {
      fontFamily: "Open Sans",
      fontWeight: 300,
      fontSize: "12px",
    }
  }
});

export default function Landing() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Link to="/login" style={{
              textDecoration: "none"
            }}>
              <Button
                type="submit"
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
                type="submit"
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