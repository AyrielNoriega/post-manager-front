import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { GeneralTemplate } from '../../components/template/general.template';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPublications } from '../../store/publication/thunks';
import { PublicationCard } from './components/PublicationCard';




export const MainContent = () => {
    const dispatch: AppDispatch = useDispatch();
    const { publications } = useSelector((state: RootState ) => state.publication);

    // const handleClick = () => {
    //     console.info('You clicked the filter chip.');
    // };

    useEffect(() => {
        dispatch(getAllPublications());
        return () => {
            console.log('MainContent unmounted');
        }
    }
    , []);

    console.log(publications);

    return (
        <GeneralTemplate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box
                    sx={{
                    display: { xs: 'flex', sm: 'none' },
                    flexDirection: 'row',
                    gap: 1,
                    width: { xs: '100%', md: 'fit-content' },
                    overflow: 'auto',
                    }}
                >
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column-reverse', md: 'row' },
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: { xs: 'start', md: 'center' },
                        gap: 4,
                        overflow: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'row',
                            gap: 1,
                            width: { xs: '100%', md: 'fit-content' },
                            overflow: 'auto',
                        }}
                        >
                    </Box>
                </Box>
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
