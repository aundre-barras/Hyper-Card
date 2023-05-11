import {useState, useEffect} from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid , Box , Paper , Button, Typography } from "@mui/material";
import { ConfirmCardButtons } from "../../mainUserComponents/confirmCardButtons";
import { SearchPodcastId } from "../spotifysearchbyId";
import spotify from '../../../../media/spotify.png';

export const PodcastShows = (props) => {
    const searchInput = props.to_search;
    const { userCards , setUserCards }= props;
    const [podcastshows, setPodcastShows] = useState([]);
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
            "https://api.spotify.com/v1/search?q=" + searchInput + "&type=show&market=US&limit=10",
            searchParams
            )
            .then((response) => response.json())
            .then((data) => {
                if (data.shows && data.shows.items){
                    setPodcastShows(data.shows.items);
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
            <Paper style={{maxHeight: 180, overflow: 'auto', border:'2px solid #000000', borderRadius:'10px'}}>
                {podcastshows.map((podcastshow) => {
                return (
                    <div key = {podcastshow.id} onClick={() => {
                        setTempCard([{
                            "type": "spotify",
                            "spotify_type": "podcast",
                            "podcastId": podcastshow.id
                          }])
                    }}>
                        <Grid container justifyContent='center' alignItems='center'>
                            <Grid item xs={6}>
                                {
                                    podcastshow.images && podcastshow.images[0] ? 
                                    <img src = {podcastshow.images[0].url} width="125px" height='125px' alt = {podcastshow.name}/> : null
                                }
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{fontFamily:'Outfit', fontWeight:700, fontSize:'16px', textAlign:'center'}}>
                                    {podcastshow.name}
                                </Typography>
                                <Typography sx={{fontFamily:'Outfit', fontWeight:700, fontSize:'12px', textAlign:'center'}}>
                                    {podcastshow.publisher}
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

export const DisplayPodcast = (props) => {
    const [podcastshowToDisplay, setPodcastshowToDisplay] = useState([]);
    const { card } = props;
    SearchPodcastId(card["podcastId"], setPodcastshowToDisplay);
    
    return (
        podcastshowToDisplay["name"] &&
      <Grid item key={podcastshowToDisplay.id} width={"50vw"} align={"center"} xs={12}>
        <Grid container width='400px' justifyContent='center'>
          <Grid item xs={5}>
            {
              podcastshowToDisplay.images && podcastshowToDisplay.images[0] ?
                <img src={podcastshowToDisplay.images[0].url} width="125px" height='125px' alt={podcastshowToDisplay.name} /> : null
            }
          </Grid>
  
          <Grid item xs={5} justifyContent='center' alignItems='center' display='flex'>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '20px', textAlign: 'center' }}>
              {podcastshowToDisplay.name}
              <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', textAlign: 'center' }}>
                {podcastshowToDisplay.publisher}
              </Typography>
            </Typography>
          </Grid>

          <Grid item xs={2} justifyContent='flex-end' alignItems='flex-start' display='flex'>
          <a href = {podcastshowToDisplay.external_urls.spotify} target="_blank" rel="noreferrer">
            <img src={spotify} alt="logo" style={{ width: "25px", height: "25px" }}/>
          </a>
        </Grid>
        </Grid>
      </Grid>
    )
  }