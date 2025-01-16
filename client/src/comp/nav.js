import React from 'react';
import { useSelector } from 'react-redux';
import { logo, cartImg } from "../assets/index";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importer useAuth
import { Button, AppBar, Toolbar, Box, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import '../output.css';

const Header = () => {
    const productData = useSelector((state) => state.bazar.productData);
    const { isAuthenticated, isAdmin, logout } = useAuth(); // Utiliser useAuth pour obtenir l'état d'authentification et le statut d'administrateur
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('https://basarwebsite.onrender.com/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                logout(); // Mettre à jour l'état d'authentification
                navigate('/'); // Rediriger vers la page d'accueil après la déconnexion
            } else {
                console.error('Erreur lors de la déconnexion');
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <AppBar position="static" color="default">
            <Container maxWidth="lg">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <img className="w-16" src={logo} alt="logo" />
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
                            <Button component={Link} to="/" color="inherit">Home</Button>
                            <Button component={Link} to="/shop" color="inherit">Shop</Button>
                            <Button component={Link} to="/contact" color="inherit">Contact</Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <Link to="cart">
                            <div className='relative'>
                                <img className="w-6 cursor-pointer" src={cartImg} alt="cart" />
                                <span className='absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-semibold'>
                                    {productData.length}
                                </span>
                            </div>
                        </Link>
                        {isAuthenticated ? (
                            <>
                                {isAdmin && (
                                    <Button component={Link} to="/admin" color="inherit" sx={{ ml: 2 }}>
                                        Admin
                                    </Button>
                                )}
                                <Button color="primary" variant="contained" onClick={handleLogout} sx={{ ml: 2 }}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button component={Link} to="/login" color="primary" variant="contained" sx={{ ml: 2 }}>
                                    Sign In
                                </Button>
                                <Button component={Link} to="/signup" color="secondary" variant="contained" sx={{ ml: 2 }}>
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem component={Link} to="/">Home</MenuItem>
                                <MenuItem component={Link} to="/shop">Shop</MenuItem>
                                <MenuItem component={Link} to="/contact">Contact</MenuItem>
                                <Divider sx={{ my: 3 }} />
                                {!isAuthenticated ? (
                                    <>
                                        <MenuItem>
                                            <Button component={Link} to="/login" color="primary" variant="contained" fullWidth>
                                                Sign In
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button component={Link} to="/signup" color="secondary" variant="contained" fullWidth>
                                                Sign Up
                                            </Button>
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        {isAdmin && (
                                            <MenuItem>
                                                <Button component={Link} to="/admin" color="inherit" fullWidth>
                                                    Admin
                                                </Button>
                                            </MenuItem>
                                        )}
                                        <MenuItem>
                                            <Button color="primary" variant="contained" fullWidth onClick={handleLogout}>
                                                Logout
                                            </Button>
                                        </MenuItem>
                                    </>
                                )}
                            </Box>
                        </Drawer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;