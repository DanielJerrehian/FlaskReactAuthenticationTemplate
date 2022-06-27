import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function Users() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get('/users', { 
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setUsers(response?.data?.users)
        } catch (error) {
            console.error(error)
            navigate('/login', { state: { from: location }, replace: true });
        }
        setLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <section>
            <Stack spacing={1}>
                <Typography variant='h6'>Users</Typography>
                {
                    loading
                        ? <CircularProgress />
                        : users?.length
                            ? (
                                <List>
                                    {users.map((user, i) => <ListItem disablePadding key={i}><ListItemText>{user?.username}</ListItemText></ListItem>)}
                                </List>
                            ) : (
                                <Typography variant='p'>No users to display</Typography>
                            )
                }
            </Stack>
        </section>
    )
}

export default Users
