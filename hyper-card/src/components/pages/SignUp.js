import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
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
            // backgroundColor: "#FFFFFF",
            background: "linear-gradient(167.95deg, #FFFFFF 63.36%, #5C7BBD 100%)",
            // backgroundRepeat: "no-repeat",
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

export default function SignUp() {
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username "
                  autoComplete="username"
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
        </Box>
      </Container>
    </ThemeProvider>
  );
}