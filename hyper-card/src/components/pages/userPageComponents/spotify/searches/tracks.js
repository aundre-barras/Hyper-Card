import { useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Box , Paper, Grid, Typography } from "@mui/material";
import { ConfirmCardButtons } from "../../mainUserComponents/confirmCardButtons";
import { SearchTrackId } from "../spotifysearchbyId";
import spotify from '../../../../media/spotify.png';

export const Tracks = (props) => {
    const searchInput = props.to_search;
    const { userCards , setUserCards } = props;
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [tempCard, setTempCard] = useState([]);

    const search = async () => {
        try {
            const searchParams = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                }
            }

            await fetch(
                "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track&limit=10", searchParams
                )
                .then((response) => response.json())
                .then((data) => {
                    if (data.tracks && data.tracks.items){
                        setTracks(data.tracks.items);
                        
                    }
                });
        } catch (error) {
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
        if (accessToken) {
          search();
        }
      }, [accessToken]);

      return (
        <div>
            <Paper style={{maxHeight:'285px', overflow: 'auto', border:'2px solid #000000', borderRadius:'10px'}}>
                {tracks.map((track) => {
                return (
                    <div key={track.id} onClick={() => {
                        setTempCard([{
                            "type": "spotify",
                            "spotify_type": "track",
                            "trackId": track.id
                          }])
                    }}>
                        <Grid container justifyContent='center' alignItems='center'>
                            <Grid item xs={6}>
                                {
                                track.album.images && track.album.images[0] ?
                                <img src={track.album.images[0].url} width="125px" height='125px' alt={track.name} /> : null
                                }
                            </Grid>

                            <Grid item xs={6}>
                                <Typography sx={{fontFamily:'Outfit', fontWeight:700, fontSize:'16px', textAlign:'center'}}>
                                    {track.name} <br/>
                                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '12px', textAlign: 'center' }}>
                                      {track.artists[0].name}
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                )
            })}
            </Paper>
            <ConfirmCardButtons tempCard={tempCard} userCards={userCards} setUserCards={setUserCards}/>
        

        </div>
      )
}

export const DisplayTrack = (props) => {
    const [trackToDisplay, setTrackToDisplay] = useState([]);
    const { card } = props;
    SearchTrackId(card["trackId"], setTrackToDisplay);
    
    return (
        trackToDisplay["name"] &&
      <Grid item key={trackToDisplay.id} width={"50vw"} align={"center"} xs={12}>
        <Grid container width='400px' height='150px' justifyContent='center' style={{ borderRadius:'10px', background:'rgba(255, 255, 255, 0.8)'}}>
          <Grid item xs={5} justifyContent='center' alignItems='center' display='flex'>
            {
              trackToDisplay.album.images && trackToDisplay.album.images[0] ?
                <img src={trackToDisplay.album.images[0].url} width="125px" height='125px' style={{borderRadius:'10px'}} alt={trackToDisplay.name} /> : null
            }
          </Grid>
  
          <Grid item xs={5} justifyContent='center' alignItems='center' display='flex'>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '20px', textAlign: 'center' }}>
              {trackToDisplay.name} <br/>
              <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', textAlign: 'center' }}>
                {trackToDisplay.artists[0].name}
              </Typography>
            </Typography>
          </Grid>
          
          <Grid item xs={2} justifyContent='flex-end' alignItems='flex-start' display='flex'>
            <a href = {trackToDisplay.external_urls.spotify} target="_blank" rel="noreferrer">
              <img src={spotify} alt="logo" style={{ width: "25px", height: "25px" }}/>
            </a>
        </Grid>
        </Grid>
      </Grid>
    )
  }