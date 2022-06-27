import React, { useEffect } from 'react'

import useCurrentUser from '../../hooks/useCurrentUser';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


function Profile() {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const axiosPrivate = useAxiosPrivate();

    // const getCurrentUser = async () => {
    //     try {
    //         const response = await axiosPrivate.get('/current-user', { 
    //             headers: { 'Content-Type': 'application/json' },
    //             withCredentials: true
    //         });
    //         setCurrentUser(response?.data?.user)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // useEffect(() => {
    //     getCurrentUser();
    // }, [])

    return (
        <section>
            <Stack spacing={2}>
                <Typography variant='p'>This is the Profile Route and it is protected!</Typography>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar
                        alt={`${currentUser?.username}'s Profile Picture`}
                        src={currentUser?.profile_picture_url}
                        sx={{ width: 100, height: 100, marginRight: '1rem' }}
                    />
                    <Typography variant='h6'>{currentUser?.username}</Typography>
                </Box>
            </Stack>
        </section>
    )
}

export default Profile
