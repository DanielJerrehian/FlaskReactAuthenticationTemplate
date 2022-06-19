import React from 'react';
import { Link } from 'react-router-dom';

import Users from './Users';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Admin() {
    return (
        <section>
            <Stack spacing={2}>
                <Typography variant='h4'>Admin Panel</Typography>
                <Users />
                <Link to='/home'>Home</Link>
            </Stack>
        </section>
    )
}

export default Admin