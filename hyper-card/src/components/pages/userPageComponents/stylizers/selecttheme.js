import {Themes} from './themes';
import {Grid, Stack, Box} from '@mui/material'

export const SelectTheme = () => {

    // change these to be the users current chosen color
    const themes = Themes('white', 'black');

    return (
        <div>
            <Stack justifyContent={'center'}>
                <Grid container justifyContent="center" alignItems="center" columns={2} sx = {{"width": "600px"}}>
                    {
                        themes.map((theme) => (
                        <div key={theme}>
                            <Box item display="flex" justifyContent="center" alignItems="center" sx={{
                                height: 200,
                                width: 200,
                                background: `${theme.background}`,
                                backgroundColor: `${theme.backgroundColor}`,
                                backgroundPosition: `${theme.backgroundPosition}`,
                                backgroundSize: `${theme.backgroundSize}`,
                                backgroundRepeat: `${theme.backgroundRepeat}`,
                                opacity : "0.5",
                                borderColor: "black",
                                borderStyle: "solid"
                                
                            }}>

                            </Box>
                        </div>
                        ))
                    }
                </Grid>
            </Stack>
        </div>
    );
}