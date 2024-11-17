import Grid from '@mui/material/Grid2';
import { GeneralTemplate } from '../../components/template/general.template';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFromLocalStorage, getPublicationsForUser } from '../../store/publication/thunks';
import { Box } from '@mui/material';
import { DataProfile } from './components/DataProfile';
import { PublicationCard } from './components/PublicationCard';


export const Profile = () => {
    const dispatch: AppDispatch = useDispatch();
    const { publications, user } = useSelector((state: RootState ) => state.publication);


    useEffect(() => {
        dispatch(fetchUserFromLocalStorage());
        dispatch(getPublicationsForUser(user.username));

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
                        <DataProfile />
                    </Grid>
                </Grid>
                <Grid container spacing={2} columns={8}>
                    {
                        publications.map((data) => (
                            <PublicationCard
                                key={data.id}
                                id={data.id}
                                title={data.title}
                                content={data.content}
                                author={data.author}
                                created_at={data.date}
                            />
                        ))
                    }
                </Grid>
            </Box>
        </GeneralTemplate>
    );
}
