import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const RedirectAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log("here")
    // console.log(auth?.accessToken)

    return (
        auth?.accessToken
            ? <Navigate to='/home' state={{ from: location }} replace />
            : <Outlet />
    );
}

export default RedirectAuth