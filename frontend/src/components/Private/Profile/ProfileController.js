import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useCurrentUser from '../../../hooks/useCurrentUser';
import ErrorMissing from '../../Error/ErrorMissing';
import Profile from './Profile';

import CircularProgress from '@mui/material/CircularProgress';


function ProfileController() {
    const { username } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});
    const [userExists, setUserExists] = useState(true);

    const getCurrentUser = async () => {
        try {
            const response = await axiosPrivate.get('/current-user', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setCurrentUser(response?.data?.user)
        } catch (error) {
            console.error(error);
        }
    }

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
        getCurrentUser();
    }, [])

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
                        : <Profile profile={profile} currentUser={currentUser} />
            }
        </>
    )
}

export default ProfileController
