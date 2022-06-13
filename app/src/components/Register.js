import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import { userRegex, passwordRegex } from '../utils/regex';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Register() {
    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [showPassword, setShowPassword] = useState(false)

    const [passwordMatch, setPasswordMatch] = useState('');
    const [validPasswordMatch, setValidPasswordMatch] = useState(false);
    const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        const result = userRegex.test(username);
        setValidUsername(result);
    }, [username])

    useEffect(() => {
        const result = passwordRegex.test(password);
        setValidPassword(result);
        const match = password === passwordMatch;
        setValidPasswordMatch(match);
    }, [password, passwordMatch])

    useEffect(() => {
        setErrorMessage('');
    }, [username, password, passwordMatch])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userRegexConfirmation = userRegex.test(username);
        const passwordRegexConfirmation = passwordRegex.test(password);
        if (!userRegexConfirmation || !passwordRegexConfirmation) {
            setErrorMessage("Invalid Entry, please try again");
            return;
        } else {
            try {
                const response = await axios.post('/register', JSON.stringify({ username, password }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    })
                console.log(response?.data);
                console.log(response?.data?.accessToken);
                console.log(JSON.stringify(response))
                setSuccess(true);
                setUsername('');
                setPassword('');
                setPasswordMatch('');
            } catch (error) {
                if (!error?.response) {
                    setErrorMessage('No Server Response')
                } else if (error.response?.status === 409) {
                    setErrorMessage('Username Taken')
                } else {
                    setErrorMessage('Registration Failed');
                }
                errorRef.current.focus();
            }
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <Typography variant='h4'>Success!</Typography>
                    <Typography variant='p'>
                        Sign in (Put React Router Link Here)
                    </Typography>
                </section>
            ) : (
                <section>
                    <Typography
                        variant='p'
                        ref={errorRef}
                        className={errorMessage ? 'error-message' : 'off-screen'} aria-live='assertive'
                    >
                        {errorMessage}
                    </Typography>
                    <Typography variant='h4' style={{ marginBottom: '1rem' }}>Register</Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor='username' style={{color: (usernameFocus ? 'black' : '')}}>
                                    Username:
                                    <span className={validUsername ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validUsername || !username ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </InputLabel>
                                <TextField
                                    id='username'
                                    type='text'
                                    margin='dense'
                                    size='small'
                                    style={{ backgroundColor: 'white' }}
                                    required
                                    ref={usernameRef}
                                    autoComplete='off'
                                    onChange={(event) => setUsername(event.target.value)}
                                    aria-invalid={validUsername ? 'false' : 'true'}
                                    aria-describedby='user-id-note'
                                    onFocus={() => setUsernameFocus(true)}
                                    onBlur={() => setUsernameFocus(false)}
                                />
                                <Stack spacing={1} direction='row' className={usernameFocus && !validUsername ? 'instructions' : 'off-screen'}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    <Typography
                                        id='user-id-note'
                                        variant='caption'
                                    >
                                        4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, and hyphens allowed.
                                    </ Typography>
                                </Stack>
                                <InputLabel htmlFor='password' style={{color: (passwordFocus ? 'black' : '')}}>
                                    Password:
                                    <span className={validPassword ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validPassword || !password ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                    {
                                        password || passwordMatch ?
                                            <Button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                size='small'
                                            >
                                                {showPassword ? 'Hide Password' : 'Show Password'}
                                            </Button>
                                            :
                                            null
                                    }
                                </InputLabel>
                                <TextField
                                    type={showPassword && password ? 'text' : 'password'}
                                    id='password'
                                    size='small'
                                    margin='dense'
                                    style={{ backgroundColor: 'white' }}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    aria-invalid={validPassword ? 'false' : 'true'}
                                    aria-describedby='password-note'
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                />
                                <Stack spacing={1} direction='row' className={passwordFocus && !validPassword ? 'instructions' : 'off-screen'}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    <Typography
                                        id='password-note'
                                        variant='caption'
                                    >
                                        8 to 24 characters. Must include upper and lowercase letters, a number, and at least one special character (! @ # $ %).
                                    </ Typography>
                                </Stack>
                                <InputLabel htmlFor='password-match' style={{color: (passwordMatchFocus ? 'black' : '')}}>
                                    Confirm Password:
                                    <span className={validPasswordMatch && passwordMatch ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validPasswordMatch || !passwordMatch ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </InputLabel>
                                <TextField
                                    type={showPassword && passwordMatch ? 'text' : 'password'}
                                    id='password-match'
                                    size='small'
                                    margin='dense'
                                    style={{ backgroundColor: 'white' }}
                                    onChange={(event) => setPasswordMatch(event.target.value)}
                                    required
                                    aria-invalid={validPasswordMatch ? 'false' : 'true'}
                                    aria-describedby='password-match-note'
                                    onFocus={() => setPasswordMatchFocus(true)}
                                    onBlur={() => setPasswordMatchFocus(false)}
                                />
                                <Stack spacing={1} direction='row' className={passwordMatchFocus && !validPasswordMatch ? 'instructions' : 'off-screen'}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    <Typography
                                        id='password-match-note'
                                        variant='caption'
                                    >
                                        Must match the first password field.
                                    </ Typography>
                                </Stack>
                            </Stack>
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={!validUsername || !validPassword || !validPasswordMatch ? true : false}
                            >
                                Sign Up
                            </Button>
                            <Stack spacing={1}>
                                <Typography variant='p'>Already Registered?</ Typography>
                                <Typography variant='span'>Sign in (Put React Router Link Here)</ Typography>
                            </Stack>
                        </Stack>
                    </form>
                </section>
            )
            }
        </>
    )
}

export default Register
