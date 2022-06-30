import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useCurrentUser from '../../hooks/useCurrentUser';
import ErrorMissing from '../Error/ErrorMissing';
import CurrentUserProfile from './CurrentUserProfile';
import Profile from './Profile';

import CircularProgress from '@mui/material/CircularProgress';


function ProfileController() {
    const { username } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const { currentUser } = useCurrentUser();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});
    const [userExists, setUserExists] = useState(true);


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
                setUserExists(false);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <>
            {
                loading
                    ? <CircularProgress />
                    : !userExists
                        ? <ErrorMissing />
                        : username === currentUser?.username
                            ? <CurrentUserProfile profile={profile} />
                            : <Profile profile={profile} />
            }
        </>
    )
}

export default ProfileController
