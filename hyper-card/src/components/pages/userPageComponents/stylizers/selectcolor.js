import { Colors } from "./colors";
import {Themes} from "./themes";

import {Grid, Box, IconButton} from '@mui/material';
import { useEffect, useState } from 'react';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase-config';

export const SelectColors = () => {
    const colors_list = Colors();
    const [color, setColor] = useState(null);

    const ChangeColor = async () => {
        
        if (color){
            try {

                auth.onAuthStateChanged(async function(user) {
                    if (user) {
                        const ref = doc(db, "users", user.uid);
                        await updateDoc(ref, {
                            colors: color
                        });
                        const t = Themes(color.main_color, color.secondary_color);
                        const docSnap = await getDoc(ref);
                        if (docSnap.exists()) {
                            await updateDoc(ref, {
                                theme: t[docSnap.data().theme_index]
                            });
                        } 
                    }   
                });

            } catch (error) {
                console.error(error);
            }
        }
        return;
    }
    useEffect(() => {
        ChangeColor();
    }, [color])
    return (

        <div>
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" >
                <Grid item sx = {{
                    fontStyle: 'bold',
                }}>
                    <h2>
                        select a color palatte
                    </h2>
                    
            </Grid>
            {
                        colors_list.map((color) => (
                        <div key={color.secondary_color}>
                            <IconButton onClick={() => { setColor(color); }} >
                            <Grid item >
                            <Box item xs={6} spacing = {2}
                            sx={{
                                height: "200px",
                                width: "200px",
                                borderRadius: '50%',
                                marginTop: 1,
                                marginBottom: 1,
                                background:`linear-gradient( ${color.main_color} 20%, ${color.secondary_color} 0 40%, ${color.text_color} 0 60%, ${color.secondary_text_color} 0 80%, ${color.button_color} 0)`
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