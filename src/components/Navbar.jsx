import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useScrollTrigger,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';

// Conditionally import Clerk components
let SignedIn, SignedOut, UserButton;
try {
  const clerkComponents = require('@clerk/clerk-react');
  SignedIn = clerkComponents.SignedIn;
  SignedOut = clerkComponents.SignedOut;
  UserButton = clerkComponents.UserButton;
} catch (error) {
  console.log('Clerk components not available - running in demo mode');
}

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'Packages', path: '/packages' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user, logout } = useAuth();
  const location = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  
  // Check if Clerk is available
  const hasValidClerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
                          import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder';
  const clerkAvailable = hasValidClerkKey && SignedIn && SignedOut && UserButton;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar 
      position="fixed"
      sx={{
        transition: 'all 0.3s ease-in-out',
        backgroundColor: trigger ? 'rgba(25, 118, 210, 0.95)' : 'transparent',
        backdropFilter: trigger ? 'blur(8px)' : 'none',
        boxShadow: trigger ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            YATRAA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                  selected={location.pathname === page.path}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            YATRAA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  color: 'white',
                  display: 'block',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: location.pathname === page.path ? '100%' : '0%',
                    height: '2px',
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease-in-out',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {clerkAvailable ? (
              <>
                <SignedOut>
                  <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                  <Button color="inherit" component={RouterLink} to="/register">Register</Button>
                </SignedOut>
                <SignedIn>
                  <Button color="inherit" component={RouterLink} to="/profile">My Profile</Button>
                  <Button color="inherit" component={RouterLink} to="/add-package">Add Package</Button>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                <Button color="inherit" component={RouterLink} to="/register">Register</Button>
                <Button color="inherit" component={RouterLink} to="/contact">Contact</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 