import {
    Typography,
    Button,
    Box,
    Grid,
    TextField,
} from '@mui/material';
import {React, useState} from 'react';

export const AddShoutOut = (props) => {

    const [username, setUserName] = useState("");

    return (
        <Grid container 
            direction='row'
            justifyContent='center'
            alignItems='center'
            xs={12} spacing={1}>
        
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
                    onChange={(e) => setUserName(e.target.value)}
                    >

                </TextField>
            </Grid>
            
            

        </Grid>
    );
}