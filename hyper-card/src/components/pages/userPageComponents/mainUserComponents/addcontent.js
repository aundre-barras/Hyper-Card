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

import { SpotifySearch } from '../spotify/spotifysearch'
import { AddLink } from './addlink';
import { TwitchUserSearch } from '../twitch/twitchusersearch'
import { AddShoutOut } from './addshoutout';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useState , useEffect } from 'react';

export const AddContent = (props) => {
    const {setUserCards , userCards} = props;
    const [addType, setAddType] = useState("link");


    const SelectedCard = () => {

        const getCardType = {
            "link": AddLink,
            "spotify" : SpotifySearch,
            "twitch":  TwitchUserSearch,
            "shoutout": AddShoutOut
        };

        const CardType = getCardType[addType];
        if (addType.length > 0){
            return (
                <div>
                    <CardType setUserCards={setUserCards} userCards={userCards}/>
                </div>

            );
        }
        return;
    }

    useEffect(() => {
        SelectedCard();
    } , [addType])
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
                            fontSize: 40,
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
                    height: '95vh',
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
                <Button display='flex' justifyContent='center' onClick={() => {
                    setAddType("link");
                }}
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
                    <Button display='flex' justifyContent='center' onClick={() => {
                    setAddType("spotify");
                }}
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
                <Button display='flex' justifyContent='center' onClick={() => {
                    setAddType("twitch");
                }}
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
                <Button display='flex' justifyContent='center' onClick={() => {
                    setAddType("shoutout")
                }}
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
                    <SelectedCard/>
                </Grid>

                </Grid>         

                </Box>

                </Popover>
                
                </Box>
            )}
        </PopupState>
    );
}

