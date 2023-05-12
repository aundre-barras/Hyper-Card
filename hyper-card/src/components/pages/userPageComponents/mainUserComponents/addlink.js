import {
    Typography,
    Box,
    Grid,
    TextField,
    Button
} from '@mui/material';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../../firebase-config';
import { DeleteCardButton } from './deleteCard';



export const AddLink = (props) => {
    const { userCards, setUserCards } = props;
    let title = "";
    let url = "";
    let tempUserCards = [];

    const add = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const ref = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(ref);
            const existingContent = userDoc.data().content || [];
            const updatedcontent = [...tempUserCards];
            console.log(tempUserCards);
            console.log(updatedcontent);
            await updateDoc(ref, { content: updatedcontent });
        } else {
            throw new Error("User is not authenticated");
        }
    }

    return (
        <Grid container>
            <Grid item xs={12} marginLeft={'10%'} marginTop={5}>
                <Typography variant='h4' marginLeft={4}>
                    Title
                </Typography>
                <Box display='flex' sx={{
                    border: 2,
                    borderRadius: '35px',
                    marginRight: 10,
                    width: '80%'
                }}>
                    <TextField variant='standard' onChange={(event) => { title = event.target.value }} InputProps={{ disableUnderline: true }} placeholder={'enter title of url here'} sx={{
                        fontStyle: 'bold',
                        color: `black`,
                        width: '100%',
                        marginLeft: 1
                    }}>

                    </TextField>
                </Box>
            </Grid>
            <Grid item xs={12} marginLeft={'10%'}>
                <Typography variant='h4' marginLeft={4}>
                    Url
                </Typography>
                <Box display='flex' sx={{
                    border: 2,
                    borderRadius: '35px',
                    marginRight: 10,
                    width: '80%'
                }}>
                    <TextField variant='standard' onChange={(event) => { url = event.target.value }} InputProps={{ disableUnderline: true }} placeholder={'://'} sx={{
                        fontStyle: 'bold',
                        color: `black`,
                        width: '100%',
                        marginLeft: 1
                    }}>

                    </TextField>
                </Box>
            </Grid>
            <Grid item xs={6} bottom={0} left={'12px'} position={'absolute'} >
                <Button variant='contained' onClick={async () => {
                    if (url == "" || title == "") {

                        return;
                    }
                    tempUserCards = [{
                        "type": "link",
                        "url": url,
                        "title": title
                    }, ...userCards];
                    setUserCards(tempUserCards);
                    await add();
                }}
                    sx={{
                        width: '100px',
                        height: '44px',
                        background: '#000000',
                        border: '2px solid #000000',
                        borderRadius: '35px',
                        marginBottom: '16px',
                        ":hover": { bgcolor: "#000000" }
                    }} style={{
                        fontFamily: 'Outfit', fontWeight: '700'
                    }}>
                    confirm
                </Button>
            </Grid>
            <Grid item xs={6} bottom={0} right={'12px'} position={'absolute'}>
                <Button variant='contained' sx={{
                    width: '100px',
                    height: '44px',
                    background: '#ffffff',
                    border: '2px solid #000000',
                    borderRadius: '35px',
                    marginBottom: '16px',
                    ":hover": { bgcolor: "#ffffff" }
                }} style={{
                    color: '#000000', fontFamily: 'Outfit', fontWeight: '700'
                }}>
                    cancel
                </Button>
            </Grid>
        </Grid>
    )
}

export const DisplayLink = (props) => {
    const { card, idx, isEdit } = props;

    return (
        <Grid item width={"25vw"} align={"center"} xs={12}>
            <Box width='400px' height='75px' justifyContent='center' style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
                <Grid container width='400px' height='75px'
                    justifyContent='center' alignItems='center'
                    style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
                    <Grid item xs={12}>
                        <a href={card["url"]} target="_blank" rel="noreferrer"
                            style={{
                                fontFamily: 'Outfit',
                                fontWeight: 400,
                                fontSize: '24px',
                                textDecoration: 'none',
                                color: '#000000'
                            }}>
                            {card["title"]}
                        </a>
                    </Grid>
                </Grid>
                {
                    isEdit && 
                    <DeleteCardButton idx={idx}/>
                }
            </Box>
        </Grid>
    )

}