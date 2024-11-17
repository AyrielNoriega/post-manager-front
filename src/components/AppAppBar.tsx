import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ColorModeIconDropdown from '.././theme/ColorModeIconDropdown';
import { AppDispatch, RootState } from '../store/store';
import { fetchUserFromLocalStorage } from '../store/publication/thunks';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

export default function AppAppBar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState ) => state.publication);

    React.useEffect(() => {
        dispatch(fetchUserFromLocalStorage());

        return () => {
            console.log('SignUp unmounted');
        }
    }, []);


    const onSignOut = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('token');

        dispatch(fetchUserFromLocalStorage());
        window.location.href = '/';
    }

    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
        <Container maxWidth="lg">
            <StyledToolbar variant="dense" disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button
                    color="info"
                    component={Link}
                    size="small"
                    to="/"
                    variant="text"
                >
                    Inicio
                </Button>
                {
                    user.name && (
                        <Button
                            variant="text"
                            color="info"
                            size="small"
                            component={Link}
                            to={`/profile/${user.username}`}
                        >
                            Perfil - {user.name}
                        </Button>
                    )
                }

                {/* <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                    Blog
                </Button> */}
                </Box>
            </Box>
            <Box
                sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 1,
                alignItems: 'center',
                }}
            >
                {
                    user.name ? (
                        <Button
                            color="primary"
                            size="small"
                            variant="contained"
                            onClick={onSignOut}
                        >
                            Sign out
                        </Button>
                    ) : (
                        <>
                            <Button
                                color="primary"
                                component={Link}
                                size="small"
                                to="/sign-in"
                                variant="text"
                            >
                                Sign in
                            </Button>
                            <Button
                                color="primary"
                                component={Link}
                                size="small"
                                to="/sign-up"
                                variant="contained"
                            >
                                Sign up
                            </Button>
                        </>
                    )

                }

                <ColorModeIconDropdown />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                <ColorModeIconDropdown size="medium" />
                <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="top"
                    open={open}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                        top: 'var(--template-frame-height, 0px)',
                        },
                    }}
                >
                <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                    >
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseRoundedIcon />
                    </IconButton>
                    </Box>
                    <MenuItem>Features</MenuItem>
                    <MenuItem>Testimonials</MenuItem>
                    <MenuItem>Highlights</MenuItem>
                    <MenuItem>Pricing</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                    <MenuItem>Blog</MenuItem>
                    <Divider sx={{ my: 3 }} />
                    <MenuItem>
                    <Button color="primary" variant="contained" fullWidth>
                        Sign up
                    </Button>
                    </MenuItem>
                    <MenuItem>
                    <Button color="primary" variant="outlined" fullWidth>
                        Sign in
                    </Button>
                    </MenuItem>
                </Box>
                </Drawer>
            </Box>
            </StyledToolbar>
        </Container>
        </AppBar>
    );
}
