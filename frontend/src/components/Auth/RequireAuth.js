import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        
        auth?.accessToken && allowedRoles?.includes(auth?.role)
            ? <Outlet /> // represents any child components of RequireAuth
            : auth?.accessToken
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : auth?.logout 
                    ? <Navigate to='/' state={{ from: location }} replace />
                    : <Navigate to='/login' state={{ from: location }} replace />
    );
}

export default RequireAuth