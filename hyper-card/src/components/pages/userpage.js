import {
    Typography,
    Button,
    Box,
    Grid,
    Avatar,
    Stack,
    TextField,
    IconButton
} from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ghost from '../media/ghost.png'
import { Image } from 'mui-image'
import {ThemeProvider } from '@mui/material/styles';
import {React, Fragment, useState, useEffect} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom"

import {collection, getDocs, query, where} from "firebase/firestore";

import {getDownloadURL, ref, listAll} from "firebase/storage";

import {db, storage} from "../firebase-config";

import {UserTheme} from "./userPageComponents/usertheme";

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase-config';

import GlobalStyles from '@mui/material/GlobalStyles';
//

const TopMenu = (props) => {
    const {setSubMenu} = props;
    
    return (
        <Grid container sx={{
            height: 100,
            justifyContent: 'center'
        }}>
            <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-start" alignItems="flex-start" sx={{
                    height: '100%',
                }}>
                    
                    <Box sx={{
                        position: 'relative',
                        height: 75,
                        width: 75,
                        left: 16,
                        top: 13
                    }}>
                    </Box>

                </Box>

            </Grid>
            <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" alignItems="flex-start" sx={{
                    height: '100%',
                }}>
                    <Box sx={{
                        position: 'relative',
                        height: 75,
                        width: 75,
                        backgroundColor: 'white',
                        top: 13,
                        right: 16
                    }}>
                        <MenuRoundedIcon onClick={setSubMenu} sx={{
                            fontSize: 75
                        }}/>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

