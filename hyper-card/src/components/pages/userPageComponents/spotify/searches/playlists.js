import { useState, useEffect } from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid, Box, Paper, Button, Typography } from "@mui/material";
import { ConfirmCardButtons } from "../../mainUserComponents/confirmCardButtons"
import { SearchPlaylistId } from "../spotifysearchbyId";
import spotify from '../../../../media/spotify.png';
import { DeleteCardButton } from "../../mainUserComponents/deleteCard";

export const Playlists = (props) => {
    const searchInput = props.to_search;
    const { userCards, setUserCards } = props;
    const [playlists, setPlaylists] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [tempCard, setTempCard] = useState([]);

    const search = async () => {
        try {
            const searchParams = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
            };

            await fetch(
                "https://api.spotify.com/v1/search?q=" + searchInput + "&type=playlist&limit=10",
                searchParams
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.playlists && data.playlists.items) {
                        setPlaylists(data.playlists.items);

                    }

                });
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // api access token
        try {
            var authParams = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body:
                    "grant_type=client_credentials&client_id=" +
                    CLIENT_ID +
                    "&client_secret=" +
                    CLIENT_SECRET_ID,
            };
            fetch("https://accounts.spotify.com/api/token", authParams)
                .then((result) => result.json())
                .then((data) => {
                    setAccessToken(data.access_token);
                });
        }

        catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {

        search();


    }, [accessToken]);

    return (
        <div>
            {
                playlists.length > 0 &&
                <Paper style={{ maxHeight: 285, overflow: 'auto', border: '2px solid #000000', borderRadius: '10px' }}>
                    {playlists.map((playlist) => {
                        return (
                            <div key={playlist.id} onClick={() => {
                                setTempCard([{
                                    "type": "spotify",
                                    "spotify_type": "playlist",
                                    "playlistId": playlist.id
                                }])
                            }}>
                                <Grid container justifyContent='center' alignItems='center'>
                                    <Grid item xs={6}>
                                        {
                                            playlist.images && playlist.images[0] ?
                                                <img src={playlist.images[0].url} width="125px" height='125px' alt={playlist.name} /> : null
                                        }
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', textAlign: 'center' }}>
                                            {playlist.name}
                                        </Typography>
                                        <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '12px', textAlign: 'center' }}>
                                            {playlist.owner.display_name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })}
                </Paper>
            }
            <ConfirmCardButtons tempCard={tempCard} userCards={userCards} setUserCards={setUserCards} />
        </div>
    )
}

export const DisplayPlaylist = (props) => {
    const [playlistToDisplay, setPlaylistToDisplay] = useState([]);
    const { card, idx, isEdit } = props;
    SearchPlaylistId(card["playlistId"], setPlaylistToDisplay);

    return (
        playlistToDisplay["name"] &&
        <Grid item key={playlistToDisplay.id} width={"50vw"} align={"center"} xs={12}>
            <Box width='400px' height='150px' justifyContent='center' style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
                <Grid container width='400px' height='150px' justifyContent='center' style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
                    <Grid item xs={5} justifyContent='center' alignItems='center' display='flex'>
                        {
                            playlistToDisplay.images && playlistToDisplay.images[0] ?
                                <img src={playlistToDisplay.images[0].url} width="125px" height='125px' style={{ borderRadius: '10px' }} alt={playlistToDisplay.name} /> : null
                        }
                    </Grid>

                    <Grid item xs={5} justifyContent='center' alignItems='center' display='flex'>
                        <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '20px', textAlign: 'center' }}>
                            {playlistToDisplay.name} <br />
                            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', textAlign: 'center' }}>
                                {playlistToDisplay.owner.display_name}
                            </Typography>
                        </Typography>
                    </Grid>

                    <Grid item xs={2} justifyContent='flex-end' alignItems='flex-start' display='flex'>
                        <a href={playlistToDisplay.external_urls.spotify} target="_blank" rel="noreferrer">
                            <img src={spotify} alt="logo" style={{ width: "25px", height: "25px" }} />
                        </a>
                    </Grid>
                </Grid>
                {
                    isEdit &&
                    <DeleteCardButton idx={idx} />
                }
            </Box>
        </Grid>
    )
}