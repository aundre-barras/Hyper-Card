import {useState, useEffect} from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid } from "@mui/material";

export const Audiobooks = (props) => {
    const searchInput = props.to_search;
    const [audiobooks, setAudiobooks] = useState([]);
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
            "https://api.spotify.com/v1/search?q=" + searchInput + "&type=audiobook&limit=10",
            searchParams
            )
            .then((response) => response.json())
            .then((data) => {
                if (data.audiobooks && data.audiobooks.items){
                  setAudiobooks(data.audiobooks.items);

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
            {audiobooks.map((audiobook) => {
                return (
                    <div key={audiobook.id}>
                        <h2>
                            {audiobook.name}
                        </h2>
                    {
                    audiobook.images && audiobook.images[0] ?
                    <img src={audiobook.images[0].url} width="10%" alt={audiobook.name} /> : null
                    }

                    </div>
                )
            })}

        </div>
    )
}