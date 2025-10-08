import React, { useEffect, useState } from 'react';
import { Box, Typography, Alert, Button, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClerkTest = () => {
  const [clerkStatus, setClerkStatus] = useState('checking');
  const [clerkComponents, setClerkComponents] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const testClerk = async () => {
      try {
        // Test environment variables
        const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        console.log('Testing Clerk Key:', clerkKey ? `${clerkKey.substring(0, 20)}...` : 'Not set');
        
        if (!clerkKey || clerkKey === 'pk_test_placeholder') {
          setError('Clerk publishable key is missing or invalid');
          setClerkStatus('error');
          return;
        }
        
        // Test Clerk import
        const { useUser, useAuth, SignIn, SignUp, ClerkProvider } = await import('@clerk/clerk-react');
        
        setClerkComponents({
          useUser: !!useUser,
          useAuth: !!useAuth,
          SignIn: !!SignIn,
          SignUp: !!SignUp,
          ClerkProvider: !!ClerkProvider
        });
        
        setClerkStatus('success');
        console.log('Clerk components loaded successfully');
        
      } catch (err) {
        console.error('Clerk test error:', err);
        setError(err.message);
        setClerkStatus('error');
      }
    };
    
    testClerk();
  }, []);
  
  const testLogin = () => {
    navigate('/login');
  };
  
  const testRegister = () => {
    navigate('/register');
  };
  
  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: '0 auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Clerk Authentication Test
      </Typography>
      
      {clerkStatus === 'checking' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={20} />
          <Typography>Testing Clerk setup...</Typography>
        </Box>
      )}
      
      {clerkStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          ✅ Clerk is properly configured and available!
        </Alert>
      )}
      
      {clerkStatus === 'error' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          ❌ Clerk Error: {error}
        </Alert>
      )}
      
      {clerkComponents && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Clerk Components Status:
          </Typography>
          <ul>
            <li>useUser: {clerkComponents.useUser ? '✅' : '❌'}</li>
            <li>useAuth: {clerkComponents.useAuth ? '✅' : '❌'}</li>
            <li>SignIn: {clerkComponents.SignIn ? '✅' : '❌'}</li>
            <li>SignUp: {clerkComponents.SignUp ? '✅' : '❌'}</li>
            <li>ClerkProvider: {clerkComponents.ClerkProvider ? '✅' : '❌'}</li>
          </ul>
        </Paper>
      )}
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" onClick={testLogin}>
          Test Login Page
        </Button>
        <Button variant="outlined" onClick={testRegister}>
          Test Register Page
        </Button>
      </Box>
      
      <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom>
          Environment Info:
        </Typography>
        <Typography variant="body2" component="pre">
          {JSON.stringify({
            mode: import.meta.env.MODE,
            dev: import.meta.env.DEV,
            prod: import.meta.env.PROD,
            baseUrl: import.meta.env.BASE_URL,
            hasClerkKey: !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
            currentPath: window.location.pathname
          }, null, 2)}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ClerkTest;