import {
    Typography,
    Box,
    Grid,
    TextField,
} from '@mui/material';

export const AddLink = (props) => {

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