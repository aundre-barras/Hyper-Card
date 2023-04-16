import {useState, useEffect} from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid } from "@mui/material";

export const Episodes = (props) => {
    const searchInput = props.to_search;
    const [episodes, setEpisodes] = useState([]);
    const [accessToken, setAccessToken] = useState("");

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
            "https://api.spotify.com/v1/search?q=" + searchInput + "&type=episode&market=US&limit=10",
            searchParams
            )
            .then((response) => response.json())
            .then((data) => {
                if (data.episodes && data.episodes.items){
                    setEpisodes(data.episodes.items);
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
            {episodes.map((episode) => {
                return (
                    <div key = {episode.id}>
                        <h2>
                            {episode.name}
                        </h2>
                        {
                            episode.images && episode.images[0] ? 
                            <img src = {episode.images[0].url} width = "10%" alt = {episode.name}/> : null
                        }
                        <h4>{episode.audio_preview_url}</h4>

                    </div>

                )
            })}


        </div>
    )
}