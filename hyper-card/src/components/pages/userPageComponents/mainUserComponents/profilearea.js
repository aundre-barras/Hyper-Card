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
import { Link, useLocation} from 'react-router-dom';
import { EditDescription } from './editdescription';
import { ChangeTheme } from './changetheme';
import { ChangeColor } from './changecolor';
import { DisplayCard } from './displayCard';


import {storage} from '../../firebase-config';
import {ref, getDownloadURL} from 'firebase/storage'
import { GetShoutOut } from './getshoutout';
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { EditShoutOuts } from './editshoutouts';




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
                                backgroundColor: user.theme.backgroundColor,
                                backgroundImage: `${user.theme.backgroundImage}`,
                                backgroundPosition: user.theme.backgroundPosition,
                                backgroundSize: user.theme.backgroundSize,
                                backgroundRepeat: user.theme.backgroundRepeat,
                                backgroundAttatchment: "relative",
                                overflow: "scroll",
                                scrollbarWidth: "none",
                                overflowX: "hidden",
                                height: "100%",
                                width: "100%"
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
                                  height: "20vh",
                                  width: "20vh",
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
                            <Typography
                            variant="h6"
                            width="400px"
                            height="auto"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            textOverflow="clip"
                            sx={{
                                margin: '30px',
                                color: `${user.colors.text_color}`,
                                overflowWrap: "break-word",
                                wordWrap: "break-word",
                                wordBreak: "break-word",
                            }}
                            >
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
                        isAuth ? (
                       
                        <div>


                            {
                                !isEdit?
                                <Box display="flex" justifyContent="center" alignItems="center">
                            {
                            !user.content.length > 0 &&
                                <Typography align='center' variant='h2' sx={{
                                    fontStyle: 'bold',
                                    width: '60%',
                                    height: 100,
                                    fontSize: "5vh",
                                    color: `${user.colors.text_color}`
                                }}>
                                it looks like your profile page is empty :/
                                </Typography>
                            }
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
                           
                            <Grid container justifyContent="center" alignItems="center" columns={1} sx = {{padding: "5px"}}>
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
   
                            <DisplayCard userCards={user.content} colors={user.colors} isEdit={isEdit}/>
                            {
                                isEdit &&


                                    <AddContent userCards = {user.content} setUserCards = {setUserCards}/>


                            }


                            <Box marginTop={5} display="flex" justifyContent="center"sx={{
                                height: 100,
                            }}>


                                { !isEdit ?
                                    <Button
                                   
                                    variant="contained"
                                    onClick={() => {setIsEdit(true);}}
                                    sx={{
                                    backgroundColor: `${user.colors.button_color}`,
                                    borderRadius: 5,
                                    height: 40,
                                    width: 175,
                                    fontStyle: 'bold',
                                    color: `${user.colors.secondary_text_color}`,
                                    fontFamily: "Outfit",
                                    fontSize: "18px",
                                    lineHeight: "25px",
                                    display: "flex",
                                    alignItems: "center",
                                    textAlign: "center",
                                    textTransform:'lowercase'
                                    }}>


                                    {user.content.length > 0 ? "edit page" : "lets change that"}
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
                                    color: `${user.colors.secondary_text_color}`,
                                    fontFamily: "Outfit",
                                    fontSize: "18px",
                                    lineHeight: "25px",
                                    display: "flex",
                                    alignItems: "center",
                                    textAlign: "center",
                                    textTransform:'lowercase'
                                }}>
                                stop editing
                                </Button>


                                }


                            </Box>


                        </div>
                        ) : <DisplayCard userCards={user.content}/>
                    }
                   
                    { user.shoutouts.length > 0 &&
                        <Box sx = {{
                        position: 'relative',
                        marginBottom: "130px"
                        }}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Typography
                            variant='h4'
                            sx = {{
                                fontStyle: 'bold',
                                color: `${user.colors.text_color}`,
                                margin: "15px"
                            }}
                            >
                                shout outs: {isEdit && <>{user.shoutouts.length} / 6</>}
                            </Typography>
                        </Box>


                        {!isEdit ?
                       
                        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row">
                            {user.shoutouts.map((shoutout, i) => {
                                return(
                                <div key = {shoutout}>
                                <Box sx = {{
                                    marginRight: "10px"
                                }}>
                                    <GetShoutOut shout_out_uid = {shoutout} text_color = {user.colors.text_color}/>
                                </Box>
                                </div>
                                )


                            })}
                        </Box>
                       
                        :


                        <EditShoutOuts shoutouts = {user.shoutouts} text_color = {user.colors.text_color}/>
                        }


                        </Box>
                    }
                   
                    <Typography display="flex" justifyContent="center" alignItems="center" variant='h1' color={user.colors.secondary_text_color}
                    component={Link} to="/"
                    onClick={ () => {window.location.reload();}}
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

