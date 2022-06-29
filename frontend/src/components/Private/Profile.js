import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ErrorMissing from '../Error/ErrorMissing';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


function Profile() {
    const { username } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({})

    const getUser = async () => {
        try {
            const response = await axiosPrivate.get(`/${username}`, { 
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setProfile(response?.data?.profile)
        } catch (error) {
            console.error(error);
            if (error?.response?.status === 404) {

            }
        }
        setLoading(false);
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <section>
            <Stack spacing={2}>
                <Typography variant='p'>This is the Profile Route and it is protected!</Typography>
                <Divider />
                { loading 
                    ? <CircularProgress />
                    : 
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar
                                alt={`${profile?.username}'s Profile Picture`}
                                src={profile?.profile_picture_url}
                                sx={{ width: 100, height: 100, marginRight: '1rem' }}
                            />
                            <Typography variant='h6'>{profile?.username}</Typography>
                        </Box>
                }
            </Stack>
        </section>
    )
}

export default Profile
