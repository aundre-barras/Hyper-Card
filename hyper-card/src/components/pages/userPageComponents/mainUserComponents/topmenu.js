import { React, useState, useEffect } from 'react';
import { Drawer, Divider, IconButton } from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
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

export const TopMenu = (props) => {
    const navigate = useNavigate();
    const { isAuth, userData } = props;
    const [drawerOpen, toggleDrawer] = useState(false);
    const switchDrawer = () => {
        toggleDrawer(!drawerOpen);
    }
    if (isAuth) {
        const profile = "/u/" + userData[0].displayname
        const settings = profile + "/settings";
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
                        <Link to={profile} style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16 }}>profile</Link>
                        <Link to="/qr" style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16  }}>qr code</Link>
                        <Link to="" onClick={() => { navigate(settings); window.location.reload();}} style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16  }}>settings</Link>
                        <Link to="" onClick={() => {auth.signOut();  window.location.reload();}} style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16  }}>log out</Link>
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