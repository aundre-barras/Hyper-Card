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
            <Grid item sx={{ fontStyle: "bold", textAlign: "center", margin: "15px", fontFamily: "Outfit",
            fontWeight: 400,}}>
                <h2>select a color palette.</h2>
            </Grid>
                    
            <Grid container item columns={2} spacing={2} direction="row" justifyContent="center" alignItems="center" overflow={"auto"} height={"auto"} width = {"400px"}>
            {
                        colors_list.map((color) => (

                        <Grid item key={color.secondary_color}>
                            <IconButton onClick={() => { setColor(color); }}
                            sx={{
                                height: "100px",
                                width: "100px",
                                borderRadius: '50%',
                                marginTop: 1,
                                marginBottom: 1,
                                background:`linear-gradient( ${color.main_color} 20%, ${color.secondary_color} 0 40%, ${color.text_color} 0 60%, ${color.secondary_text_color} 0 80%, ${color.button_color} 0)`,
                                marginTop: "10px",
                                marginBottom: "10px",
                                border: "solid",
                                borderWidth: "4px",
                                borderColor: "black",
                            }}>
                            </IconButton>
                        </Grid>

                        ))
                    }
            </Grid>
        </div>
    );


}