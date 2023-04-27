import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import live from "../../../media/live.png";

export const TwitchUserSearch = () => {
    const CLIENT_ID = "xe63rh59a3b1pomi5s7nw3lc5r2y7y";
    const CLIENT_SECRET_ID = "6k4n62upopxdmfyfd9s4x7dmej76a5";
    const [userSearch, setUserSearch] = useState("");
    const [userList, setUserList] = useState([]);

    const GetAuth = async () => {
        let url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET_ID}&grant_type=client_credentials`;

        return fetch(url, {
        method: "POST",

        })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    };

    const GetUserSearch = async () => {
        try {
            if (userSearch){
                const endpoint = `https://api.twitch.tv/helix/search/channels?query=${userSearch}&first=10`;

                const auth = await GetAuth();
                let { access_token, expires_in, token_type } = auth;

                token_type = token_type.substring(0, 1).toUpperCase() + token_type.substring(1, token_type.length);

                let authorization = `${token_type} ${access_token}`;

                const headers = {
                    authorization,
                    "Client-Id": CLIENT_ID
                };

                fetch(endpoint, {
                    headers
                })
                .then((res) => res.json())
                .then((data) => {setUserList(data.data)});
            }
        } catch (error) {

            console.error(error);

        }
    }

    useEffect(() => {GetUserSearch()}, [userSearch]);

    return (
        <div>
        <TextField fullWidth label="Enter your text" variant="outlined" onChange={(e) =>setUserSearch(e.target.value)}/>
        {
            userList.map((user) => {
                return (
                    
                    <div key = {user.id}> 
                        <h2>
                            {user.display_name}
                        </h2>
                        {user.is_live? <img src = {live} width = "5%"/>: null}
                        <br/>
                        <img src={user.thumbnail_url} width = "10%"/>


                    </div>
                );
            })
        }

        </div>
    );
}