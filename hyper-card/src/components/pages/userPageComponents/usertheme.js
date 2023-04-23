import { createTheme} from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

export const UserTheme = () => createTheme({
    typography: {
      fontFamily: ["Outfit", "Open Sans", "Montserrat"].join(','),
      fontWeight:700,
    }
});