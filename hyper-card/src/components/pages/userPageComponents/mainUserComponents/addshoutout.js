import {
    Typography,
    Button,
    Box,
    Grid,
    TextField,
} from '@mui/material';
import {React, useEffect, useState} from 'react';
import { query, where, orderBy, limit, getDocs, collection } from "firebase/firestore";
import { db } from '../../firebase-config';



export const AddShoutOut = () => {

    const [username, setUserName] = useState("");
    console.log("here");
    const searchUsers = async () => {
        
        try {
          const usersRef = collection(db, "users");
      
          // Construct a Firestore query that matches documents where displayName is similar to the search query
          const q = query(
            usersRef,
            where("displayName", ">=", username),
            where("displayName", "<=", username + "\uf8ff"), // \uf8ff is a high Unicode code point used as the last character in a range to match all strings that start with the query string
            orderBy("displayName"),
            limit(10)
          );
      
          // Execute the query and retrieve the results
          const querySnapshot = await getDocs(q);
          const results = querySnapshot.docs.map((doc) => doc.data());
      
          console.log("Search results:", results);
          // Do something with the results here
        } catch (error) {
          console.error("Error searching for users:", error);
        }
    }
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
        searchUsers(); // Call the searchUsers function when the username value changes
    };

    useEffect(() => {
        searchUsers();
    }, [username])

    return (
        <Grid container 
            direction='row'
            justifyContent='center'
            alignItems='center'
            xs={12}>
        
            <Grid item xs={12} marginTop={5}>
                <Typography align='center'>
                    add shoutout
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TextField 
                    InputProps={{sx:{
                        width:'308px',
                        height:'40px',
                        borderRadius:'35px'
                    }}} 
                    id="username"
                    label="Username"
                    name="username"
                    size='small'
                    onChange={handleUserNameChange}
                    >

                </TextField>
            </Grid>
            
            <Grid item xs={6} bottom={0} left={'12px'} position={'absolute'}>
                    <Button variant='contained' sx={{
                            width:'100px',
                            height:'44px',
                            background:'#000000',
                            border:'2px solid #000000',
                            borderRadius:'35px',
                            marginBottom: '16px',
                            ":hover": {bgcolor: "#000000"}
                        }} style={{
                            fontFamily:'Outfit', fontWeight:'700'
                        }}>
                        confirm
                    </Button>
                </Grid>
                <Grid item xs={6} bottom={0} right={'12px'} position={'absolute'}>
                    <Button variant='contained' sx={{
                            width:'100px',
                            height:'44px',
                            background:'#ffffff',
                            border:'2px solid #000000',
                            borderRadius:'35px',
                            marginBottom: '16px',
                            ":hover": {bgcolor: "#ffffff"}
                        }} style={{
                            color:'#000000', fontFamily:'Outfit', fontWeight:'700'
                        }}>
                        cancel
                    </Button>
                </Grid>

        </Grid>
    );
}
