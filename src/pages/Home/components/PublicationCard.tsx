import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { Author } from '../../../components/Author';


const SyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme).palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));


const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});


const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

interface PublicationCardProps {
    id : number;
    title: string;
    content: string;
    author: string;
    created_at: string;
}


export const PublicationCard = (props: PublicationCardProps) => {
    const {
        title,
        content,
        author,
        created_at
    } = props;

    const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(
        null,
    );

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ marginX: 'auto' }}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
            >
                <SyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(3)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
                    sx={{ height: '100%' }}
                >
                    <SyledCardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                        }}
                    >
                        <div>
                            {/* <Typography gutterBottom variant="caption" component="div">
                                {data.tag}
                            </Typography> */}
                            <Typography gutterBottom variant="h6" component="div">
                                { title }
                            </Typography>
                            <StyledTypography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                { content }
                            </StyledTypography>
                        </div>
                    </SyledCardContent>
                    <Author author={ author} date={ created_at } />
                </SyledCard>
            </Box>
        </Grid>
    )
}
