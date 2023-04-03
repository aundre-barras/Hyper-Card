import { createTheme} from '@mui/material/styles';

export const UserTheme = (main_color, secondary_color, text_color) => createTheme({
    palette: {
        primary: {
            main: main_color
        },
        secondary: {
            main: secondary_color
        }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: `${main_color}`,
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
        fontWeight:600,
        color: text_color
      },
      body2: {
        fontFamily: "Open Sans",
        fontWeight: 300,
        fontSize: "12px",
        color: text_color
      }
    }
});