const AddContent = (props) => {
    return (
        <Grid container justifyContent="center" alignItems='center'>
            <Grid item xs={12} sx={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography align='center'>
                    Link Type
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Box display='flex' justifyContent='center' 
                sx={{
                    border: 2,
                    borderColor: 'black',
                    width: '80%',
                    marginLeft: 2
                }}>
                    add link
                </Box>
            </Grid>
            <Grid item xs={4}>
            <Box display='flex' justifyContent='center' 
                sx={{
                    border: 2,
                    borderColor: 'black',
                    width: '80%',
                    marginLeft: 2
                }}>
                    Spotify
                </Box>
            </Grid>
            <Grid item xs={4}>
            <Box display='flex' justifyContent='center' 
                sx={{
                    border: 2,
                    borderColor: 'black',
                    width: '80%',
                    marginLeft: 2
                }}>
                    SoundCloud
                </Box>
            </Grid>
            <Grid item xs={12}>
                <AddLink/>
            </Grid>
            <Grid item xs={12}>
                <Box position={'absolute'} bottom={0}>
                    <Button variant="contained" sx={{
                                        borderRadius: 5,
                                        height: 40,
                                        width: 100,
                                        fontStyle: 'bold',
                                        marginLeft: 2,
                                        marginBottom: 2
                                    }}>
                                    confirm
                    </Button>
                    <Button variant="contained" sx={{
                                        borderRadius: 5,
                                        height: 40,
                                        width: 100,
                                        fontStyle: 'bold',
                                        marginLeft: 40,
                                        marginBottom: 2
                                    }}>
                                    cancel
                    </Button>
                </Box>
            </Grid>
        </Grid>        
    )
}

const AddLink = (props) => {

    return ( 
            <Grid container>
                <Grid item xs={12} marginLeft={'10%'} marginTop={5}>
                    <Typography variant='h4' marginLeft={4}>
                        title
                    </Typography>
                    <Box display='flex' sx={{
                            border: 2,
                            borderRadius: '35px',
                            marginRight: 10,
                            width: '80%'
                    }}>
                            <TextField variant='standard' onChange={(event) => {console.log(event.target.value)}} InputProps={{ disableUnderline: true }} defaultValue={'enter title of url here'} sx = {{
                                fontStyle: 'bold',
                                color: `black`,
                                width: '100%',
                                marginLeft: 1
                                }}>
                                
                            </TextField>
                    </Box>   
                </Grid>
                <Grid item xs={12} marginLeft={'10%'}>
                    <Typography variant='h4' marginLeft={4}>
                        url
                    </Typography>
                    <Box display='flex' sx={{
                            border: 2,
                            borderRadius: '35px',
                            marginRight: 10,
                            width: '80%'
                    }}>
                            <TextField variant='standard' onChange={(event) => {console.log(event.target.value)}} InputProps={{ disableUnderline: true }} defaultValue={'://'} sx = {{
                                fontStyle: 'bold',
                                color: `black`,
                                width: '100%',
                                marginLeft: 1
                                }}>
                                
                            </TextField>
                    </Box>   
                </Grid>
                <Grid item>
                    
                </Grid>
            </Grid>
    )
}

const ProfileArea = (props) => {
    
    const {userData, isAuth, isEdit, setIsEdit} = props;

    const hexToRGBA = (hex) => {
        try {
            var c;
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                c= hex.substring(1).split('');
                if(c.length== 3){
                    c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c= '0x'+c.join('');
                console.log()
                return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',.3)';
            }
            throw new Error('Bad Hex'); 
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <div>

            {
            
            userData.map((user) => (
                <div key = {user}>
                    <GlobalStyles
                        styles={{
                            body: { 
                                backgroundColor: `${hexToRGBA(user.theme.background_color)}`,
                                background: `${user.theme.background}`,
                                backgroundPosition: `${user.theme.background_position}`,
                                backgroundSize: `${user.theme.background_size}`,
                                backgroundRepeat: `${user.theme.background_repeat}`,
                                backgroundAttatchment: "fixed"
                            }
                        }}
                    />
                    <ThemeProvider theme = {UserTheme}>
                    <Stack justifyContent={'center'}>
                    <Grid container justifyContent="center" alignItems="center" columns={1}>
                        <Grid item>
                        {
                                !isEdit ?
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{
                                height: 150,
                                width: 150,
                                borderRadius: '50%',
                                backgroundColor: '#FFFFFF',
                            }}>
                                <Box sx={{
                                    position: 'relative',
                                    height: '70%',
                                }}>
                                    <Image src={ghost}/>
                                </Box>
                            </Box>
                            :
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{
                                height: 150,
                                width: 150,
                                borderRadius: '50%',
                                backgroundColor: '#D8D8D8',
                            }}>
                                <Box sx={{
                                    position: 'relative',
                                    height: '70%',
                                }}>
                                    <Image src={ghost} sx={{
                                        filter: 'blur(3.5px)'
                                    }}/>
                                    <Typography variant="caption" sx={{
                                        position: "absolute",
                                        color: 'white',
                                        textalign: 'center',
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: 'fit-content',
                                        width: 90,
                                        margin: 'auto',
                                    }}>
                                        Tap to change
                                    </Typography>
                                </Box>
                            </Box>
                            }
                        </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="center">
                    {
                            !isEdit ?
                            <Typography variant='h4' sx = {{
                        fontStyle: 'bold',
                        color: `${user.colors.text_color}`
                        }}>
                        /{user.displayname}

                       
                    </Typography>
                    :
                    <Box display="flex" justifyContent="center" sx={{
                        position: "center",
                        marginTop: 5
                    }}>
                        <Box display='flex' sx={{
                            border: 2,
                            borderRadius: '35px',
                            marginRight: 10
                        }}>
                            <Typography variant='h6' sx={{marginLeft: 1}}>
                                /
                            </Typography>
                            <TextField variant='standard' onChange={(event) => {console.log(event.target.value)}} InputProps={{ disableUnderline: true }} defaultValue={user.displayname} sx = {{
                                fontStyle: 'bold',
                                color: `black`,
                                width: 200
                                }}>
                                
                            </TextField>
                        </Box>
                        <Button variant="contained" sx={{

                            }}>
                                Update
                        </Button>    
                    </Box>
                        }
                    </Box>

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
                                color: `${user.colors.text_color}`
                            }}>
                            it looks like your profile is empty :/
                            </Typography>
                        </Box>
                        :
                        <Box display='flex' sx={{
                            justifyContent: 'center'}}>

                        
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{
                                height: 75,
                                border: 2,
                                borderRadius: '35px',
                                marginTop: 5,
                                width: 380
                            }}>
                                <TextField
                                id="user-description"
                                multiline
                                size='small'
                                variant='standard'
                                InputProps={{ disableUnderline: true }}
                                inputProps={{min: 0, style: { textAlign: 'center' }}}
                                rows={2}
                                defaultValue="Enter new Description here"
                                sx={{
                                    width: 370
                                }}
                            />
                            </Box>
                        </Box>
                        }
                        {
                            isEdit &&                      
                            <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                            <Box display='flex' justifyContent='center'>
                            <Box sx={{
                                justifyContent: 'center',
                                height: 56,
                                width: 56,
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                marginTop: 5
                            }}>
                                <IconButton {...bindTrigger(popupState)}>
                                    <AddRoundedIcon sx={{
                                        fontSize: 40
                                    }}/>
                                </IconButton>
                            </Box>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                                }}
                                transformOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                                }}
                            >
                                <Box sx={{
                                    height: '80vh',
                                    width: '80vh'
                                }}>
                                    <AddContent/>
                                </Box>
                            </Popover>
                            </Box>
                        )}
                        </PopupState>
                        }
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{
                            height: 100
                        }}>
                            { !isEdit ?
                                <Button variant="contained" onClick={() => {
                                setIsEdit(true);
                            }} sx={{
                                backgroundColor: `${user.colors.button_color}`,
                                borderRadius: 5,
                                height: 40,
                                width: 175,
                                fontStyle: 'bold',
                                color: `${user.colors.text_color}`
                            }}>
                            lets change that
                            </Button>
                                :
                            <Button variant="contained" onClick={() => {
                                setIsEdit(false);
                                }} sx={{
                                backgroundColor: `${user.colors.button_color}`,
                                borderRadius: 5,
                                height: 40,
                                width: 175,
                                fontStyle: 'bold',
                                color: `${user.colors.text_color}`
                            }}>
                            stop editing
                            </Button>
                            }
                        </Box>
                        </div>
                    }
                    </Stack>
                    </ThemeProvider>

            </div>
            ))}
        </div>
    );
}

