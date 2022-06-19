import React from 'react';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function Links() {
    return (
        <section>
            <Stack spacing={4}>
                <Stack spacing={1}>
                    <Typography variant='h6'>Public Links</Typography>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                    <Link to='/about'>About</Link>
                </Stack>
                <Stack spacing={1}>
                    <Typography variant='h6'>Private Links</Typography>
                    <Link to='/lounge'>Lounge</Link>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/admin'>Admin Panel</Link>
                </Stack>
            </Stack>
        </section>
    )
}

export default Links