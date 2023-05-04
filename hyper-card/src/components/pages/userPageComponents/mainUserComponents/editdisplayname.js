import {
    Typography,
    Button,
    Box,
    TextField,

} from '@mui/material';

export const EditDisplayName = (props) => {
    const {displayname} = props;

    return (

        <Box display="flex" justifyContent="center" alignItems= "center" sx={{
        }}>

            <Box>
                <TextField 
                    size='small'
                    variant='standard'
                    margin="normal"
                    fullWidth
                    placeholder=' newdisplayname...'
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                        style: {
                            width: 280,
                            border: 2,
                            borderStyle: 'solid',
                            borderColor: 'black',
                            borderRadius: '15px',
                            marginTop: 5,
                            min: 0,
                            marginRight: 20
                         },
                    }}>
                    
                </TextField>
            </Box>
            <Button variant="contained" sx={{
                width: "75px",
                height: "50px",
                borderRadius: '35px',
                }}>
                    Update
            </Button>

        </Box>
    );
}