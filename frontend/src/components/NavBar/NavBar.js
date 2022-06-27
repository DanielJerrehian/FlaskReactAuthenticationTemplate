import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';


function NavBar(props) {
    const { navigate, linksLeft, linksRight, profile, profileLinks } = props
    const [menuAnchorElement, setMenuAnchorElement] = useState(null);
    const [profileAnchorElement, setProfileAnchorElement] = useState(null);

    const handleNavigate = (destination) => {
        navigate(destination);
    }

    const handleMenu = (event) => {
        setMenuAnchorElement(event.currentTarget);
    };

    const handleProfileMenu = (event) => {
        setProfileAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setMenuAnchorElement(null);
        setProfileAnchorElement(null);
    };

    const handleMenuItemClick = (destination) => {
        handleClose()
        handleNavigate(destination)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        onClick={handleMenu}
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        anchorEl={menuAnchorElement}
                        open={Boolean(menuAnchorElement)}
                        onClose={handleClose}
                        keepMounted
                        disableScrollLock={true}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        {linksLeft.map((link, i) => {
                            return <MenuItem key={i} onClick={() => handleMenuItemClick(link?.route)}>{link?.name}</MenuItem>
                        })}
                    </Menu>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Typography
                                variant='h6'
                                component='div'
                                sx={{ color: 'white' }}
                            >
                                Website Name
                            </Typography>
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        {linksRight.map((link, i) => {
                            return <Button key={i} onClick={() => link.handleClick()} sx={{ color: 'white' }}>{link?.name}</Button>
                        })}
                        {
                            profile && (
                                <div>
                                    <IconButton
                                        size='large'
                                        aria-label='Current User'
                                        aria-controls='menu-appbar'
                                        aria-haspopup='true'
                                        onClick={handleProfileMenu}
                                        color='inherit'
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id='menu-appbar'
                                        anchorEl={profileAnchorElement}
                                        open={Boolean(profileAnchorElement)}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        onClose={handleClose}
                                    >
                                        {profileLinks.map((link, i) => {
                                            return <MenuItem key={i} onClick={() => link.handleClick()} >{link?.name}</MenuItem>
                                        })}
                                    </Menu>
                                </div>
                            )
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar