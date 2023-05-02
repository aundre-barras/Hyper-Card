import {
    Typography,
    Button,
    Box,
    Grid,

    IconButton
} from '@mui/material';
import { AddLink } from './addlink';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import spotify from '../../../media/spotify.png';

export const AddContent = (props) => {
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <Box display='flex' justifyContent='center'>
                <Box sx={{
                    justifyContent: 'center',
                    height: 56,
                    width: 56,
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    marginTop: 5
                }}>
                    <IconButton {...bindTrigger(popupState)}>
                        <AddRoundedIcon sx={{
                            fontSize: 40
                        }}/>

                    </IconButton>

                </Box>

                <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                >
                <Box sx={{
                    height: '785px',
                    width: '328px',
                    borderRadius: '10px',
                }}>

                <Grid container direction='row' justifyContent="space-content" alignItems='center' xs={12}>

                <Grid item xs={12} sx={{
                    // justifyContent: 'center',
                    // alignItems: 'center'
                }}>
                    <Typography align='center'>
                    Link Type
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                <Box display='flex' justifyContent='center' 
                    sx={{
                    border: 2,
                    borderColor: 'black',
                    width: '80px',
                    height: '40px',
                    marginLeft: 2,
                    borderRadius: '10px',
                    "fontFamily":"'Outfit'","fontStyle":"normal","fontWeight":"600","fontSize":"16px","lineHeight":"20px","display":"flex","alignItems":"center","textAlign":"center"
                }}>
                    ://
                </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box display='flex' justifyContent='center' 
                        sx={{
                        border: 2,
                        borderColor: 'black',
                        width: '80px',
                        height: '40px',
                        marginLeft: 2,
                        borderRadius: '10px',
                        alignItems: 'center'
                    }}>
                        <img src={spotify} alt = "logo" style={{ width: "25px", height: "25px" }}/>    
                    </Box>
                </Grid>

                <Grid item xs={4}>
                <Box display='flex' justifyContent='center' 
                    sx={{
                    border: 2,
                    borderColor: 'black',
                    width: '80px',
                    height: '40px',
                    marginLeft: 2,
                    borderRadius: '10px',
                    alignItems: 'center'
                }}>
                    twitch
                </Box>
                </Grid>

                <Grid item xs={12}>
                    <AddLink/>
                </Grid>
       
                <Grid item xs={6} bottom={0} left={10} position={'absolute'}>
                    <Button variant='contained' sx={{
                            borderRadius: 5,
                            height: 40,
                            width: 100,
                            fontStyle: 'bold',
                            marginBottom: 2
                        }}>
                        confirm
                    </Button>
                </Grid>
                <Grid item xs={6} bottom={0} right={10} position={'absolute'}>
                    <Button variant='contained' sx={{
                            borderRadius: 5,
                            height: 40,
                            width: 100,
                            fontStyle: 'bold',
                            marginBottom: 2
                        }}>
                        cancel
                    </Button>
                </Grid>

                </Grid>         

                </Box>

                </Popover>
                
                </Box>
            )}
        </PopupState>
    );
}

