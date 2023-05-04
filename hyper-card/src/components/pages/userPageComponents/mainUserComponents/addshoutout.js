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