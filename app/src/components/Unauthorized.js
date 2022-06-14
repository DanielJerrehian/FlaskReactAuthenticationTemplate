import React from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Unauthorized() {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <Stack spacing={2}>
                <Typography variant='h4'>Unauthorized</Typography>
                <Typography variant='p'>You do not have access to view this page</Typography>
                <Button onClick={goBack}>Go Back</Button>
            </ Stack>
        </section>
    )
}

export default Unauthorized
