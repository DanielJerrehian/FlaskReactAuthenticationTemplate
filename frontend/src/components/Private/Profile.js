import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


function Profile(props) {
    const { profile } = props;
    
    return (
        (
            <section>
                <Stack spacing={2}>
                    <Typography variant='p'>This is the Profile Route and it is protected!</Typography>
                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar
                            alt={`${profile?.username}'s Profile Picture`}
                            src={profile?.profile_picture_url}
                            sx={{ width: 100, height: 100, marginRight: '1rem' }}
                        />
                        <Typography variant='h6'>{profile?.username}</Typography>
                    </Box>
                </Stack>
            </section>
        )
    )
}

export default Profile