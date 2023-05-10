import {useState, useEffect} from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid , Box , Paper , Button, Typography } from "@mui/material";
import { ConfirmCardButtons } from "../../mainUserComponents/confirmCardButtons";
import { SearchPodcastId } from "../spotifysearchbyId";

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
                        <Grid container>
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
        <Grid container width='300px'>
          <Grid item xs={6}>
            {
              podcastshowToDisplay.images && podcastshowToDisplay.images[0] ?
                <img src={podcastshowToDisplay.images[0].url} width="125px" height='125px' alt={podcastshowToDisplay.name} /> : null
            }
            <h4>{podcastshowToDisplay.popularity}</h4>
          </Grid>
  
          <Grid item xs={6}>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '20px', textAlign: 'center' }}>
              {podcastshowToDisplay.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }