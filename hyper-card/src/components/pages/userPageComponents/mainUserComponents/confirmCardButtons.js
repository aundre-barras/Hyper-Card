import { Grid , Button } from "@mui/material";
import {doc, updateDoc, getDoc} from "firebase/firestore";
import { db, auth} from '../../firebase-config';


export const ConfirmCardButtons = (props) => {
    const { tempCard , userCards , setUserCards } = props;
    let newUserCards = [];


    const addLinkToDB = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const ref = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(ref);
            const existingContent = userDoc.data().content || [];
            const updatedcontent = [...existingContent, ...newUserCards];
            console.log("where am I")
            await updateDoc(ref, { content: updatedcontent });
          } else {
            throw new Error("User is not authenticated");
        }
    }  


    return (
        <Grid container>
            <Grid item xs={6} bottom={0} left={'12px'} position={'absolute'} >
                <Button variant='contained' onClick={async () => {
                newUserCards = [...tempCard];
                setUserCards(newUserCards);
                await addLinkToDB();
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

