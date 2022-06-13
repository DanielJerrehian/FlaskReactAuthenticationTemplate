import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../hooks/useAuth'

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios
                .post(
                    '/login',
                    JSON.stringify({ username, password }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                )
            // console.log(JSON.stringify(response?.data))
            // console.log(JSON.stringify(response))
            const accessToken = response?.data?.accessToken
            const refreshToken = response?.data?.refreshToken
            setAuth({ username, password, accessToken, refreshToken });
            setUsername('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrorMessage('No Server Response');
            } else if (error?.response?.status === 400) {
                setErrorMessage('Username not found');
            } else if (error?.response?.status === 401) {
                setErrorMessage('Password Incorrect');
            } else {
                setErrorMessage('Login Failed');
            }

        }
    }

    return (
        <section>
            <Typography
                variant='p'
                ref={errorRef}
                className={errorMessage ? 'error-message' : 'off-screen'} aria-live='assertive'
            >
                {errorMessage}
            </Typography>
            <Typography variant='h4' style={{ marginBottom: '1rem' }}>Sign In</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor='username'>Username:</InputLabel>
                        <TextField
                            id='username'
                            type='text'
                            ref={usernameRef}
                            autoComplete='off'
                            margin='dense'
                            size='small'
                            style={{ backgroundColor: 'white' }}
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                            required
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <InputLabel htmlFor='password'>Password:</InputLabel>
                        <TextField
                            id='password'
                            type='password'
                            margin='dense'
                            size='small'
                            style={{ backgroundColor: 'white' }}
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                            required
                        />
                    </Stack>
                    <Button
                        variant='contained'
                        type='submit'
                    >
                        Sign In
                    </Button>
                    <Stack spacing={1}>
                        <Typography variant='p'>Need an Account?</ Typography>
                        <Typography variant='span'>Sign Up (Put React Router Link Here)</ Typography>
                    </Stack>
                </Stack>
            </form>
        </section>
    )
}

export default Login
