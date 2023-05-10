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
            <div >
            <Button variant="contained" {...bindTrigger(popupState)}
                sx={{
                backgroundColor: `${button_color}`,
                borderRadius: 5,
                height: 30,
                width: 160,
                margin: "15px",
                fontStyle: 'bold',
                fontSize: "15px",
                color: `${secondary_text_color}`,
                fontFamily: "Outfit",
                fontSize: "18px",
                lineHeight: "25px",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                textTransform:'lowercase'
                }}>
                edit colors
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
                <SelectColors/>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                <Button
                variant="contained"
                onClick={() => {
                    popupState.close();
                }}
                sx={{
                    backgroundColor: 'black',
                    borderRadius: 5,
                    height: 30,
                    width: 160,
                    margin: '15px',
                    fontStyle: 'bold',
                    color: 'white',
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
}