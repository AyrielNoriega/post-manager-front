import { useState } from "react";
import { update } from "../../../store/publication/thunks";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";


export const DataProfile = () => {

    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState ) => state.publication);

    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);


    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');


    const validateInputs = () => {

        let isValid = true;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }


        if (!name || name.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!username || username.length < 1) {
            setNameError(true);
            setNameErrorMessage('username is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (nameError || emailError) {
            return;
        }

        const data = new FormData(event.currentTarget);
        console.log({
            full_name: data.get('full_name'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        });

        const userData = {
            name: data.get('full_name') as string,
            username: data.get('username') as string,
            email: data.get('email') as string,
            password: data.get('password') as string,
        }
        console.log(userData);
        
        dispatch(update(userData));
    };
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <FormControl>
                <FormLabel htmlFor="full_name">Full name</FormLabel>
                <TextField
                    autoComplete="name"
                    name="full_name"
                    required
                    fullWidth
                    id="full_name"
                    placeholder="Jon Snow"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? 'error' : 'primary'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="username">User name</FormLabel>
                <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    placeholder="JonSnow"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? 'error' : 'primary'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    color={emailError ? 'error' : 'primary'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ width: 100 }}
                onClick={validateInputs}
                // disabled={loading}
            >
                Actualizar
            </Button>
        </Box>
        )
}
