import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";

interface AuthorProps {
    author: string;
    date: string;
}

export const Author = ({ author, date }: AuthorProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
            }}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
            >
                <AvatarGroup max={3}>
                <Avatar
                    alt={author}
                    src=""
                    sx={{ width: 24, height: 24 }}
                />
                </AvatarGroup>
                <Typography variant="caption">
                    { author }
                </Typography>
            </Box>
            <Typography variant="caption">{ date }</Typography>
        </Box>
    );
}