import { IconButton } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {doc, updateDoc, getDoc} from "firebase/firestore";
import { db, auth} from '../../firebase-config';

export const DeleteCardButton = (props) => {
    const { idx } = props;

    const removeLinkFromDB = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const ref = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(ref);
            const existingContent = userDoc.data().content || [];
            existingContent.splice(idx, 1) ;
            await updateDoc(ref, { content: existingContent });
          } else {
            throw new Error("User is not authenticated");

        }
    }  

    return (
        <IconButton position={"absolute"} onClick={async () => { removeLinkFromDB() }} sx={{
            bottom: 22,
            left: 188,
            height: 10,
            width: 10,
            backgroundColor: "white"
          }}>
            <ClearRoundedIcon/>
          </IconButton>
    )
}