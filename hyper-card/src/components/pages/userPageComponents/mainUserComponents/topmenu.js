import { React, useState, useEffect } from 'react';
import { Drawer, Divider, IconButton } from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Link } from 'react-router-dom';

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
    const { isAuth, userData } = props;
    const [drawerOpen, toggleDrawer] = useState(false);
    const switchDrawer = () => {
        toggleDrawer(!drawerOpen);
    }
    if (isAuth) {
        const profile = "/u/" + userData[0].displayname
        return (
            <div>
                <div style={{ right: '0', position: "absolute"}}>
                    <IconButton onClick={toggleDrawer}>
                        {!drawerOpen ? <ReorderIcon sx={{ fontSize: "64px" }}style={{ color: 'black' }} /> : null}
                    </IconButton>
                </div>
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={switchDrawer}
                    anchor='right'
                >
                    <div style={{ 'fontSize': 30, 'display': 'flex', 'flexDirection': 'column', 'padding': 24 }}>
                        <Link to={profile} style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16 }}>profile</Link>
                        <Link to="/qr" style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16  }}>qr code</Link>
                        <Link to="/settings" style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16  }}>settings</Link>
                        <Link to="/logout" style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16  }}>log out</Link>
                    </div>
                </Drawer>
            </div>
        );
    } 
    else {
        return (
            <div>
                <div style={{ right: '0', position: "absolute" }}>
                    <IconButton onClick={toggleDrawer}>
                        {!drawerOpen ? <ReorderIcon sx={{ fontSize: "64px" }}style={{ color: 'black' }}/> : null}
                    </IconButton>
                </div>
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={switchDrawer}
                    anchor='right'
                >
                    <div style={{ 'fontSize': 30, 'display': 'flex', 'flexDirection': 'column', 'padding': 24 }}>
                        <Link to="/signup" style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit', 'marginBottom': 16 }}>create account</Link>
                        <Link to="/login" style={{ 'textDecoration': 'none', 'color': 'black', 'fontFamily': 'Outfit' }}>login</Link>
                    </div>
                </Drawer>
            </div>
        );
    }
}