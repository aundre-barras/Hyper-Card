import {
    Typography,
    Button,
    Box,
    Grid,
    Stack,
    TextField,
    IconButton
} from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GlobalStyles from '@mui/material/GlobalStyles';
import ghost from '../../../media/ghost.png';
import { Image } from 'mui-image'
import {ThemeProvider } from '@mui/material/styles';
import {UserTheme} from "../usertheme";
import { AddContent } from './addcontent';

export const ProfileArea = (props) => {
    
    const {userData, isAuth, isEdit, setIsEdit} = props;

    const hexToRGBA = (hex) => {
        try {
            var c;
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                c= hex.substring(1).split('');
                if(c.length== 3){
                    c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c= '0x'+c.join('');
                console.log()
                return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',.3)';
            }
            throw new Error('Bad Hex'); 
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <div>

            {
            
            userData.map((user) => (
                <div key = {user}>
                    <GlobalStyles
                        styles={{
                            body: { 
                                backgroundColor: `${hexToRGBA(user.theme.background_color)}`,
                                background: `${user.theme.background}`,
                                backgroundPosition: `${user.theme.background_position}`,
                                backgroundSize: `${user.theme.background_size}`,
                                backgroundRepeat: `${user.theme.background_repeat}`,
                                backgroundAttatchment: "fixed"
                            }
                        }}
                    />
                    <ThemeProvider theme = {UserTheme}>
                    <Stack justifyContent={'center'}>
                    <Grid container justifyContent="center" alignItems="center" columns={1}>
                        <Grid item>
                        {
                                !isEdit ?
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{
                                height: 150,
                                width: 150,
                                borderRadius: '50%',
                                backgroundColor: '#FFFFFF',
                            }}>
                                <Box sx={{
                                    position: 'relative',
                                    height: '70%',
                                }}>
                                    <Image src={ghost}/>
                                </Box>
                            </Box>
                            :
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
                            }
                        </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="center">
                    {
                            !isEdit ?
                            <Typography variant='h4' sx = {{
                        fontStyle: 'bold',
                        color: `${user.colors.text_color}`
                        }}>
                        /{user.displayname}

                       
                    </Typography>
                    :
                    <Box display="flex" justifyContent="center" sx={{
                        position: "center",
                        marginTop: 5
                    }}>
                        <Box display='flex' sx={{
                            border: 2,
                            borderRadius: '35px',
                            marginRight: 10
                        }}>
                            <Typography variant='h6' sx={{marginLeft: 1}}>
                                /
                            </Typography>
                            <TextField variant='standard' onChange={(event) => {console.log(event.target.value)}} InputProps={{ disableUnderline: true }} defaultValue={user.displayname} sx = {{
                                fontStyle: 'bold',
                                color: `black`,
                                width: 200
                                }}>
                                
                            </TextField>
                        </Box>
                        <Button variant="contained" sx={{

                            }}>
                                Update
                        </Button>    
                    </Box>
                        }
                    </Box>

                    {
                        isAuth &&
                        
                        <div>

                        {
                            !isEdit?
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{
                            height: 200
                        }}>
                            <Typography align='center' variant='h2' sx={{
                                fontStyle: 'bold',
                                width: '60%',
                                color: `${user.colors.text_color}`
                            }}>
                            it looks like your profile is empty :/
                            </Typography>
                        </Box>
                        :
                        <Box display='flex' sx={{
                            justifyContent: 'center'}}>

                        
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{
                                height: 75,
                                border: 2,
                                borderRadius: '35px',
                                marginTop: 5,
                                width: 380
                            }}>
                                <TextField
                                id="user-description"
                                multiline
                                size='small'
                                variant='standard'
                                InputProps={{ disableUnderline: true }}
                                inputProps={{min: 0, style: { textAlign: 'center' }}}
                                rows={2}
                                defaultValue="Enter new Description here"
                                sx={{
                                    width: 370
                                }}
                            />
                            </Box>
                        </Box>
                        }
                        {
                            isEdit &&                      
                            <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                            <Box display='flex' justifyContent='center'>
                            <Box sx={{
                                justifyContent: 'center',
                                height: 56,
                                width: 56,
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                marginTop: 5
                            }}>
                                <IconButton {...bindTrigger(popupState)}>
                                    <AddRoundedIcon sx={{
                                        fontSize: 40
                                    }}/>
                                </IconButton>
                            </Box>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                                }}
                                transformOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                                }}
                            >
                                <Box sx={{
                                    height: '80vh',
                                    width: '80vh'
                                }}>
                                    <AddContent/>
                                </Box>
                            </Popover>
                            </Box>
                        )}
                        </PopupState>
                        }
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{
                            height: 100
                        }}>
                            { !isEdit ?
                                <Button variant="contained" onClick={() => {
                                setIsEdit(true);
                            }} sx={{
                                backgroundColor: `${user.colors.button_color}`,
                                borderRadius: 5,
                                height: 40,
                                width: 175,
                                fontStyle: 'bold',
                                color: `${user.colors.text_color}`
                            }}>
                            lets change that
                            </Button>
                                :
                            <Button variant="contained" onClick={() => {
                                setIsEdit(false);
                                }} sx={{
                                backgroundColor: `${user.colors.button_color}`,
                                borderRadius: 5,
                                height: 40,
                                width: 175,
                                fontStyle: 'bold',
                                color: `${user.colors.text_color}`
                            }}>
                            stop editing
                            </Button>
                            }
                        </Box>
                        </div>
                    }
                    </Stack>
                    </ThemeProvider>

            </div>
            ))}
        </div>
    );
}