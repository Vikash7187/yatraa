import React from 'react';
import { Box, Container, Typography, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ClerkAuthWrapper = ({ children, title }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const defaultTitle = isLoginPage ? 'Sign in to continue your travel journey' : 'Create your account to start exploring';
  
  console.log('ClerkAuthWrapper rendering with title:', title);
  console.log('ClerkAuthWrapper children:', children);
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        pt: 8, // Account for fixed navbar
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
          }}
        >
          {title && (
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 3,
                textAlign: 'center'
              }}
            >
              Welcome to Yatraa
            </Typography>
          )}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              color: 'text.secondary',
              mb: 4,
              textAlign: 'center'
            }}
          >
            {title || defaultTitle}
          </Typography>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default ClerkAuthWrapper;