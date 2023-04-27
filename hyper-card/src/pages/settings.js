import {React} from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {theme} from "./theme";


export const Settings = () => {
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
            <Grid container spacing={2}>
                <Grid item xs={12} align="right">
                <MenuRoundedIcon
                    // onClick={}
                    sx={{fontSize: "50px"}}
                    />
                </Grid>
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
  );
}