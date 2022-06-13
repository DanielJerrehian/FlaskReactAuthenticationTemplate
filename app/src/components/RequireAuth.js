import  { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.username
            ?
                <Outlet /> // represents any child components of RequireAuth
            :
                <Navigate to='/login' state={{ from: location }} replace />
    );
}

export default RequireAuth