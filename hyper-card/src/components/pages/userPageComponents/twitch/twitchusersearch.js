import { useEffect, useState } from "react";
import { TextField, Grid, Typography, Paper, Box } from "@mui/material";
import live from "../../../media/live.png";
import { TwitchUserSearchById } from "./twitchsearchbyId";
import { ConfirmCardButtons } from "../mainUserComponents/confirmCardButtons";
import { DeleteCardButton } from "../mainUserComponents/deleteCard";

export const TwitchUserSearch = (props) => {
    const { userCards, setUserCards } = props;
    const CLIENT_ID = "xe63rh59a3b1pomi5s7nw3lc5r2y7y";
    const CLIENT_SECRET_ID = "6k4n62upopxdmfyfd9s4x7dmej76a5";
    const [userSearch, setUserSearch] = useState("");
    const [userList, setUserList] = useState([]);
    const [tempCard, setTempCard] = useState([]);

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
            if (userSearch) {
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
                    .then((data) => { setUserList(data.data) });
            }
        } catch (error) {

            console.error(error);

        }
    }

    useEffect(() => { GetUserSearch() }, [userSearch]);

    return (
        <div>
            <Grid item xs={12} marginTop={2}>
                <TextField fullWidth label="search" variant="outlined" onChange={(e) => setUserSearch(e.target.value)}
                    InputProps={{ sx: { borderRadius: '35px' } }} size="small" />
            </Grid>

            {
                userList.length > 0 &&
                <Paper style={{ maxHeight: '285px', overflow: 'auto', border: '2px solid #000000', borderRadius: '10px' }}>
                    {
                        userList.map((user) => {
                            return (

                                <div key={user.id} onClick={() => {
                                    setTempCard([{
                                        "type": "twitch",
                                        "userName": user.display_name
                                    }]);
                                }}>
                                    <Grid container justifyContent={'center'} marginTop={2}>
                                        <Grid item xs={6}>
                                            <img src={user.thumbnail_url} width="125px" height="125px" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '20px', textAlign: 'center' }}>
                                                {user.display_name}
                                            </Typography>
                                            {user.is_live ? <img src={live} width="25%" /> : null}
                                        </Grid>
                                    </Grid>

                                </div>
                            );
                        })
                    }
                </Paper>
            }
            <ConfirmCardButtons tempCard={tempCard} userCards={userCards} setUserCards={setUserCards} />
        </div>
    );
}

export const DisplayTwitchUser = (props) => {
    const [userToDisplay, setUserToDisplay] = useState([]);
    const { card, idx, isEdit } = props;
    useEffect(() => {
        TwitchUserSearchById(card["userName"], setUserToDisplay);
    }, [card]);
    useEffect(() => {
        if (userToDisplay["display_name"]);
        console.log(userToDisplay);
    }, [userToDisplay]);


    return (
        userToDisplay["display_name"] &&
        <Grid item key={userToDisplay.id} align={"center"} xs={12}>
            <Box width='400px' height='150px' justifyContent='center' style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
                <Grid container width='400px' height='150px' justifyContent='center' style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
                    <Grid item xs={12} key={userToDisplay.id}>
                        <Grid container justifyContent={'center'} marginTop={2}>
                            <Grid item xs={6}>
                                <img src={userToDisplay.thumbnail_url} width="125px" height="125px" />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '20px', textAlign: 'center' }}>
                                    {userToDisplay.display_name}
                                </Typography>
                                {userToDisplay.is_live ? <img src={live} width="25%" /> : null}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    isEdit &&
                    <DeleteCardButton idx={idx} />
                }
            </Box>
        </Grid>
    )
}