import React from 'react';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function HomeAuthenticated() {
    return (
        <section>
            <Stack spacing={4}>
                <Typography variant='h4'>Welcome!</Typography>
                <Typography variant='h6'>
                    This is the home page, please <Link to='/login'>login</Link> to continue
                </Typography>
                <Stack spacing={1}>
                    <Typography variant='h6'>Public Links</Typography>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                    <Link to='/about'>About</Link>
                </Stack>
                <Stack spacing={1}>
                    <Typography variant='h6'>Private Links</Typography>
                    <Link to='/users'>Users</Link>
                    <Link to='/lounge'>Lounge</Link>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/admin'>Admin Panel</Link>
                </Stack>
            </Stack>
        </section>
    )
}

export default HomeAuthenticated