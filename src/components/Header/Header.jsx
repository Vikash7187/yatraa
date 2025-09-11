import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Container } from '@mui/material';
import { Menu as MenuIcon, Phone, LocationOn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  backgroundColor: 'white',
  color: '#333',
}));

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#FF9F43',
  color: 'white',
  padding: theme.spacing(0.5),
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'none',
  gap: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Packages', path: '/packages' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <TopBar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone fontSize="small" />
          <Typography variant="body2">+91 959 603 6035</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOn fontSize="small" />
          <Typography variant="body2">Greater Noida, Uttar Pradesh</Typography>
        </Box>
      </TopBar>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white' }}>
        <Container>
          <StyledToolbar>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                color: '#333', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              Travel Insurance
            </Typography>

            <NavLinks>
              {navItems.map((item) => (
                <Button 
                  key={item.label} 
                  onClick={() => handleNavigation(item.path)}
                  sx={{ 
                    color: '#333',
                    '&:hover': {
                      color: '#FF9F43'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </NavLinks>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ color: '#333' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {navItems.map((item) => (
                <MenuItem 
                  key={item.label} 
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </StyledToolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header; 