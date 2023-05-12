import { useEffect } from "react";

export const TwitchUserSearchById = (userName, setUserToDisplay) => {
    const CLIENT_ID = "xe63rh59a3b1pomi5s7nw3lc5r2y7y";
    const CLIENT_SECRET_ID = "6k4n62upopxdmfyfd9s4x7dmej76a5";

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

    const GetUserSearchById = async () => {
        try {     
                const endpoint = `https://api.twitch.tv/helix/search/channels?query=${userName}&first=1`;

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
                    .then((data) => {
                        setUserToDisplay(data.data[0]);
                    });
        } catch (error) {

            console.error(error);

        }
    }
    GetUserSearchById();

}