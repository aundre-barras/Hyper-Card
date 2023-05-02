import {
    Typography,
    Button,
    Box,
    TextField,
} from '@mui/material';

export const EditDescription = () => {
    return (
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
                    placeholder="Enter description..."
                    // need to add default being pull from user database
                    // defaultValue={}
                    sx={{
                        width: 370
                    }}
                />
                
            </Box>
            
        </Box>
    );
}