import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {storage} from '../../firebase-config';
import {getDownloadURL, ref} from 'firebase/storage'
import { doc, getDoc } from "firebase/firestore";
import {db} from '../../firebase-config';
import {
    Box,
    Button
} from '@mui/material';


export const GetShoutOut = (props) => {
    const {shout_out_uid, text_color} = props;
    const [userImage, setUserImage] = useState("");
    const navigate = useNavigate();
    const [userURL, setUserURL] = useState("");
    const getImage = async () => {
        try {
          const docRef = doc(db, "users", shout_out_uid);

          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const url = await getDownloadURL(ref(storage, `profile_images/${docSnap.data().profile_image}`));
            setUserImage(url);
            setUserURL(docSnap.data().displayname);
            // setUserImage(docSnap.data().profile_iamge)
            // Do something with the data here
          } else {
            console.log("No such user document!");
          }

        } catch (error) {
          console.error(error);
        }
    }
    const handleButtonClick = () => {
        // Use the navigate function to go to the desired page
        navigate(`/u/${userURL}`);
        window.location.reload();
        return;
      };
    useEffect(() => {
        getImage();
      }, []);
    
      return (
        <>
          <Button
            // Attach the handleButtonClick function to the onClick prop
            onClick={handleButtonClick}
            sx={{
              height: 150,
              width: 150,
              borderRadius: '50%',
              backgroundImage: `url(${userImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'hidden',
              border: 6,
              borderColor: `${text_color}`
            }}
          >
          </Button>
        </>
      );
};







