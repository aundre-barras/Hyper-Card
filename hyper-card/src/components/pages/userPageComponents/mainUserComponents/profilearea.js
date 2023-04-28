import {
    Typography,
    Button,
    Box,
    Grid,
    Stack,
} from '@mui/material';

import GlobalStyles from '@mui/material/GlobalStyles';
import ghost from '../../../media/ghost.png';
import { Image } from 'mui-image'
import {ThemeProvider } from '@mui/material/styles';
import {UserTheme} from "../usertheme";
import { AddContent } from './addcontent';

import {EditDisplayName} from './editdisplayname';
import { EditProfileImage } from './editprofileimage';
import { Link } from 'react-router-dom';
import { EditDescription } from './editdescription';
import { ChangeTheme } from './changetheme';
import { ChangeColor } from './changecolor';
export const ProfileArea = (props) => {

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
                return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',.1)';
            }
            throw new Error('Bad Hex'); 
        } catch (error) {
            console.error(error);
        }
    
    }

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
                                backgroundColor: `${hexToRGBA(user.theme.backgroundColor)}`,
                                background: `${user.theme.background}`,
                                backgroundPosition: `${user.theme.backgroundPosition}`,
                                backgroundSize: `${user.theme.backgroundSize}`,
                                backgroundRepeat: `${user.theme.backgroundRepeat}`,
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

                            
                                <EditDescription/>
                                
                            </Box>
                            }
                            {isEdit && 
                            
                            <Grid container justifyContent="center" alignItems="center" columns={1} sx = {{padding: "5px", width: "100%"}}>
                            <ChangeTheme 
                                button_color = {user.colors.button_color} 
                                secondary_text_color = {user.colors.secondary_text_color}
                                main_color = {user.colors.main_color}
                                secondary_color = {user.colors.secondary_color}
                            />

                            
                            <ChangeColor
                                button_color = {user.colors.button_color} 
                                secondary_text_color = {user.colors.secondary_text_color}
                            />
                            </Grid>
                            }
                            {
                                isEdit &&

                                    <AddContent/>

                            }

                            <Box display="flex" justifyContent="center" alignItems="center" sx={{
                                height: 100
                            }}>

                                { !isEdit ?
                                    <Button variant="contained" onClick={() => {setIsEdit(true);}} 
                                    sx={{
                                    backgroundColor: `${user.colors.button_color}`,
                                    borderRadius: 5,
                                    height: 40,
                                    width: 175,
                                    fontStyle: 'bold',
                                    color: `${user.colors.secondary_text_color}`
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
                                    color: `${user.colors.secondary_text_color}`
                                }}>
                                stop editing
                                </Button>

                                }

                            </Box>
                            
                            <Typography display="flex" justifyContent="center" alignItems="center" variant='h1' color={user.colors.secondary_text_color} 
                            component={Link} to="/" 
                            style={{ 
                                textDecoration:"none",
                                fontSize: "40px",

                            }}>
                            hypr
                            <span style={{color:`${user.colors.text_color}`}}>crd</span>
                            </Typography>
                        </div>
                    }

                    </Stack>
                    </ThemeProvider>

            </div>
            ))}
        </div>
    );
}