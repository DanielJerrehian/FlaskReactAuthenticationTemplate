import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({logout: true});
        try {
            await axios.get('/logout', { withCredentials: true })
        } catch (error) {
            console.error(error);
        }
    }

    return logout;
}

export default useLogout