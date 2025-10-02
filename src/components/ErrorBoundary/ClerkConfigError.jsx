import React from 'react';
import { Box, Alert, AlertTitle, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ClerkConfigError = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        p: 3
      }}
    >
      <Alert
        severity="error"
        icon={<ErrorOutlineIcon fontSize="large" />}
        sx={{
          maxWidth: 600,
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <AlertTitle sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Authentication Configuration Missing
        </AlertTitle>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          The application requires Clerk authentication to be properly configured.
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>To fix this issue:</strong>
        </Typography>
        
        <Box component="ol" sx={{ mb: 2, pl: 2 }}>
          <li>
            <Typography variant="body2">
              Go to{' '}
              <Button
                variant="text"
                size="small"
                href="https://dashboard.clerk.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ p: 0, textTransform: 'none' }}
              >
                Clerk Dashboard
              </Button>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Create a new application or select an existing one
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Copy your publishable key from the API Keys section
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Add it to your <code>.env</code> file:
            </Typography>
            <Box
              component="pre"
              sx={{
                backgroundColor: '#f5f5f5',
                p: 1,
                mt: 1,
                borderRadius: 1,
                fontSize: '0.875rem'
              }}
            >
              VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
            </Box>
          </li>
          <li>
            <Typography variant="body2">
              Restart your development server
            </Typography>
          </li>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Note: Without proper Clerk configuration, authentication features will not work.
        </Typography>
      </Alert>
    </Box>
  );
};

export default ClerkConfigError;