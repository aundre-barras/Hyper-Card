import {
    Typography,
    Button,
    Box,
    Grid,
    IconButton,
    useThemeProps,
    Stack
} from '@mui/material';
import { Fragment } from 'react';
import { DisplayLink } from './addlink';
import { DisplayArtist } from '../spotify/searches/artists';
import { DisplayAlbum } from '../spotify/searches/albums';
import { DisplayAudioBook } from '../spotify/searches/audiobooks';
import { DisplayPlaylist } from '../spotify/searches/playlists';
import { DisplayPodcast } from '../spotify/searches/podcastshows';
import { DisplayTrack } from '../spotify/searches/tracks';

export const DisplayCard = (props) => {
    const {userCards , colors , isEdit} = props;
    
    return (
        <Grid container direction='row' 
        justifyContent="space-content" 
        alignItems='center' 
        xs={12} spacing={1}>
            {
                userCards.map((card , idx) => {
                    if(card["type"] == "link"){
                        return(
                            <DisplayLink key={idx} card={card} isEdit={isEdit} colors={colors}/>
                        )
                    }
                    else if(card["type"] == "spotify"){
                        if(card["spotify_type"] == "artist"){
                            return (
                                <DisplayArtist idx={idx} card={card} isEdit={isEdit}/>
                            )
                        }
                        else if(card["spotify_type"] == "album"){
                            return (
                                <DisplayAlbum idx={idx} card={card} isEdit={isEdit}/>
                            )
                        }
                        else if(card["spotify_type"] == "audiobook"){
                            return (
                                <DisplayAudioBook idx={idx} card={card} isEdit={isEdit}/>
                            )
                        }
                        else if(card["spotify_type"] == "playlist"){
                            return (
                                <DisplayPlaylist idx={idx} card={card} isEdit={isEdit}/>
                            )
                        }
                        else if(card["spotify_type"] == "podcast"){
                            return (
                                <DisplayPodcast idx={idx} card={card} isEdit={isEdit}/>
                            )
                        }
                        else if(card["spotify_type"] == "track"){
                            return (
                                <DisplayTrack idx={idx} card={card} isEdit={isEdit}/>
                            )
                        }
                    }
                    
                })
            }
        </Grid>
    )
}