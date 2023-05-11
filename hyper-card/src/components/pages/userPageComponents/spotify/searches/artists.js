import { Fragment, useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET_ID } from "../spotify-config";
import { Grid , Box , Paper , Button, Typography } from "@mui/material";
import { ConfirmCardButtons } from "../../mainUserComponents/confirmCardButtons"
import { SearchArtistId } from "../spotifysearchbyId";
import spotify from '../../../../media/spotify.png';

export const Artists = (props) => {
  const searchInput = props.to_search;
  const { userCards , setUserCards } = props;
  const [artists, setArtists] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [tempCard, setTempCard] = useState([]);
  let temp = [];

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
      <Paper style={{maxHeight:'285px', overflow: 'auto', border:'2px solid #000000', borderRadius:'10px'}}>
      {
        artists.map((artist) => {
          return (
            <div key={artist.id} onClick={()=> {
              setTempCard([{
                "type": "spotify",
                "spotify_type": "artist",
                "artistId": artist.id
              }]);              
            }}>
              <Grid container justifyContent='center' alignItems='center'>
                <Grid item xs={6}>
                  {
                    artist.images && artist.images[0] ?
                      <img src={artist.images[0].url} width="125px" height='125px' alt={artist.name} /> : null
                  }
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{fontFamily:'Outfit', fontWeight:700, fontSize:'16px', textAlign:'center'}}>
                    {artist.name}
                  </Typography>
                  <Typography marginTop={1} sx={{fontFamily:'Outfit', fontWeight:700, fontSize:'12px', textAlign:'center'}}>
                    Followers: {artist.followers.total}
                  </Typography>
                </Grid>
              </Grid>
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
  const [artistsToDisplay, setArtistsToDisplay] = useState([]);
  const { card } = props;
  SearchArtistId(card["artistId"] , setArtistsToDisplay);

  return (
    artistsToDisplay["name"] &&
    <Grid item key={artistsToDisplay.id} align={"center"} xs={12}>
      <Grid container width='400px' height='150px' justifyContent='center' style={{ borderRadius:'10px', background:'rgba(255, 255, 255, 0.8)'}}>
        <Grid item xs={5} justifyContent='center' alignItems='center' display='flex'>
          {
            artistsToDisplay.images && artistsToDisplay.images[0] ?
              <img src={artistsToDisplay.images[0].url} width="125px" height='125px' style={{borderRadius:'10px'}} alt={artistsToDisplay.name} /> : null
          }
        </Grid>
        <Grid item xs={5} justifyContent='center' alignItems='center' display='flex'>
          <Typography sx={{fontFamily:'Outfit', fontWeight:700, fontSize:'20px', textAlign:'center'}}>
            {artistsToDisplay.name} <br/>
            <Typography sx={{fontFamily:'Outfit', fontWeight:700, fontSize:'16px', textAlign:'center'}}>
              Followers: {artistsToDisplay.followers.total}
            </Typography>
          </Typography> 
        </Grid>

        <Grid item xs={2} justifyContent='flex-end' alignItems='flex-start' display='flex'>
          <a href = {artistsToDisplay.external_urls.spotify} target="_blank" rel="noreferrer">
            <img src={spotify} alt="logo" style={{ width: "25px", height: "25px" }}/>
          </a>
        </Grid>
      </Grid>
    </Grid>
  )
}