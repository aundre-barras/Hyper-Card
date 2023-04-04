
// Frontend imports
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import logoCircle from '../media/logo-no-circle.png';
import menu from '../media/menu.png';
//

// Backend imports 
import {React, useEffect, useState} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom"

import {collection, getDocs, query, where} from "firebase/firestore";

import {getDownloadURL, ref, listAll} from "firebase/storage";

import {db, storage} from "../firebase-config";

import {UserTheme} from "./userPageComponents/usertheme";

//

/*
    UserPage:
        Used to pull data about user if a user displayname is found
        Takes param from React Router to determine the display name
        Will redirect user back to the home page with a notification that user does not exist

**/

export const UserPage = () => {

    // Navigation is used in routing back to home page
    // userParams is taken from the React router to determine display name url

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

    // Gets the user's designated image from storage and holds it in userProfilePhoto
    const getUserImage = async () => {
        console.log(userData[0].profile_image);
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
                navigate("/");
                setTimeout(window.confirm("User does not exist!"), 1500);
                return;
            }

            // takes data from query snapshot and stores it in filteredData
            // sets filteredData to setUserData

            const filteredData = userQuerySnapshot.docs.map((doc) => ({
                ...doc.data(), id:doc.id
            }));
            setUserData(filteredData);

        } catch (error) {

            console.error(error);
        }
    };


    return (
        <div>
        {userData.map((user) => (
            <div key = {user}>
            <ThemeProvider theme={UserTheme(user.colors.main_color, user.colors.secondary_color,user.colors.text_color)}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />

                {/* <Box
                    sx={{
                        

                    marginTop: 1,
                    position: "absolute",
                    left: "1000px",
                    top: "26px"
                    }}
                >           
                <img src={menu} style = {{ width: "75px", height: "75px" }}/> 
                </Box> */}

                <Box
                    sx={{
                        
                    position: "absolute",
                    marginTop: 1,
                    left: "20px",
                    top: "13px",
                    }}
                >           
                <img src={logoCircle} style = {{ width: "50px"}}/> 
                </Box>
                

                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <img src={getUserImage()} style = {{ width: "150px", height: "150px" }}/>   
                    <text style={{
                    fontFamily: "Montserrat",
                    fontWeight: 800,
                    fontSize: "24px",
                    color: `${user.colors.text_color}`
                    }}>
                    {user.firstname} {user.lastname}
                    
                    </text>

                </Box>

                <Box
                    sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >           
                    <text style={{
                    fontFamily: "Montserrat",
                    fontWeight: 400,
                    fontSize: "16px",
                    color: `${user.colors.text_color}`
                    }}>
                    {user.description}
                    
                    </text>

                </Box>

                </Container>
            </ThemeProvider>
            </div>
        ))}
        </div>

    );
};