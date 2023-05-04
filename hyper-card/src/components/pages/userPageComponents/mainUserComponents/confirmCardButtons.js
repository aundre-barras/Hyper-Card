import { Box , Grid , Button } from "@mui/material";

export const ConfirmCardButtons = (props) => {
    const { tempCard , userCards , setUserCards } = props;
    let newUserCards = [];
    return (
        <Grid container>
            <Grid item xs={6} bottom={0} left={'12px'} position={'absolute'} >
                <Button variant='contained' onClick={() => {
                newUserCards = [...tempCard, ...userCards];
                console.log(tempCard);
                setUserCards(newUserCards);
                }}
                    sx={{
                        width:'100px',
                        height:'44px',
                        background:'#000000',
                        border:'2px solid #000000',
                        borderRadius:'35px',
                        marginBottom: '16px',
                        ":hover": {bgcolor: "#000000"}
                    }} style={{
                        fontFamily:'Outfit', fontWeight:'700'
                    }}>
                    confirm
                </Button>
            </Grid>
            <Grid item xs={6} bottom={0} right={'12px'} position={'absolute'}>
                <Button variant='contained' sx={{
                        width:'100px',
                        height:'44px',
                        background:'#ffffff',
                        border:'2px solid #000000',
                        borderRadius:'35px',
                        marginBottom: '16px',
                        ":hover": {bgcolor: "#ffffff"}
                    }} style={{
                        color:'#000000', fontFamily:'Outfit', fontWeight:'700'
                    }}>
                    cancel
                </Button>
            </Grid>
        </Grid>
        
    )
}