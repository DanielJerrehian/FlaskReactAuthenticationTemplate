import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';

import useAuth from '../hooks/useAuth'

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';


function Login() {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/home';

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
            const accessToken = response?.data?.accessToken;
            const role = response?.data?.user?.role;
            setAuth({ username, password, role, accessToken });
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

    const togglePersist = () => {
        setPersist(prevPersist => !prevPersist);
    }

    useEffect(() => {
        localStorage.setItem('persist', persist)
    }, [persist])

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
                    <Button variant='contained' type='submit'>Sign In</Button>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={togglePersist}
                                    checked={persist}
                                />
                            }
                            label={<InputLabel>Trust This Device?</InputLabel>}
                        />
                    </FormGroup>
                    <Stack spacing={1} direction='row'>
                        <Typography variant='p'>Need an Account?</ Typography>
                        <Typography variant='span'><Link to='/register'>Sign Up</Link></ Typography>
                    </Stack>
                </Stack>
            </form>
        </section>
    )
}

export default Login
