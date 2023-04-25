import {
    Typography,
    Button,
    Box,
    Grid,
} from '@mui/material';
import { AddLink } from './addlink';

export const AddContent = (props) => {
    return (
        <Grid container justifyContent="center" alignItems='center'>
            <Grid item xs={12} sx={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography align='center'>
                    Link Type
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Box display='flex' justifyContent='center' 
                sx={{
                    border: 2,
                    borderColor: 'black',
                    width: '80%',
                    marginLeft: 2
                }}>
                    add link
                </Box>
            </Grid>
            <Grid item xs={4}>
            <Box display='flex' justifyContent='center' 
                sx={{
                    border: 2,
                    borderColor: 'black',
                    width: '80%',
                    marginLeft: 2
                }}>
                    Spotify
                </Box>
            </Grid>
            <Grid item xs={4}>
            <Box display='flex' justifyContent='center' 
                sx={{
                    border: 2,
                    borderColor: 'black',
                    width: '80%',
                    marginLeft: 2
                }}>
                    SoundCloud
                </Box>
            </Grid>
            <Grid item xs={12}>
                <AddLink/>
            </Grid>
            <Grid item xs={12}>
                <Box position={'absolute'} bottom={0}>
                    <Button variant="contained" sx={{
                                        borderRadius: 5,
                                        height: 40,
                                        width: 100,
                                        fontStyle: 'bold',
                                        marginLeft: 2,
                                        marginBottom: 2
                                    }}>
                                    confirm
                    </Button>
                    <Button variant="contained" sx={{
                                        borderRadius: 5,
                                        height: 40,
                                        width: 100,
                                        fontStyle: 'bold',
                                        marginLeft: 40,
                                        marginBottom: 2
                                    }}>
                                    cancel
                    </Button>
                </Box>
            </Grid>
        </Grid>        
    )
}