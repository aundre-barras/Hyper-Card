import {
    Typography,
    Button,
    Box,
    Grid,
    Stack,
} from '@mui/material';

import GlobalStyles from '@mui/material/GlobalStyles';
import {ThemeProvider } from '@mui/material/styles';
import {UserTheme} from "../usertheme";
import { AddContent } from './addcontent';

import { useState, useEffect } from 'react';
import {EditDisplayName} from './editdisplayname';
import { EditProfileImage } from './editprofileimage';
import { Link } from 'react-router-dom';
import { EditDescription } from './editdescription';
import { ChangeTheme } from './changetheme';
import { ChangeColor } from './changecolor';
import { hexToRGBA } from '../stylizers/hexToRGBA';
import { DisplayCard } from './displayCard';

import {storage} from '../../firebase-config';
import {ref, getDownloadURL} from 'firebase/storage'
import { GetShoutOut } from './getshoutout';

export const ProfileArea = (props) => {

    const {userData, isAuth, isEdit, setIsEdit} = props;
    const [ userCards , setUserCards ] = useState([]);
    const [userImage, setUserImage] = useState("");

    const getImage = async () => {
        try {
          const url = await getDownloadURL(ref(storage, `profile_images/${userData[0].profile_image}`));
          setUserImage(url);
        } catch (error) {
          console.error(error);
        }
    }

    const updateUserImage = (value) => {
        setUserImage(value);
      };
    useEffect(() => {
        
        getImage();
    }, [userData])

    return (
        <div>
            {
            userData.map((user) => (
                <div key = {user}>
                    <GlobalStyles
                        styles={{
                            body: { 
                                backgroundColor: `${hexToRGBA(user.theme.backgroundColor)}`,
                                background: `${user.theme.background}`,
                                backgroundPosition: `${user.theme.backgroundPosition}`,
                                backgroundSize: `${user.theme.backgroundSize}`,
                                backgroundRepeat: `${user.theme.backgroundRepeat}`,
                                backgroundAttatchment: "relative",
                                minHeight: "100vh"
                            }
                        }}
                    />
                    <ThemeProvider theme = {UserTheme}>
                    <Stack justifyContent={'center'}>
                    <Grid container justifyContent="center" alignItems="center" columns={1}>
                        <Grid item>
                        {
                                !isEdit ?

                                <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  height: 150,
                                  width: 150,
                                  borderRadius: '50%',
                                  backgroundImage: `url(${userImage})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  overflow: 'hidden',
                                  border: 6,
                                  borderColor: `${user.colors.text_color}`
                                }}
                                >
                                </Box>
                            
                            :

                            <EditProfileImage profileImage={userData[0].profile_image} textColor={user.colors.text_color} checkValue={updateUserImage} />
                            }
                        </Grid>

                            
                    </Grid>


                    
                        {
                            !isEdit ?
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <Typography variant='h4' sx = {{
                                    fontStyle: 'bold',
                                    color: `${user.colors.text_color}`
                                }}>
                                /{user.displayname}
                            </Typography>
                            <Typography variant = 'h6' width="400px" height= '75px' textAlign="center" display="flex" justifyContent="center" alignItems="center" textOverflow="clip" sx={{
                                textIndent: "10%",
                                textOverflow: "inherit",
                                color: `${user.colors.text_color}`
                            }}>
                                {user.description}
                            </Typography>
                            </Box>

                        :
                            <EditDisplayName 
                            displayname = {user.displayname}
                            button_color = {user.colors.button_color}
                            secondary_text_color = {user.colors.secondary_text_color}
                            />
                        }
                    

                    {
                        isAuth &&
                        
                        <div>

                            {
                                !isEdit?

                                
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{
                                height: 200
                            }}>

                                <Typography align='center' variant='h2' sx={{
                                    fontStyle: 'bold',
                                    width: '60%',
                                    fontSize: "350%",
                                    color: `${user.colors.text_color}`
                                }}>
                                {/* // add if statement once when content is done */}
                                it looks like your profile is empty :/
                                </Typography>
                            </Box>
                            :
                            <Box display='flex' sx={{
                                justifyContent: 'center'}}>

                            
                                <EditDescription 
                                description = {user.description} 
                                button_color = {user.colors.button_color}
                                secondary_text_color = {user.colors.secondary_text_color}
                                />
                                
                            </Box>
                            }
                            {isEdit && 
                            
                            <Grid container justifyContent="center" alignItems="center" columns={1} sx = {{padding: "5px", width: "100%"}}>
                            <ChangeTheme 
                                button_color = {user.colors.button_color} 
                                secondary_text_color = {user.colors.secondary_text_color}
                                main_color = {user.colors.main_color}
                                secondary_color = {user.colors.secondary_color}
                            />

                            
                            <ChangeColor
                                button_color = {user.colors.button_color} 
                                secondary_text_color = {user.colors.secondary_text_color}
                            />
                            </Grid>
                            }
                            {
                                userCards.length > 0 &&
                                    <DisplayCard userCards={userCards}/>
                            }
                            {
                                isEdit &&

                                    <AddContent userCards = {userCards} setUserCards = {setUserCards}/>

                            }

                            <Box display="flex" justifyContent="center"sx={{
                                height: 400,
                            }}>

                                { !isEdit ?
                                    <Button variant="contained" onClick={() => {setIsEdit(true);}} 
                                    sx={{
                                    backgroundColor: `${user.colors.button_color}`,
                                    borderRadius: 5,
                                    height: 40,
                                    width: 175,
                                    fontStyle: 'bold',
                                    color: `${user.colors.secondary_text_color}`,
                                    }}>
                                    lets change that
                                    </Button>
                                    :
                                <Button variant="contained" onClick={() => {
                                    setIsEdit(false);
                                    }} 
                                    sx={{
                                    backgroundColor: `${user.colors.button_color}`,
                                    borderRadius: 5,
                                    height: 40,
                                    width: 175,
                                    fontStyle: 'bold',
                                    top: 40,
                                    color: `${user.colors.secondary_text_color}`
                                }}>
                                stop editing
                                </Button>

                                }

                            </Box>

                        </div>
                    }
                    { user.shoutouts.length > 0 &&
                        <Box sx = {{
                        position: 'relative',
                        top: "-200px",
                        }}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Typography 
                            variant='h4' 
                            sx = {{
                                fontStyle: 'bold',
                                color: `${user.colors.text_color}`
                            }}
                            >
                                shout outs
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row">
                            {user.shoutouts.map((shoutout, i) => {
                                return(
                                <div key = {shoutout}>
                                <Box >
                                    <GetShoutOut shout_out_uid = {shoutout} text_color = {user.colors.text_color}/>
                                </Box>
                                </div>
                                )

                            })}
                        </Box>
                        </Box>
                    }
                    
                    <Typography display="flex" justifyContent="center" alignItems="center" variant='h1' color={user.colors.secondary_text_color} 
                    component={Link} to="/" 
                    style={{ 
                        textDecoration:"none",
                        fontSize: "40px",

                    }}>
                    hypr
                    <span style={{color:`${user.colors.text_color}`}}>crd</span>
                    </Typography>

                    </Stack>
                    </ThemeProvider>

            </div>
            ))}
        </div>
    );
}