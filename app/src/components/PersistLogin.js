import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useRefreshToken from '../hooks/useRefreshToken';

import CircularProgress from '@mui/material/CircularProgress';

import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    const verifyRefreshToken = async () => {
        try {
            await refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`accessToken: ${JSON.stringify(auth?.accessToken)}`)
    })

    return (
        <>
            {
                !persist
                    ? <Outlet />
                    : isLoading 
                        ? <CircularProgress />
                        : <Outlet /> 
            }
        </>
    )
}

export default PersistLogin