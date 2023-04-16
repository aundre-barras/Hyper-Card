import {useState, useEffect} from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid } from "@mui/material";

export const Playlists = (props) => {
    const searchInput = props.to_search;
    const [playlists, setPlaylists] = useState([]);
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
            "https://api.spotify.com/v1/search?q=" + searchInput + "&type=playlist&limit=10",
            searchParams
            )
            .then((response) => response.json())
            .then((data) => {
                if (data.playlists && data.playlists.items){
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
            {playlists.map((playlist) => {
                return (
                    <div key={playlist.id}>
                        <h2>
                            {playlist.name}
                        </h2>
                    {
                    playlist.images && playlist.images[0] ?
                    <img src={playlist.images[0].url} width="10%" alt={playlist.name} /> : null
                    }

                    </div>
                )
            })}

        </div>
    )
}