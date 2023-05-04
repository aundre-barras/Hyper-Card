import {
    Typography,
    Button,
    Box,
    Grid,
    IconButton,
    useThemeProps
} from '@mui/material';
import { Fragment } from 'react';
import { DisplayLink } from './addlink';
import { DisplayArtist } from '../spotify/searches/artists';
import { DisplayAlbum } from '../spotify/searches/albums';
import { DisplayAudioBook } from '../spotify/searches/audiobooks';
import { DisplayPlaylist } from '../spotify/searches/playlists';
import { DisplayPodcast } from '../spotify/searches/podcastshows';

export const DisplayCard = (props) => {
    const {userCards} = props;

    return (
        <Fragment>
            {
                userCards.map((card , idx) => {
                    if(card["type"] == "link"){
                        return(
                            <DisplayLink key={idx} card={card}/>
                        )
                    }
                    else if(card["type"] == "spotify"){
                        if(card["spotify_type"] == "artist"){
                            return (
                                <DisplayArtist key={idx} card={card}/>
                            )
                        }
                        else if(card["spotify_type"] == "album"){
                            return (
                                <DisplayAlbum key={idx} card={card}/>
                            )
                        }
                        else if(card["spotify_type"] == "audiobook"){
                            return (
                                <DisplayAudioBook key={idx} card={card}/>
                            )
                        }
                        else if(card["spotify_type"] == "playlist"){
                            return (
                                <DisplayPlaylist key={idx} card={card}/>
                            )
                        }
                        else if(card["spotify_type"] == "podcast"){
                            return (
                                <DisplayPodcast key={idx} card={card}/>
                            )
                        }
                        else if(card["spotify_type"] == "track"){
                            return (
                                <DisplayPodcast key={idx} card={card}/>
                            )
                        }
                    }
                    
                })
            }
        </Fragment>
    )
}