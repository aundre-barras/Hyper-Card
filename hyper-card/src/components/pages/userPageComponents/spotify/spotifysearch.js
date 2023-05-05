import {useEffect, useState, Components} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, Container, Grid,TextField} from "@mui/material";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from "@mui/material/ToggleButton";

import {Artists} from "./searches/artists";
import { Albums } from "./searches/albums";
import {Tracks} from "./searches/tracks";
import { PodcastShows } from "./searches/podcastshows";
import { Episodes } from "./searches/episodes";
import { Audiobooks } from "./searches/audiobooks";
import { Playlists } from "./searches/playlists";

export const SpotifySearch = (props) => {
    const { userCards , setUserCards } = props;
    const [searchFor, setSearchFor] = useState("artists");
    const [searchQuery, setSearchQuery] = useState("");

    const SelectedSearch = () => {
        
        const getSearchQueries = {
            "artists": Artists,
            "albums" : Albums,
            "tracks":  Tracks,
            "podcastshows" : PodcastShows,
            "episodes" : Episodes,
            "audiobooks": Audiobooks,
            "playlists" : Playlists
        };

        const GetSearch = getSearchQueries[searchFor];
        if (searchFor.length > 0){
            return (
                <div>
                    <GetSearch to_search = {searchQuery} userCards = {userCards} setUserCards = {setUserCards}/>
                </div>
            
            );
        }
        return;
    }

    useEffect(() => {
        SelectedSearch();
    }, [searchQuery, searchFor]);

    return (
            <div>
                <Container component="main">
                    <ToggleButtonGroup exclusive='true' type='radio'>
                        <Grid container spacing={1} justifyContent = {"center"} marginTop={2}>

                            <Grid item cs = {2} xs={4}>
                                <ToggleButton value="artists" onClick={(e) => setSearchFor(e.target.value)}
                                sx={{textTransform:'lowercase', font:'Outfit', fontSize:'16px', borderRadius:'10px', width:'80px', height:'40px'}}>
                                    artists
                                </ToggleButton>
                            </Grid>

                            <Grid item cs = {2} xs={4}>
                                <ToggleButton value="albums" onClick={(e) => setSearchFor(e.target.value)}
                                sx={{textTransform:'lowercase', font:'Outfit', fontSize:'16px', borderRadius:'10px', width:'80px', height:'40px'}}>
                                    albums
                                </ToggleButton>
                            </Grid>

                            <Grid item cs = {2} xs={4}>
                                <ToggleButton value="tracks" onClick={(e) => setSearchFor(e.target.value)}
                                sx={{textTransform:'lowercase', font:'Outfit', fontSize:'16px', borderRadius:'10px', width:'80px', height:'40px'}}>
                                    tracks
                                </ToggleButton>
                            </Grid>

                            <Grid item cs = {2} xs={4}>
                                <ToggleButton value="podcastshows" onClick={(e) => setSearchFor(e.target.value)}
                                sx={{textTransform:'lowercase', font:'Outfit', fontSize:'16px', borderRadius:'10px', width:'80px', height:'40px'}}>
                                    podcasts
                                </ToggleButton>
                            </Grid>

                            <Grid item cs = {2} xs={4}>
                                <ToggleButton value="audiobooks" onClick={(e) => setSearchFor(e.target.value)}
                                sx={{textTransform:'lowercase', font:'Outfit', fontSize:'16px', borderRadius:'10px', width:'80px', height:'40px'}}>
                                    books
                                </ToggleButton>
                            </Grid>

                            <Grid item cs = {2} xs={4}>
                                <ToggleButton value="playlists" onClick={(e) => setSearchFor(e.target.value)}
                                sx={{textTransform:'lowercase', font:'Outfit', fontSize:'16px', borderRadius:'10px', width:'80px', height:'40px'}}>
                                playlists
                            </ToggleButton>
                            </Grid>

                            <Grid item cs = {2} xs={12} marginTop={1} marginBottom={2}>
                            <TextField fullWidth label="search" variant="outlined" onChange={(e) =>setSearchQuery(e.target.value)}
                                InputProps={{sx:{borderRadius:'35px'}}} size="small" />
                            </Grid>

                        </Grid>
                    </ToggleButtonGroup>
                <SelectedSearch/>
            </Container>
        </div>
      );
}