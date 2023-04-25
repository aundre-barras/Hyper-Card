import {
    Typography,
    Button,
    Box,
    TextField,

} from '@mui/material';

export const EditDisplayName = (props) => {
    const {displayname} = props;

    return (

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
                <TextField variant='standard' onChange={(event) => {console.log(event.target.value)}} InputProps={{ disableUnderline: true }} defaultValue={displayname} sx = {{
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
    );
}