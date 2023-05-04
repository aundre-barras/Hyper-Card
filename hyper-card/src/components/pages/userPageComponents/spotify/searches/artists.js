import { useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid , Box , Paper , Button } from "@mui/material";
import { ConfirmCardButtons } from "../../mainUserComponents/confirmCardButtons"

export const Artists = (props) => {
  const searchInput = props.to_search;
  const { userCards , setUserCards } = props;
  const [artists, setArtists] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [tempCard, setTempCard] = useState([]);

  const search = async () => {
    try {
        const searchParams = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
        }
        };

        await fetch(
        "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist&limit=10", searchParams
        )
        .then((response) => response.json())
        .then((data) => {
            if (data.artists && data.artists.items) {
              setArtists(data.artists.items);
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
    if (accessToken) {
      search();
    }
  }, [accessToken]);

  return (
    <div>
      <Paper style={{maxHeight: 180, overflow: 'auto'}}>
      {
        artists.map((artist) => {
          return (
            <div key={artist.id} onClick={()=> {
              setTempCard([{
                "type": "spotify",
                "spotify_type": "artist",
                "artistId": artist.id
              }])
            }}>
              <h2>
                {artist.name}
              </h2>

              {
                artist.images && artist.images[0] ?
                  <img src={artist.images[0].url} width="10%" alt={artist.name} /> : null
              }

              <h3>Followers: {artist.followers.total}</h3>
              <a href = {artist.external_urls.spotify}>Spotify</a>

            </div> 
          );
        })

      }
    </Paper>
    <ConfirmCardButtons tempCard={tempCard} userCards={userCards} setUserCards={setUserCards}/>
    </div>
    
  );
};

export const DisplayArtist = (props) => {
  const { card } = props;

  return (
    <Box display={"flex"} justifyContent={"center"}>
      {
        card["spotify_type"]
      }
    </Box>
  )
}