import React, { useState, useEffect } from 'react';
import { Drawer, IconButton } from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Link, useNavigate } from 'react-router-dom';
import {doc, getDoc} from "firebase/firestore";
import {auth, db, googleProv} from "../../firebase-config";

// styles for drawer
const styles = {
    sideNav: {
        marginTop: '-60px',
        zIndex: 3,
        marginLeft: '0px',
        position: 'fixed',
    },
    link: {
        color: 'black',
        textDecoration: 'none',
    }
}

export const TopMenu = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState([]);
    const [drawerOpen, toggleDrawer] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                setIsAuth(true);
                const usersRef = doc(db, "users", user.uid);
                const snap = await getDoc(usersRef);
                setUserData(snap.data());
            } else {
                setIsAuth(false);
                setUserData([]);
            }
        });

        return unsubscribe;
    }, []);

    const switchDrawer = () => {
        toggleDrawer(!drawerOpen);
    }

    if (isAuth) {
        const profile = "/u/" + userData?.displayname;
        const settings = profile + "/settings";
        const qr = profile + "/qrcode";

        return (
            <div>
                <div style={{ top: 0, right: 0, position: "fixed", zIndex: 3 }}>
                    <IconButton onClick={toggleDrawer}>
                        {!drawerOpen ? <ReorderIcon sx={{ fontSize: "64px" }} style={{ color: 'black' }} /> : null}
                    </IconButton>
                </div>
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={switchDrawer}
                    anchor='right'
                    sx={{ zIndex: 4 }}
                >
                    <div style={{ 'fontSize': 30, 'display': 'flex', 'flexDirection': 'column', 'padding': 24 }}>
                        <Link to="" onClick={() => { navigate(profile); window.location.reload();}} style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16 }}>profile</Link>
                        <Link to="" onClick={() => { navigate(qr); window.location.reload();}} style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16  }}>qr code</Link>
                        <Link to="" onClick={() => { navigate(settings); window.location.reload();}} style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16  }}>settings</Link>
                        <Link to="" onClick={() => {auth.signOut();  navigate('/login'); window.location.reload();}} style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16  }}>log out</Link>
                    </div>
                </Drawer>
            </div>
        );
    }
    else {
        return (
            <div>
                <div style={{ top: 0, right: 0, position: "fixed", zIndex: 3 }}>
                    <IconButton onClick={toggleDrawer}>
                        {!drawerOpen ? <ReorderIcon sx={{ fontSize: "64px" }} style={{ color: 'black' }} /> : null}
                    </IconButton>
                </div>
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={switchDrawer}
                    anchor='right'
                    sx={{ zIndex: 4 }}
                >
                    <div style={{ 'fontSize': 30, 'display': 'flex', 'flexDirection': 'column', 'padding': 24 }}>
                        <Link to="" onClick={() => { navigate("/signup"); window.location.reload();}} style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16 }}>create account</Link>
                        <Link to="" onClick={() => { navigate("/login"); window.location.reload();}}  style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit' }}>login</Link>
                    </div>
                </Drawer>
            </div>
        );
    }
}
