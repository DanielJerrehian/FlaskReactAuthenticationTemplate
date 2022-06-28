import React from 'react';
import { Link } from 'react-router-dom';

import useCurrentUser from '../../hooks/useCurrentUser';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function Home() {
    const { currentUser } = useCurrentUser()


    return (
        <section>
            <Stack spacing={4}>
                <Typography variant='h4'>Login Succesful!</Typography>
                <Typography variant='h6'>This is Home Page for authenticated users</Typography>
                <Stack spacing={1}>
                    <Typography variant='h6'>Public Links</Typography>
                    <Link to='/about'>About</Link>
                </Stack>
                <Stack spacing={1}>
                    <Typography variant='h6'>Private Links</Typography>
                    <Link to='/users'>Users</Link>
                    <Link to='/lounge'>Lounge</Link>
                    <Link to={`/${currentUser?.username}`}>Profile</Link>
                    <Link to='/admin'>Admin Panel</Link>
                </Stack>
            </Stack>
        </section>
    )
}

export default Home