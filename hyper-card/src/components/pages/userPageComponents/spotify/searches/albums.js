import { useState, useEffect } from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid, Box, Paper, Button, Typography } from "@mui/material";
import { ConfirmCardButtons } from "../../mainUserComponents/confirmCardButtons";
import { SearchAlbumId } from "../spotifysearchbyId";
import spotify from '../../../../media/spotify.png';
import { DeleteCardButton } from "../../mainUserComponents/deleteCard";

export const Albums = (props) => {
  const searchInput = props.to_search;
  const { userCards, setUserCards } = props;
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
          if (data.albums && data.albums.items) {
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
      {
        albums.length > 0 &&
        <Paper style={{ maxHeight: '285px', overflow: 'auto', border: '2px solid #000000', borderRadius: '10px' }}>
          {albums.map((album) => {
            return (
              <div key={album.id} onClick={() => {
                setTempCard([{
                  "type": "spotify",
                  "spotify_type": "album",
                  "albumId": album.id
                }]);
              }}>
                <Grid container justifyContent='center' alignItems='center'>
                  <Grid item xs={6}>
                    {
                      album.images && album.images[0] ?
                        <img src={album.images[0].url} width="125px" height='125px' alt={album.name} /> : null
                    }
                  </Grid>

                  <Grid item xs={6}>
                    <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', textAlign: 'center' }}>
                      {album.name}
                      <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '12px', textAlign: 'center' }}>
                        {album.artists[0].name}
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            )
          })}
        </Paper>
      }

      <ConfirmCardButtons tempCard={tempCard} userCards={userCards} setUserCards={setUserCards} />
    </div>
  )
}

export const DisplayAlbum = (props) => {
  const [albumToDisplay, setAlbumToDisplay] = useState([]);
  const { card, idx, isEdit } = props;
  SearchAlbumId(card["albumId"], setAlbumToDisplay);

  return (
    albumToDisplay["name"] &&
    <Grid item key={albumToDisplay.id} width={"50vw"} align={"center"} xs={12}>
      <Box width='400px' height='150px' justifyContent='center' style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
        <Grid container width='400px' height='150px' justifyContent='center' style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
          <Grid item xs={5} justifyContent='center' alignItems='center' display='flex'>
            {
              albumToDisplay.images && albumToDisplay.images[0] ?
                <img src={albumToDisplay.images[0].url} width="125px" height='125px' style={{ borderRadius: '10px' }} alt={albumToDisplay.name} /> : null
            }
          </Grid>

          <Grid item xs={5} justifyContent='center' alignItems='center' display='flex'>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '20px', textAlign: 'center' }}>
              {albumToDisplay.name} <br />
              <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', textAlign: 'center' }}>
                {albumToDisplay.artists[0].name}
              </Typography>
            </Typography>
          </Grid>

          <Grid item xs={2} justifyContent='flex-end' alignItems='flex-start' display='flex'>
            <a href={albumToDisplay.external_urls.spotify} target="_blank" rel="noreferrer">
              <img src={spotify} alt="logo" style={{ width: "25px", height: "25px" }} />
            </a>
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