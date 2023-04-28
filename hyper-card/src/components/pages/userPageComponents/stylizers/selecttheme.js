import {Themes} from './themes';
import {Grid, Box, IconButton} from '@mui/material'
import { useEffect, useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../../../firebase-config';

export const SelectTheme = (props) => {
    const {main_color, secondary_color} = props;
    const themes = Themes(main_color, secondary_color);
    const [theme, setTheme] = useState(null);
    const [index, setIndex] = useState(0);

    const ChangeTheme = async () => {

        if (theme){

            try {

                auth.onAuthStateChanged(async function(user) {
                    if (user) {
                        const ref = doc(db, "users", user.uid);
                        await updateDoc(ref, {
                            theme: theme,
                            theme_index: index
                        });
                    }
                });

            } catch (error) {
                console.error(error);
            }
        }
        return;
    }

    useEffect(() => {
        ChangeTheme();
    }, [theme])
    return (
        <div>

                <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" >
                    <Grid item sx = {{
                        fontStyle: 'bold',
                    }}>
                        <h2>
                            select a background style
                        </h2>
                    
                    </Grid>
                    {
                        themes.map((theme, i) => (
                        <div key={theme.background}>
                            <IconButton onClick={() => { setTheme(theme); setIndex(i)}} >
 
                            <Grid item >
                            <Box item xs={6} spacing = {2} sx={{
                                height: "200px",
                                width: "200px",
                                background: `${theme.background}`,
                                backgroundColor: `${theme.backgroundColor}`,
                                backgroundPosition: `${theme.backgroundPosition}`,
                                backgroundSize: `${theme.backgroundSize}`,
                                backgroundRepeat: `${theme.backgroundRepeat}`,
                                borderRadius: '50%',
                                marginTop: 1,
                                marginBottom: 1
                            }}>

                            </Box>
                            </Grid>
                            </IconButton>
                        </div>
                        ))
                    }
                </Grid>
        </div>
    );
}