export const UserPage = (props) => {
    const [isMenuOpen , setMenuOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const navigate = useNavigate();
    const userContent = useParams();

    // userData: State to hold data of user
    // userProfilePhoto: used to store users profile image thats stored in firebase storage

    const [userData, setUserData] = useState([]);
    const [userProfilePhoto, setUserProfilePhoto] = useState("");

    // References to collections of database and storage

    const usersRef = collection(db, "users");
    const imagesListRef = ref(storage, "profile_images/");
    
    // Calls this everytime an update is changed and on initial rendering 
    // (technically does it after the first render but this is intentional)

    useEffect(() => {
        getUserData();
    }, []);

    const getUserImage = async () => {
        const storageRef = ref(storage, );
        return;

    }
    
    // Gets users data from Firestore (db) 
    const getUserData = async () => {

        try {
            // query name to determine if user exists and to pull data
            // takes snapshot of docs with dispaly name

            const userQuery = query(usersRef, where("displayname", "==", userContent.id));
            const userQuerySnapshot = await getDocs(userQuery);


            // if query snapshot is empty, then means user does not exist and will reroute to home page

            if (userQuerySnapshot.empty){
                navigate("/login");
                setTimeout(window.alert("User does not exist!"), 1500);
                return;
            }

            // takes data from query snapshot and stores it in filteredData
            // sets filteredData to setUserData

            const filteredData = userQuerySnapshot.docs.map((doc) => ({
                ...doc.data(), id:doc.id
            }));


            onAuthStateChanged(auth, (user) => {
                if (user && filteredData[0].id == user.uid){
                    setIsAuth(true);
                }
            });

            setUserData(filteredData);

        } catch (error) {

            console.error(error);
        }
    };

    const setSubMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    return(
        <Fragment>
            <TopMenu/>
            <ProfileArea
               userData = {userData} isAuth = {isAuth} isEdit={isEdit} setIsEdit={setIsEdit}/>
        </Fragment>
    )
}
