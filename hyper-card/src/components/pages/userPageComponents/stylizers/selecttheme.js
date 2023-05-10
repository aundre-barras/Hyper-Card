import {Themes} from './themes';
import {Grid, Box, IconButton} from '@mui/material'
import { useEffect, useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../../firebase-config';

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
            <Grid item sx={{ fontStyle: "bold", textAlign: "center", margin: "15px", fontFamily: "Outfit",
              fontWeight: 400,}}>
                <h2>select a background style.</h2>
            </Grid>

            <Grid container item columns={2} spacing={2} direction="row" justifyContent="center" alignItems="center" overflow={"auto"} height={"auto"} width = {"400px"}>
                {themes.map((theme, i) => (
                <Grid item key={theme.background}>
                    <IconButton
                    onClick={() => {
                        setTheme(theme);
                        setIndex(i);
                    }}
                    sx={{
                        height: "100px",
                        width: "100px",
                        backgroundColor: `${theme.backgroundColor}`,
                        backgroundImage: `${theme.backgroundImage}`,
                        backgroundPosition: `${theme.backgroundPosition}`,
                        backgroundSize: `${theme.backgroundSize !== '' ? '1em 1em' : ''}`,
                        backgroundRepeat: `${theme.backgroundRepeat}`,
                        opacity: 5,
                        borderRadius: "50%",
                        marginTop: "10px",
                        marginBottom: "10px",
                        border: "solid",
                        borderWidth: "4px",
                        borderColor: "black",
                    }}
                    >
                    </IconButton>
                </Grid>
                ))}
            </Grid>
            </div>
    );
}