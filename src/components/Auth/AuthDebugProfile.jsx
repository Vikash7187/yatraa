import React from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import { useUserSafe } from '../../hooks/useClerkSafe';
import { useUser } from '@clerk/clerk-react';

const AuthDebugProfile = () => {
  // Test both hooks
  const safeUserData = useUserSafe();
  
  let directClerkData;
  try {
    directClerkData = useUser();
  } catch (error) {
    directClerkData = { error: error.message };
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Authentication Debug - Profile
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Environment Variables:
        </Typography>
        <Typography variant="body2" component="pre">
          {JSON.stringify({
            hasClerkKey: !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
            clerkKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? 
              `${import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.substring(0, 20)}...` : 'Not set',
            isDev: import.meta.env.DEV,
            mode: import.meta.env.MODE
          }, null, 2)}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          useClerkSafe Hook Data:
        </Typography>
        <Typography variant="body2" component="pre">
          {JSON.stringify({
            user: safeUserData.user ? {
              id: safeUserData.user.id,
              fullName: safeUserData.user.fullName,
              email: safeUserData.user.emailAddresses?.[0]?.emailAddress,
              createdAt: safeUserData.user.createdAt
            } : null,
            isSignedIn: safeUserData.isSignedIn,
            isLoaded: safeUserData.isLoaded
          }, null, 2)}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Direct Clerk Hook Data:
        </Typography>
        <Typography variant="body2" component="pre">
          {JSON.stringify({
            user: directClerkData.user ? {
              id: directClerkData.user.id,
              fullName: directClerkData.user.fullName,
              email: directClerkData.user.emailAddresses?.[0]?.emailAddress,
              createdAt: directClerkData.user.createdAt
            } : null,
            isSignedIn: directClerkData.isSignedIn,
            isLoaded: directClerkData.isLoaded,
            error: directClerkData.error
          }, null, 2)}
        </Typography>
      </Paper>

      {safeUserData.isSignedIn ? (
        <Alert severity="success">
          User is signed in! Profile should be accessible.
        </Alert>
      ) : (
        <Alert severity="warning">
          User is not signed in. Please login to access profile.
        </Alert>
      )}
    </Box>
  );
};

export default AuthDebugProfile;