import {
    Typography,
    Button,
    Grid,
    TextField,
} from '@mui/material';
import {React, useEffect, useState} from 'react';
import { query, where, limit, getDocs, collection, doc, updateDoc, getDoc} from "firebase/firestore";
import { db, storage, auth} from '../../firebase-config';
import {ref, getDownloadURL} from 'firebase/storage'


export const AddShoutOut = () => {

    const [username, setUserName] = useState("");
    const [listOfUsers, setListOfUsers] = useState([]);
    const [listOfImages, setListOfImages]=  useState([]);

    const getImage = async (profile_image) => {
        try {
            const url = await getDownloadURL(ref(storage, `profile_images/${profile_image}`));
            return url;
        } catch (error) {
          console.error(error);
        }
    }

    const addShoutOutOnUserName = async (username) => {

        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("displayname", "==", username));
        const querySnapshot = await getDocs(userQuery);
        const currentUser = auth.currentUser;

        if (currentUser) {
          const ref = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(ref);
          const existingShoutouts = userDoc.data().shoutouts || [];
          if (existingShoutouts.length < 6){
            const newShoutouts = querySnapshot.docs.map((doc) => doc.id);
            const updatedShoutouts = [...existingShoutouts, ...newShoutouts];
            await updateDoc(ref, { shoutouts: updatedShoutouts });
          }
        } else {
          throw new Error("User is not authenticated");
        }
      }

      const searchUsers = async () => {
        if (username) {
          try {
            auth.onAuthStateChanged(async function (user) {
              if (user) {
                const ref = doc(db, "users", user.uid);
      
                const usersRef = collection(db, "users");
                // Construct a Firestore query that matches documents where displayName is similar to the search query
                const q = query(
                  usersRef,
                  where("displayname", ">=", username),
                  where("displayname", "<=", username + "\uf8ff"),
                );
      
                // Get the shoutouts array of the current user
                const userDoc = await getDoc(ref);
                const shoutouts = userDoc.data().shoutouts || [];
      
                // Filter out the usernames that are present in the shoutouts array
                const filteredResults = [];
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                  if (!shoutouts.includes(doc.id)) {
                    filteredResults.push(doc.data());
                  }
                });
                setListOfUsers(filteredResults);
      
                const images = await Promise.all(
                  filteredResults.map(async (item) => await getImage(item.profile_image))
                );
                setListOfImages(images);
              }
            });
      
            // Do something with the results here
          } catch (error) {
            console.error("Error searching for users:", error);
          }
        }
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
                    id="display name"
                    label="display name"
                    name="display name"
                    size='small'
                    onChange={(e) => {setUserName(e.target.value)}}
                    >

                </TextField>
            </Grid>

            {
                listOfUsers.map((user, i) => {
                    return (
                        <div key={user.displayname}>
                            <h6 style={{ width: "170px", height: "20px", textAlign: "center" }}>
                                {user.displayname}
                            </h6>
                            {/* {console.log(`url(${imageUrl})`)} */}
                            <Button
                                onClick={() => {addShoutOutOnUserName(user.displayname)}}
                                sx={{
                                    height: 150,
                                    width: 150,
                                    borderRadius: '50%',
                                    backgroundImage: `url(${listOfImages[i]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    overflow: 'hidden',
                                    border: 3,
                                    borderColor: 'black'
                                }}
                            >
                            </Button>
                        </div>
                    );
                })
            }

            
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
