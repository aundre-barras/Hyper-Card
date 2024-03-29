import {
    Button,
    Box,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDocs, where, collection, query } from "firebase/firestore";
import { auth, db } from '../../firebase-config';

export const EditDisplayName = (props) => {
    const {displayname, button_color, secondary_text_color} = props;
    const navigate = useNavigate();

    const MAX_LENGTH = 20;
    const MIN_LENGTH = 6;

    const [invalid, isInvalid] = useState(false);
    const [newdisplayname, setNewDisplayName] = useState(displayname);

    const isAlphaNumeric = () => {

        var code, i, len;
        for (i = 0, len = newdisplayname.length; i < len; i++) {
          code = newdisplayname.charCodeAt(i);
          if (!(code > 47 && code < 58) && // numeric (0-9)
              !(code > 64 && code < 91) && // upper alpha (A-Z)
              !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
          }
        }
        return true;
    }

    const isDisplayNameInUse = async () => {

      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("displayname", "==", newdisplayname));
          
      const userQuerySnapshot = await getDocs(userQuery);
      if (userQuerySnapshot.empty) return true;
      return false;
  }

    const changeDisplay = async () => {
        return new Promise(async (resolve, reject) => {
          try {
            if (newdisplayname.length >= MIN_LENGTH && newdisplayname.length <= MAX_LENGTH) {
              if (!isAlphaNumeric() || ! await isDisplayNameInUse()) {
                isInvalid(true);
              } else {
                navigate ("/u/" + newdisplayname);
                auth.onAuthStateChanged(async function(user) {
                  if (user){
                    const ref = doc(db, "users", user.uid);
                    await updateDoc(ref, {
                      displayname: newdisplayname
                    });
                    
                  };
                  
                  resolve();
                })
              }
            } else {
              isInvalid(true);
            }
          } catch (error) {
            reject(error); // reject the promise if there is an error
          }
        });
      };
    useEffect(() => {
      
    }, [])
    return (

        <Box display="flex" justifyContent="center" alignItems= "center" sx={{
        }}>

            <Box>
                <TextField 
                    size='small'
                    variant='standard'
                    margin="normal"
                    defaultValue={newdisplayname}
                    onChange={(e) =>setNewDisplayName(e.target.value)}
                    fullWidth
                    error= {invalid}
                    placeholder=' newdisplayname...'
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                        style: {
                            width: 280,
                            border: 2,
                            borderStyle: 'solid',
                            borderColor: `${secondary_text_color}`,
                            backgroundColor: `${button_color}`,
                            borderRadius: '15px',
                            marginRight: 20,
                            marginTop: 5,
                            min: 0,
                            color: `${secondary_text_color}`
                         },
                    }}>
                    
                </TextField>
            </Box>
            <Button
                onClick={changeDisplay}
                variant="contained" 
                sx={{
                width: "75px",
                height: "50px",
                borderRadius: '35px',
                border: 2,
                borderStyle: 'solid',
                borderColor: `${secondary_text_color}`,
                backgroundColor: `${button_color}`,
                color: `${secondary_text_color}`,
                fontFamily: "Outfit",
                fontSize: "15px",
                lineHeight: "25px",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                textTransform:'lowercase'
                }}>
                    Update
            </Button>

        </Box>
    );
}