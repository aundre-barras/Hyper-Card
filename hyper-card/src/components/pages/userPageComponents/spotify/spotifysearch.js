import {useEffect, useState, Components} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Container, Grid,TextField} from "@mui/material";

import {Artists} from "./searches/artists";
import { Albums } from "./searches/albums";


export const SpotifySearch = () => {
    const [searchFor, setSearchFor] = useState("artists");
    const [searchQuery, setSearchQuery] = useState("");

    const SelectedSearch = () => {
        
        const getSearchQueries = {

            "artists": Artists,
            "albums" : Albums,
            
        };

        const GetSearch = getSearchQueries[searchFor];

        return (
            <div>
                <GetSearch to_search = {searchQuery}/>
            </div>
        
        );
    }

    useEffect(() => {
        SelectedSearch();
    }, [searchQuery, searchFor]);

    return (
            <div>
                <Container component="main">

                    <FormControl>
                    <FormLabel id="spotify-multiple-choice-select-query"></FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="artists"
                        name="radio-buttons-group">
                        
                        <Grid container spacing={1} justifyContent = {"center"}>

                            <Grid item cs = {2}>
                                <FormControlLabel value="artists" control={<Radio />} onChange={(e) => setSearchFor(e.target.value)} label="Artists" />
                            </Grid>

                            <Grid item cs = {2}>
                                <FormControlLabel value="albums" control={<Radio />} onChange={(e) => setSearchFor(e.target.value)} label="Albums" />
                            </Grid>

                            <Grid item cs = {2}>
                                <FormControlLabel value="tracks" control={<Radio />} onChange={(e) => setSearchFor(e.target.value)} label="Tracks" />
                            </Grid>

                            <Grid item cs = {2}>
                                <FormControlLabel value="episodes" control={<Radio />} onChange={(e) => setSearchFor(e.target.value)} label="Episodes" />
                            </Grid>

                            <Grid item cs = {2}>
                                <FormControlLabel value="audiobooks" control={<Radio />} onChange={(e) => setSearchFor(e.target.value)} label="Audiobooks" />
                            </Grid>

                            <Grid item cs = {2}>
                                <FormControlLabel value="playlists" control={<Radio />} onChange={(e) => setSearchFor(e.target.value)} label="Playlists" />
                            </Grid>
                            <Grid item cs = {2}>
                            <TextField fullWidth label="Enter your text" variant="outlined" onChange={(e) =>setSearchQuery(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </RadioGroup>
                    </FormControl>
                    <SelectedSearch/>
                </Container>
                
                
            </div>
      );
}