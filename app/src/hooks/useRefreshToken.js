import axios from '../api/axios';

import useAuth from './useAuth';


function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh-token', {withCredentials: true});
        setAuth(prev => {
            return { 
                ...prev, 
                role: response?.data?.user?.role,
                accessToken: response?.data?.accessToken
            }
        });
        return response?.data?.accessToken
    }

    return (
        refresh
    )
}

export default useRefreshToken
