import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { roles } from '../../utils/roles'
import useLogout from '../../hooks/useLogout';
import NavBarPublic from './NavBarPublic';
import NavBarPrivate from './NavBarPrivate';


function NavBarController() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();

    const handleNavigate = (destination) => {
        navigate(destination);
    }

    const logoutUser = async () => {
        await logout();
        navigate('/')
        setAuth({})
    }

    const loadNavBar = () => {
        if (!auth?.accessToken) {
            const linksLeft = [{ name: 'Home', route: '/' }, { name: 'About', route: 'about' }]
            const linksRight = [{ name: 'Sign Up', handleClick: () => handleNavigate('register') }, { name: 'Login', handleClick: () => handleNavigate('login') }]
            return <NavBarPublic navigate={navigate} linksLeft={linksLeft} linksRight={linksRight} />
        } else if (auth?.role === roles.Admin) {
            const linksLeft = [{ name: 'Home', route: '/' }, { name: 'Admin', route: 'admin' }, { name: 'Users', route: 'users' }, { name: 'Lounge', route: 'lounge' }]
            const linksRight = [{ name: 'About', handleClick: () => handleNavigate('about') }, { name: 'Logout Admin', handleClick: logoutUser }]
            return <NavBarPrivate navigate={navigate} linksLeft={linksLeft} linksRight={linksRight} />
        } else if (auth?.role === roles.User) {
            const linksLeft = [{ name: 'Home', route: '/' }, { name: 'Users', route: 'users' }, { name: 'Lounge', route: 'lounge' }]
            const linksRight = [{ name: 'About', handleClick: () => handleNavigate('about') }]
            const accountIcon = true;
            const profileLinks = [{ name: 'My Profile', handleClick: () => handleNavigate(auth?.username) }, { name: 'Logout', handleClick: logoutUser }]
            return <NavBarPrivate navigate={navigate} linksLeft={linksLeft} linksRight={linksRight} accountIcon={accountIcon} profileLinks={profileLinks} />
        }
    }

    useEffect(() => {
        loadNavBar()
    }, [auth, loadNavBar])

    return (
        loadNavBar()
    )
}

export default NavBarController