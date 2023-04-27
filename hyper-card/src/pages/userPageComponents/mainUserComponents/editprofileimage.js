import {
    Typography,
    Button,
    Box
} from '@mui/material';
import ghost from '../../../media/ghost.png';
import { Image } from 'mui-image'

export const EditProfileImage = () => {
    // need props here to get current user image

    return (

        <Box display="flex" justifyContent="center" alignItems="center" sx={{
            height: 150,
            width: 150,
            borderRadius: '50%',
            backgroundColor: '#D8D8D8',
        }}>
            <Box sx={{
                position: 'relative',
                height: '70%',
            }}>
                <Image src={ghost} sx={{
                    filter: 'blur(3.5px)'
                }}/>
                <Typography variant="caption" sx={{
                    position: "absolute",
                    color: 'white',
                    textalign: 'center',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 'fit-content',
                    width: 90,
                    margin: 'auto',
                }}>
                    Tap to change
                </Typography>
            </Box>
        </Box>
    );
}