import {
    Button,
    Box
} from '@mui/material';

import {SelectColors} from "../stylizers/selectcolor";
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

export const ChangeColor = (props) => {
    const {button_color, secondary_text_color} = props;


    return (

    <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
            <div>
            <Button variant="contained" {...bindTrigger(popupState)}
                sx={{
                backgroundColor: `${button_color}`,
                borderRadius: 5,
                height: 30,
                width: 160,
                margin: "15px",
                fontStyle: 'bold',
                fontSize: "15px",
                color: `${secondary_text_color}`
                }}>
                edit colors
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
            <SelectColors/>

            </Popover>
            </div>

        )}

    </PopupState>

    );
}