import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAxiosPrivate from '../hooks/useAxiosPrivate'; 
import useRefreshToken from '../hooks/useRefreshToken';


import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Users() {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        // const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    // signal: controller.signal, 
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                isMounted && setUsers(response?.data?.users)
            } catch (error) {
                console.error(error)
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            // controller.abort();
        }
    }, [])

    return (
        <section>

            <Stack spacing={1}>
                <Typography variant='h6'>Users</Typography>
                {
                    users?.length
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
