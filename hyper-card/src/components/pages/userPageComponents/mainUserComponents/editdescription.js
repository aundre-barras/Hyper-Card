import {
    Typography,
    Button,
    Box,
    TextField,
    FormGroup,
    FormControl,
} from '@mui/material';
import { useState } from 'react';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase-config';

export const EditDescription = () => {
    const CHARACTER_LIMIT = 300;
    const [values, setValues] = useState({
      description: ""
    });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const changeDescription = async() => {
        try {
            auth.onAuthStateChanged(async function(user){
                if (user) {
                    const ref = doc(db, "users", user.uid);
                    await updateDoc(ref, {
                        description: values.description
                    });
                } 
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box display='flex' alignItems="center"justifyContent="center" >

        
            <Box>
            <FormGroup>
            <FormControl>
                <TextField
                    multiline
                    placeholder='enter description...'
                    size='small'
                    variant='standard'
                    margin="normal"
                    value={values.name}
                    helperText={`${values.description.length}/${CHARACTER_LIMIT}`}
                    onChange={handleChange("description")}
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                        maxlength: CHARACTER_LIMIT,
                        style: {
                            textAlign: 'center',
                            height: 150,
                            width: 280,
                            border: 2,
                            borderStyle: 'solid',
                            borderColor: 'black',
                            borderRadius: '15px',
                            marginRight: 20,
                            marginTop: 5,
                            min: 0,
                         },
                    }}
                    // need to add default being pull from user database
                    // defaultValue={}

                />
                </FormControl>
            </FormGroup>
            </Box>
            <Button variant="contained" 
            onClick={() => { changeDescription(); }}
            sx={{
                width: "75px",
                height: "50px",
                borderRadius: '35px',
            }}>
                Update
            </Button>
            
        </Box>
    );
}