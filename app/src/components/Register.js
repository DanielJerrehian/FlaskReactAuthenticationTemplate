import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { userRegex, passwordRegex } from '../utils/regex'

function Register() {
    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

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
        console.log(result);
        console.log(username);
        setValidUsername(result);
    }, [username])

    useEffect(() => {
        const result = passwordRegex.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === passwordMatch
        setValidPasswordMatch(match);
    }, [password, passwordMatch])

    useEffect(() => {
        setErrorMessage('');
    }, [username, password, passwordMatch])

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if button were to be enabled by someone hacking JS 
        const userRegexConfirmation = userRegex.text(username);
        const passwordRegexConfirmation = passwordRegex.text(password);
        if (!userRegexConfirmation || !passwordRegexConfirmation) {
            setErrorMessage("Invalid Entry, please try again");
            return;
        } else {
            console.log(username, password);
            setSuccess(true);
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        Sign in / Put React Router Link Here
                    </p>
                </section>
            ) : (

                <section>
                    <p ref={errorRef} className={errorMessage ? 'error-message' : 'off-screen'} aria-live='assertive'>{errorMessage}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>
                            Username:
                            <span className={validUsername ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validUsername || !username ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type='text'
                            id='username'
                            ref={usernameRef}
                            autoComplete='off'
                            onChange={(event) => setUsername(event.target.value)}
                            required
                            aria-invalid={validUsername ? 'false' : 'true'}
                            aria-describedby='user-id-note'
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p id='user-id-note' className={usernameFocus && username && !validUsername ? 'instructions' : 'off-screen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters. Must begin with a letter. Letters numbers, underscores, and hyphens allowed.
                        </p>
                        <label htmlFor='password'>
                            Password:
                            <span className={validPassword ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPassword || !password ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type='password'
                            id='password'
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            aria-invalid={validPassword ? 'false' : 'true'}
                            aria-describedby='password-note'
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id='password-note' className={passwordFocus && !validPassword ? 'instructions' : 'off-screen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters. Must include upper and lowercase letters, a number, and a special character.begin with a letter. Allowed sepcial characters:
                            <span aria-label='exclamation mark'>!</span>
                            <span aria-label='at symbol'>@</span>
                            <span aria-label='hashtag'>#</span>
                            <span aria-label='dollar sign'>$</span>
                            <span aria-label='percent symbol'>%</span>
                        </p>
                        <label htmlFor='password-match'>
                            Confirm Password:
                            <span className={validPasswordMatch && passwordMatch ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPasswordMatch || !passwordMatch ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type='password'
                            id='password-match'
                            onChange={(event) => setPasswordMatch(event.target.value)}
                            required
                            aria-invalid={validPasswordMatch ? 'false' : 'true'}
                            aria-describedby='password-match-note'
                            onFocus={() => setPasswordMatch(true)}
                            onBlur={() => setPasswordMatchFocus(false)}
                        />
                        <p id='password-match-note' className={passwordMatchFocus && !validPasswordMatch ? 'instructions' : 'off-screen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password field.
                        </p>
                        <button disabled={!validUsername || !validPassword || !validPasswordMatch ? true : false}>Sign Up</button>
                        <p>
                            Already Registered?
                            <br />
                            <span className="line">
                                Sign in / Put React Router Link Here
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    )
}

export default Register
