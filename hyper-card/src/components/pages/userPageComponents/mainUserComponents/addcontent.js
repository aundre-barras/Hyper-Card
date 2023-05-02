import {
    Typography,
    Button,
    Box,
    Grid,

    IconButton
} from '@mui/material';
import spotify from '../../../media/spotify.png';
import twitch from '../../../media/twitch.png';
import shoutouts from '../../../media/shoutouts.png';
import { AddLink } from './addlink';
import { AddShoutOut } from './addshoutout';
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
                    height: '785px',
                    width: '328px',
                    borderRadius: '10px',
                }}>

                <Grid container 
                    direction='row' 
                    justifyContent="space-content" 
                    alignItems='center' 
                    xs={12} spacing={1}
                    >

                <Grid item xs={12}>
                    <Typography align='center'>
                    Link Type
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                <Button display='flex' justifyContent='center' 
                    sx={{
                        border: 2,
                        borderColor:'black',
                        width:'80px',
                        height:'40px',
                        marginLeft: 2,
                        borderRadius:'10px',
                        alignItems:'center',
                        "fontFamily":'Outfit',
                        "fontWeight":"600",
                        color:'#000000'
                    }}>
                    ://
                </Button>
                </Grid>

                <Grid item xs={4}>
                    <Button display='flex' justifyContent='center' 
                        sx={{
                            border: 2,
                            borderColor:'black',
                            width:'80px',
                            height:'40px',
                            marginLeft: 2,
                            borderRadius:'10px',
                            alignItems:'center',
                            color: '#000000'
                        }}>
                        <img src={spotify} alt = "logo" style={{ width: "25px", height: "25px" }}/>    
                    </Button>
                </Grid>

                <Grid item xs={4}>
                <Button display='flex' justifyContent='center' 
                    sx={{
                        border: 2,
                        borderColor:'black',
                        width:'80px',
                        height:'40px',
                        marginLeft: 2,
                        borderRadius:'10px',
                        alignItems:'center',
                        color:'#000000'
                    }}>
                    <img src={twitch} alt = "logo" style={{ width: "25px", height: "25px" }}/>
                </Button>
                </Grid>

                <Grid item xs={4}>
                <Button display='flex' justifyContent='center' 
                    sx={{
                        border: 2,
                        borderColor:'black',
                        width:'80px',
                        height:'40px',
                        marginLeft: 2,
                        borderRadius:'10px',
                        alignItems:'center',
                        color:'#000000'
                    }}>
                    <img src={shoutouts} alt = "logo" style={{ width: "25px", height: "25px" }}/>
                </Button>
                </Grid>

                <Grid item xs={12}>
                    <AddLink/>
                </Grid>
       
                <Grid item xs={6} bottom={0} left={'12px'} position={'absolute'}>
                    <Button variant='contained' sx={{
                            width:'100px',
                            height:'44px',
                            background:'#000000',
                            border:'2px solid #000000',
                            borderRadius:'35px',
                            marginBottom: '16px',
                            ":hover": {bgcolor: "#000000"}
                        }} style={{
                            fontFamily:'Outfit', fontWeight:'700'
                        }}>
                        confirm
                    </Button>
                </Grid>
                <Grid item xs={6} bottom={0} right={'12px'} position={'absolute'}>
                    <Button variant='contained' sx={{
                            width:'100px',
                            height:'44px',
                            background:'#ffffff',
                            border:'2px solid #000000',
                            borderRadius:'35px',
                            marginBottom: '16px',
                            ":hover": {bgcolor: "#ffffff"}
                        }} style={{
                            color:'#000000', fontFamily:'Outfit', fontWeight:'700'
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

