import { Colors } from "./colors"
import {Grid, Stack, Box} from '@mui/material'

export const SelectColors = () => {
    const colors_list = Colors();
    
    return (

        <div>
            <Grid container justifyContent="center" alignItems="center" columns={2} sx = {{"width": "600px"}}>
            {
                        colors_list.map((color) => (
                        <div key={color}>
                            <Box item display="flex" justifyContent="center" alignItems="center" sx={{
                                height: 200,
                                width: 200,
                                borderColor: "black",
                                borderStyle: "solid",
                                background:`linear-gradient( ${color.main_color} 20%, ${color.secondary_color} 0 40%, ${color.text_color} 0 60%, ${color.secondary_text_color} 0 80%, ${color.button_color} 0)`
                            }}>

                            </Box>
                        </div>
                        ))
                    }


            </Grid>
        </div>
    );


}