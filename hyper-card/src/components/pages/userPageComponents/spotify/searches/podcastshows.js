import {useState, useEffect} from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid , Box , Paper , Button } from "@mui/material";
import { ConfirmCardButtons } from "../../mainUserComponents/confirmCardButtons";

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
                        <h2>
                            {podcastshow.name}
                        </h2>
                        {
                            podcastshow.images && podcastshow.images[0] ? 
                            <img src = {podcastshow.images[0].url} width = "10%" alt = {podcastshow.name}/> : null
                        }

                    </div>

                )
            })}
            </Paper>
            <ConfirmCardButtons tempCard={tempCard} userCards={userCards} setUserCards={setUserCards}/>
        </div>
    )
}

export const DisplayPodcast = (props) => {
    const { card } = props;
  
    return (
      <Box display={"flex"} justifyContent={"center"}>
        {
          card["spotify_type"]
        }
      </Box>
    )
  }