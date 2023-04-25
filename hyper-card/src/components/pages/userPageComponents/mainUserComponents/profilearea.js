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
import { hexToRGBA } from './hextorgba';
import {EditDisplayName} from './editdisplayname';
import { EditProfileImage } from './editprofileimage';

export const ProfileArea = (props) => {
    
    const {userData, isAuth, isEdit, setIsEdit} = props;

    const IsUserNameTaken = async () => {

        return true;
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

                                <EditProfileImage/>
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
                            <EditDisplayName displayname = {user.displayname}/>
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
                                {/* // add if statement once when content is done */}
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

                                    <AddContent/>

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