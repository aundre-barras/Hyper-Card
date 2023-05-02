import {
    Box,
    Grid,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export const TopMenu = (props) => {
    const {setSubMenu} = props;
    
    return (
        <Grid container sx={{
            height: 100,
            justifyContent: 'center'
        }}>
            <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-start" alignItems="flex-start" sx={{
                    height: '100%',
                }}>
                    
                    <Box sx={{
                        position: 'relative',
                        height: 75,
                        width: 75,
                        left: 16,
                        top: 13
                    }}>
                    </Box>

                </Box>

            </Grid>
            <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end" alignItems="flex-start" sx={{
                    height: '100%',
                }}>
                    <Box sx={{
                        position: 'relative',
                        height: 75,
                        width: 75,
                        top: 13,
                        right: 16
                    }}>
                        <MenuRoundedIcon onClick={setSubMenu} sx={{
                            fontSize: 75
                        }}/>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}