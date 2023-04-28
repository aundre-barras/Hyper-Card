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
                    height: '80vh',
                    width: '80vh'
                }}>

                <Grid container justifyContent="center" alignItems='center'>

                <Grid item xs={12} sx={{
                    justifyContent: 'center',
                    alignItems: 'center'
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
                    width: '80%',
                    marginLeft: 2
                }}>

                    add link
                </Box>

                </Grid>

                <Grid item xs={4}>

                    <Box display='flex' justifyContent='center' 
                        sx={{
                        border: 2,
                        borderColor: 'black',
                        width: '80%',
                        marginLeft: 2
                    }}>

                        Spotify
                    </Box>

                </Grid>

                <Grid item xs={4}>

                <Box display='flex' justifyContent='center' 
                    sx={{
                    border: 2,
                    borderColor: 'black',
                    width: '80%',
                    marginLeft: 2
                }}>

                    SoundCloud
                </Box>

                </Grid>

                <Grid item xs={12}>
                    <AddLink/>
                </Grid>

                <Grid item xs={12}>
                    <Box position={'absolute'} bottom={0}>
                        <Button variant="contained" sx={{
                            borderRadius: 5,
                            height: 40,
                            width: 100,
                            fontStyle: 'bold',
                            marginLeft: 2,
                            marginBottom: 2
                        }}>
                            confirm
                        </Button>

                        <Button variant="contained" sx={{
                            borderRadius: 5,
                            height: 40,
                            width: 100,
                            fontStyle: 'bold',
                            marginLeft: 40,
                            marginBottom: 2
                        }}>
                            cancel
                        </Button>
                    </Box>
                </Grid>

                </Grid>  


                </Box>

                </Popover>
                
                </Box>
            )}
        </PopupState>
    );
}

