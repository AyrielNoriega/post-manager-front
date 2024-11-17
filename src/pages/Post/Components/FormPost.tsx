import { useState } from "react";
import { createPost } from "../../../store/publication/thunks";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import { Post } from "../../../interfaces";
import { useNavigate } from "react-router-dom";


export const FormPost = () => {

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setName] = useState('');
    const [content, setEmail] = useState('');

    const [titleError, setTitleError] = useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [contentError, setContentError] = useState(false);
    const [contentErrorMessage, setContentErrorMessage] = useState('');


    const validateInputs = () => {

        let isValid = true;

        if (!title || title.length < 1) {
            setTitleError(true);
            setTitleErrorMessage('title is required.');
            isValid = false;
        } else {
            setTitleError(false);
            setTitleErrorMessage('');
        }


        if (!content || content.length < 1) {
            setContentError(true);
            setContentErrorMessage('content is required.');
            isValid = false;
        } else {
            setContentError(false);
            setContentErrorMessage('');
        }

        return isValid;
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (titleError || contentError) {
            return;
        }

        const data = new FormData(event.currentTarget);
        
        const postContent: Post = {
            title: data.get('title') as string,
            content: data.get('content') as string,
        }
        dispatch(createPost(postContent, navigate));
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <FormControl>
                <FormLabel htmlFor="full_name">Title</FormLabel>
                <TextField
                    autoComplete="title"
                    name="title"
                    required
                    fullWidth
                    id="title"
                    placeholder="....."
                    error={titleError}
                    helperText={titleErrorMessage}
                    color={titleError ? 'error' : 'primary'}
                    value={title}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="content">Content</FormLabel>
                <TextField
                    required
                    fullWidth
                    id="content"
                    placeholder="......"
                    name="content"
                    autoComplete="content"
                    variant="outlined"
                    error={contentError}
                    helperText={contentErrorMessage}
                    color={contentError ? 'error' : 'primary'}
                    value={content}
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
                Crear
            </Button>
        </Box>
        )
}
