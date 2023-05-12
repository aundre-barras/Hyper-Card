import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, GlobalStyles, Typography, IconButton  } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { doc,getDoc } from "firebase/firestore";
import { db, auth } from './firebase-config';
import { TopMenu } from "./userPageComponents/mainUserComponents/topmenu";
import { Link, useNavigate} from 'react-router-dom';

export const QRCode = (props) => {
  const navigate = useNavigate();
  const [qrcode, setQRCode] = useState("");
  const [currUser, setCurrUser] = useState(null);
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const url = window.location.origin + `/u/${id}/qrcode`;
  const QRCode = require('qrcode');


  const getQRCode = async () => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      QRCode.toDataURL(url, function (err, url) {
        setQRCode(url);
      });
    } else {
      console.error("User is not authenticated");
    }
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrUser(user.uid);
        const ref = doc(db, "users", user.uid);
        const userDoc = await getDoc(ref);
        setUserData(userDoc.data() || {});
        await getQRCode();
      } else {
        setCurrUser(null);
        navigate("/login");
        window.location.reload();
      }
    });
    return () => unsubscribe();
  }, [userData]);


  return (
  <>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <IconButton
        sx={{ position: 'absolute', top: '16px', left: '16px', bgcolor: `${userData.colors?.button_color || 'white'}`, borderRadius: '50%', width: '10vh', height: '10vh' }}
        onClick={() => {navigate(`/u/${id}`); window.location.reload(); }}
      >
        <ArrowBack color = {`${userData.colors?.button_color || 'black'}`} />
      </IconButton>
      <Box>
        <img style={{ width: "50vh", borderRadius: "30%" }} src={qrcode} alt="QR Code" />
      </Box>
    </Box>
    <div>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: `${userData.theme?.backgroundColor || "#fff"}`,
            backgroundPosition: `${userData.theme?.backgroundPosition || "center"}`,
            backgroundSize: `${userData.theme?.backgroundSize || "cover"}`,
            backgroundRepeat: `${userData.theme?.backgroundRepeat || "no-repeat"}`,
            overflow: "hidden",
            scrollbarWidth: "none",
            overflowX: "hidden",
          }
        }}
      />
    </div>
    <TopMenu />
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>

  <Typography display="flex" justifyContent="center" alignItems="center" variant='h1' color={`${userData.colors?.secondary_text_color || 'black'}`}
                component={Link} to="/"
                style={{
                    textDecoration:"none",
                    fontSize: "40px",
                    fontFamily: "Outfit",
                    position: "absolute",
                    marginTop: "30px",
                    top: "5vh",
                    textAlign: "center"
                }}>
                hypr
                <span style={{color:`${userData.colors?.text_color || 'black'}`}}>crd</span>
                
    </Typography>
    <Typography display="flex" justifyContent="center" alignItems="center" variant='h1' color={`${userData.colors?.button_color || 'black'}`}
                component={Link} to="/"
                style={{
                    textDecoration:"none",
                    fontSize: "40px",
                    fontFamily: "Outfit",
                    position: "absolute",
                    marginTop: "30px",
                    top: "10vh",
                    textAlign: "center"
                }}>
                /  {userData?.displayname || ""}
    </Typography>
    </Box>

  </>
  );
}
