import Grid from '@mui/material/Grid2';
import { GeneralTemplate } from '../../components/template/general.template';
import { useEffect } from 'react';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { fetchUserFromLocalStorage } from '../../store/publication/thunks';
import { Box } from '@mui/material';
import { FormPost } from './Components/FormPost';


export const Post = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserFromLocalStorage());

        return () => {
            console.log('SignUp unmounted');
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUserFromLocalStorage());

        return () => {
            console.log('SignUp unmounted');
        }
    }, [dispatch]);


    return (
        <GeneralTemplate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Grid container spacing={2} columns={8}>
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{ marginX: 'auto' }}
                    >
                        <FormPost />
                    </Grid>
                </Grid>
            </Box>
        </GeneralTemplate>
    );
}
