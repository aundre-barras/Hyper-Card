import {
    Typography,
    Button,
    Box,
    Grid,
    Avatar,
    Stack
} from '@mui/material';
import logo from '../media/logo-circle.png';
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

const ProfileArea = (props) => {
    
    const {userData} = props;
    const {isAuth} = props;
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
                            }
                        }}
                    />
                    <ThemeProvider theme = {UserTheme}>
                    <Stack justifyContent={'center'}>
                    <Grid container justifyContent="center" alignItems="center" columns={1}>
                        <Grid item>
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
                        </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="center">
                    <Typography variant='h4' sx = {{
                        fontStyle: 'bold',
                        color: `${user.colors.text_color}`
                        }}>
                        /{user.displayname}

                       
                    </Typography>
                    </Box>

                    {
                        isAuth &&
                        
                        <div>

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
    
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{
                            height: 100
                        }}>
                            <Button variant="contained" sx={{
                                backgroundColor: `${user.colors.button_color}`,
                                borderRadius: 5,
                                height: 40,
                                width: 175,
                                fontStyle: 'bold',
                                color: `${user.colors.text_color}`
                            }}>
                            add some links
                            </Button>
                        </Box>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Typography variant='h1' color="#5B7ABC" 

                                style={{ textDecoration:"none"}}>
                                <span style={{color:`${user.colors.text_color}`}}>hypr</span>
                                <span style={{color:`${user.colors.secondary_color}`}}>crd</span>
                            
                                </Typography>
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
        console.log('here');
    }

    return(
        <Fragment>
            <TopMenu/>
            <ProfileArea
               userData = {userData} isAuth = {isAuth}/>
        </Fragment>
    )
}
