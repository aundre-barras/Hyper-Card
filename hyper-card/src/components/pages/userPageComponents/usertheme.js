import { createTheme} from '@mui/material/styles';

export const UserTheme = (main_color, secondary_color, text_color, background_color) => createTheme({
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

/**
 * 
 *       MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: `radial-gradient(circle, transparent 25%, ${main_color}  26%),linear-gradient(45deg, transparent 46%, ${secondary_color} 47%, ${secondary_color} 52%, transparent 53%), linear-gradient(135deg, transparent 46%, ${secondary_color} 47%, ${secondary_color} 52%, transparent 53%)`,
            backgroundSize: '2em 2em',
            backgroundColor: `${main_color}`,
            opacity: 1,
            backgroundAttachment: "fixed"
          },
        }
      }
 */