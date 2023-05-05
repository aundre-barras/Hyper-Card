import {useState, useEffect} from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid , Box , Paper , Button, Typography } from "@mui/material";
import { ConfirmCardButtons } from "../../mainUserComponents/confirmCardButtons";

export const Albums = (props) => {
    const searchInput = props.to_search;
    const { userCards , setUserCards } = props;
    const [albums, setAlbums] = useState([]);
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
            "https://api.spotify.com/v1/search?q=" + searchInput + "&type=album&limit=10",
            searchParams
            )
            .then((response) => response.json())
            .then((data) => {
                if (data.albums && data.albums.items){
                  setAlbums(data.albums.items);
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
            <Paper style={{maxHeight:'285px', overflow: 'auto', border:'2px solid #000000', borderRadius:'10px'}}>
                {albums.map((album) => {
                return (
                  <div key={album.id} onClick={() => {
                        setTempCard([{
                            "type": "spotify",
                            "spotify_type": "album",
                            "albumId": album.id
                          }])
                    }}>
                      <Grid container>
                        <Grid item xs={6}>
                          {
                          album.images && album.images[0] ?
                          <img src={album.images[0].url} width="125px" height='125px' alt={album.name} /> : null
                          }
                          <h4>{album.popularity}</h4>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography sx={{fontFamily:'Outfit', fontWeight:700, fontSize:'20px', textAlign:'center'}}>
                            {album.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                )
            })}
            </Paper>
            <ConfirmCardButtons tempCard={tempCard} userCards={userCards} setUserCards={setUserCards}/>
        </div>
    )
}

export const DisplayAlbum = (props) => {
    const { card } = props;
  
    return (
      <Box display={"flex"} justifyContent={"center"}>
        {
          card["spotify_type"]
        }
      </Box>
    )
  }