import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

import CircularProgress from '@mui/material/CircularProgress';


const PersistLogin = () => {
    const location = useLocation()
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

    return (
        <>
            {
                !persist
                    ? <Outlet />
                    : isLoading 
                        ? <CircularProgress />
                        : auth?.accessToken && location.pathname === '/' || auth?.accessToken && location.pathname === '/register' || auth?.accessToken && location.pathname === '/login'
                            ? <Navigate to='/home' state={{ from: location }} replace />
                            : <Outlet /> 
            }
        </>
    )
}

export default PersistLogin