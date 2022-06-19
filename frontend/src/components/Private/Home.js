import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useLogout from '../../hooks/useLogout';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function Home() {
    const navigate = useNavigate();
    const logout = useLogout();

    const logoutUser = async() => {
        await logout();
        navigate('/')
    }

    return (
        <section>
            <Stack spacing={4}>
                <Typography variant='h4'>Login Succesful!</Typography>
                <Typography variant='h6'>This is Home Page for authenticated users</Typography>
                <Stack spacing={1}>
                    <Typography variant='h6'>Public Links</Typography>
                    <Link to='/'>Landing Page</Link>
                    <Link to='/about'>About</Link>
                </Stack>
                <Stack spacing={1}>
                    <Typography variant='h6'>Private Links</Typography>
                    <Link to='/users'>Users</Link>
                    <Link to='/lounge'>Lounge</Link>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/admin'>Admin Panel</Link>
                </Stack>
                <Button onClick={logoutUser} variant="contained">Log Out</Button>

            </Stack>
        </section>
    )
}

export default Home