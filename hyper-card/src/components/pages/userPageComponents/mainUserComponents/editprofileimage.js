import {
    Typography,
    Button,
    Box,
    CircularProgress,
  } from '@mui/material';
  import { storage, auth, db } from '../../firebase-config';
  import {ref,getDownloadURL, uploadBytes} from 'firebase/storage'
  import { useEffect, useState } from 'react';
  import { v4 } from "uuid";
  import { doc, updateDoc} from "firebase/firestore";
  
  export const EditProfileImage = (props) => {
    const {profileImage, textColor} = props;
    const [imageName, setImageName] = useState(profileImage);
    const [profileImageURL, setProfileImageURL] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const getImage = async () => {
      try {
        const url = await getDownloadURL(ref(storage, `profile_images/${imageName}`));
        setProfileImageURL(url);
      } catch (error) {
        console.error(error);
      }
    }
  
    const handleFileChange = (event, checkValue) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            checkValue(reader.result);
          };
          setProfileImageURL(reader.result);
          setImageUpload(file);
        }
      };
      
      const uploadFile = async () => {
        if (!imageUpload) {
          return;
        }
      
        setIsLoading(true);
      
        try {
          const hold_temp = imageUpload.name + v4();
          console.log(hold_temp);
      
          auth.onAuthStateChanged(async function (user) {
            if (user) {
              const ref = doc(db, 'users', user.uid);
              await updateDoc(ref, {
                profile_image: hold_temp,
              });
            }
          });
      
          const imageRef = ref(storage, `profile_images/${hold_temp}`);
          const snapshot = await uploadBytes(imageRef, imageUpload);
          const url = await getDownloadURL(snapshot.ref);
      
          setProfileImageURL(url);
          setImageName(hold_temp);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      
      useEffect(() => {
        uploadFile();
        getImage();
      }, [imageUpload]);
      
      return (
        <div>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              variant="standard"
              component="label"
              sx={{
                borderRadius: '50%',
                height: 150,
                width: 150,
                backgroundImage: `url(${profileImageURL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
                filter: 'blur(3px)',
                border: 4,
                borderColor: `${textColor}`
              }}
            >
            <input hidden accept="image/*" type="file" onChange={(e) => handleFileChange(e, props.checkValue)} />
            </Button>
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: 170,
                margin: 'auto',
                textAlign: 'center',
                color: `${textColor}`,
              }}
            >
              tap to change
            </Typography>
            {isLoading ? (
            <CircularProgress size={50} sx = {{
            position: 'absolute',
            top: 170,
            margin: 'auto',}}/>
          ) : null}
          </Box>
        </div>
      );
}