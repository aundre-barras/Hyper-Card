import {
    Button,
    Box,
    Stack
} from '@mui/material';

import {SelectTheme} from "../stylizers/selecttheme";
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {UserTheme} from "../../userPageComponents/usertheme"
export const ChangeTheme = (props) => {
    const {button_color, secondary_text_color, main_color, secondary_color} = props;


    return (
    <Box m={2} pt={2}>
    <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
            <div>
            <Button variant="contained" {...bindTrigger(popupState)}
                sx={{
                backgroundColor: `${button_color}`,
                borderRadius: 5,
                height: 30,
                width: 160,
                fontStyle: 'bold',
                fontSize: "15px",
                color: `${secondary_text_color}`
                }}>
                Edit Style
            </Button>

            
            <Popover
            {...bindPopover(popupState)}
              anchorReference="none"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
      
                >
                <Box xs={6} sx={{
                    height: '35vh',
                    width: '45vh'
                }}>

                </Box>
            <Stack>
            <SelectTheme main_color = {main_color} secondary_color = {secondary_color}/>
            </Stack>

            </Popover>
            </div>

        )}

    </PopupState>
    </Box>
    );
}