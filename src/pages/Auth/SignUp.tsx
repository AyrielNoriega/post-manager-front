import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import { Link as LinkRouter } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { FacebookIcon, GoogleIcon } from './components/CustomIcons';
import { GeneralTemplate } from '../../components/template/general.template';
import { fetchUserFromLocalStorage, register } from '../../store/publication/thunks';
import { CardStyled } from './components/CardStyled';
import { SignUpContainer } from './components/SignUpContainer';



export const SignUp = () => {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState ) => state.publication);
    const navigate = useNavigate();

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        dispatch(fetchUserFromLocalStorage());

        return () => {
            console.log('SignUp unmounted');
        }
    }, []);

    React.useEffect(() => {
        if (user.email && user.name) {
            navigate('/');
        }
    }, [user]);


    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const name = document.getElementById('name') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }


        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (nameError || emailError || passwordError) {
            return;
        }

        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
        });

        const userData = {
            name: data.get('name') as string,
            email: data.get('email') as string,
            password: data.get('password') as string,
        }

        dispatch(register(userData, navigate));
        // setLoading(true);
    };

    return (
        <GeneralTemplate>
            <SignUpContainer direction="column" justifyContent="space-between">
                <CardStyled variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">User name</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                placeholder="JonSnow"
                                error={nameError}
                                helperText={nameErrorMessage}
                                color={nameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="your@email.com"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                error={emailError}
                                helperText={emailErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={validateInputs}
                                disabled={loading}
                            >
                                Sign up
                            </Button>
                            <Typography sx={{ textAlign: 'center' }}>
                                Already have an account?{' '}
                                <span>
                                    <Link
                                        component={LinkRouter}
                                        to="/sign-in"
                                        variant="body2"
                                        sx={{ alignSelf: 'center' }}
                                    >
                                        Sign in
                                    </Link>
                                </span>
                            </Typography>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Google')}
                            startIcon={<GoogleIcon />}
                        >
                            Sign up with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Facebook')}
                            startIcon={<FacebookIcon />}
                        >
                            Sign up with Facebook
                        </Button>
                    </Box>
                </CardStyled>
            </SignUpContainer>
        </GeneralTemplate>
    );
}
