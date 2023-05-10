import { Button, Popover, Box} from '@mui/material';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import { SelectTheme } from '../stylizers/selecttheme';

export const ChangeTheme = (props) => {
  const { button_color, secondary_text_color, main_color, secondary_color } = props;

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            sx={{
              backgroundColor: `${button_color}`,
              borderRadius: 5,
              height: 30,
              width: 160,
              margin: '15px',
              fontStyle: 'bold',
              fontSize: '15px',
              color: `${secondary_text_color}`,
              fontFamily: "Outfit",
              fontSize: "18px",
              lineHeight: "25px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              textTransform:'lowercase'
            }}
          >
            edit style
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorReference="none"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
          }}
          >
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <SelectTheme main_color = {main_color} secondary_color = {secondary_color}/>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
            <Button
            variant="contained"
            onClick={() => {
                popupState.close();
            }}
            sx={{
                backgroundColor: "black",
                borderRadius: 5,
                height: 30,
                width: 160,
                margin: '15px',
                fontStyle: 'bold',
                color: "white",
            }}
            >
            close
            </Button>
            </Box>

          </Popover>
          
        </div>
      )}
    </PopupState>
  );
};
