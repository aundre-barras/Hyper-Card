
//
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

import {React, useEffect, useState} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom"

import {collection, getDocs, query, where} from "firebase/firestore";

import {getDownloadURL, ref, listAll} from "firebase/storage";

import {db, storage} from "../firebase-config";

import {UserTheme} from "./userPageComponents/usertheme";

export const UserPage = () => {
    const navigate = useNavigate();
    const userContent = useParams();

    const [userData, setUserData] = useState([]);
    const [userProfilePhoto, setUserProfilePhoto] = useState("");

    const usersRef = collection(db, "users");
    const imagesListRef = ref(storage, "profile_images/");
    
    useEffect(() => {
        getUserData();
    }, []);

    const getUserImage = async () => {
        console.log(userData[0].profile_image);
        const storageRef = ref(storage, );
        return;

    }
    
    const getUserData = async () => {

        try {
            const userQuery = query(usersRef, where("displayname", "==", userContent.id));
            
            const userQuerySnapshot = await getDocs(userQuery);

            if (userQuerySnapshot.empty){
                navigate("/");
                setTimeout(window.confirm("User does not exist!"), 1500);
                return;
            }

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