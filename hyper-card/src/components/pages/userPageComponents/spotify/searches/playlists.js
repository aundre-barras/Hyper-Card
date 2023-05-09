import { useState, useEffect } from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid, Box, Paper, Button, Typography } from "@mui/material";
import { ConfirmCardButtons } from "../../mainUserComponents/confirmCardButtons"
import { SearchPlaylistId } from "../spotifysearchbyId";

export const Playlists = (props) => {
    const searchInput = props.to_search;
    const { userCards , setUserCards } = props;
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
            <Paper style={{ maxHeight: 180, overflow: 'auto', border:'2px solid #000000', borderRadius:'10px'}}>
                {playlists.map((playlist) => {
                    return (
                        <div key={playlist.id} onClick={() => {
                            setTempCard([{
                                "type": "spotify",
                                "spotify_type": "playlist",
                                "playlistId": playlist.id
                            }])
                        }}>
                            <Grid container>
                                <Grid item xs={6}>
                                    {
                                        playlist.images && playlist.images[0] ?
                                            <img src={playlist.images[0].url} width="125px" height='125px' alt={playlist.name} /> : null
                                    }
                            </Grid>
                            <Grid item xs={6}>
                                    <Typography sx={{fontFamily:'Outfit', fontWeight:700, fontSize:'20px', textAlign:'center'}}>
                                        {playlist.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    )
                })}
            </Paper>
            <ConfirmCardButtons tempCard={tempCard} userCards={userCards} setUserCards={setUserCards} />
        </div>
    )
}

export const DisplayPlaylist = (props) => {
    const [playlistToDisplay, setPlaylistToDisplay] = useState([]);
    const { card } = props;
    SearchPlaylistId(card["playlistId"], setPlaylistToDisplay);
    
    return (
        playlistToDisplay["name"] &&
      <Grid item key={playlistToDisplay.id} width={"50vw"} align={"center"} xs={12}>
        <Grid container>
          <Grid item xs={6}>
            {
              playlistToDisplay.images && playlistToDisplay.images[0] ?
                <img src={playlistToDisplay.images[0].url} width="125px" height='125px' alt={playlistToDisplay.name} /> : null
            }
            <h4>{playlistToDisplay.popularity}</h4>
          </Grid>
  
          <Grid item xs={6}>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '20px', textAlign: 'center' }}>
              {playlistToDisplay.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }