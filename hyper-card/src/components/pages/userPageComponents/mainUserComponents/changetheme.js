import { Button, Popover, Box } from '@mui/material';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import { useState } from 'react';
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
            }}
          >
            Edit Style
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorReference="none"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            
            <Box>
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
