import { useEffect, useState } from "react";
import { TextField, Grid, Typography } from "@mui/material";
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
            <Grid item xs={12} marginTop={2}>
                <TextField fullWidth label="search" variant="outlined" onChange={(e) =>setUserSearch(e.target.value)}
                    InputProps={{sx:{borderRadius:'35px'}}} size="small" />
            </Grid>
        {
            userList.map((user) => {
                return (
                    
                    <div key = {user.id}>
                        <Grid container justifyContent={'center'} marginTop={2}>
                            <Grid item xs={6}>
                                <img src={user.thumbnail_url} width = "125px" height="125px"/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{fontFamily:'Outfit', fontWeight:700, fontSize:'20px', textAlign:'center'}}>
                                    {user.display_name}
                                </Typography>
                                {user.is_live? <img src = {live} width = "25%"/>: null}
                            </Grid>
                        </Grid>

                    </div>
                );
            })
        }

        </div>
    );
}