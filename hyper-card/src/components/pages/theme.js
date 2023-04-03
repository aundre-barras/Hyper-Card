import { createTheme} from '@mui/material/styles';

export const theme = createTheme({
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