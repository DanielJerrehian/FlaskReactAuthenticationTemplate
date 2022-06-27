import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import { redirectRoutes } from '../../utils/redirectRoutes';

import CircularProgress from '@mui/material/CircularProgress';


const PersistLogin = () => {
    const location = useLocation()
    const refresh = useRefreshToken();
    const [isLoading, setIsLoading] = useState(true);
    const { auth, persist } = useAuth();
    const redirectList = redirectRoutes;

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
                        : auth?.accessToken && redirectList.includes(location.pathname)
                            ? <Navigate to='/home' state={{ from: location }} replace />
                            : <Outlet /> 
            }
        </>
    )
}

export default PersistLogin