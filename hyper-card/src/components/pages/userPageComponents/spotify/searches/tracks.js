import { useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid } from "@mui/material";

export const Tracks = (props) => {
    const searchInput = props.to_search;
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState("");

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
        {
            tracks.map((track) => {
                return (
                    <div key={track.id}>
                        <h2>
                            {track.name}
                        </h2>
                        {
                        track.album.images && track.album.images[0] ?
                        <img src={track.album.images[0].url} width="10%" alt={track.name} /> : null
                        }
                        <h4></h4>
                        <audio controls>
                            <source src={track.preview_url} type="audio/mp3"/>

                        </audio>
                        
                    </div>
                )
            })
        }

        </div>
      )
}