import React from 'react';
import { Container, Typography, Box, Paper, Alert } from '@mui/material';

const ConfigMissing = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom color="error">
            Configuration Required
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            The application is missing required environment variables.
          </Typography>
        </Box>
        
        <Alert severity="warning" sx={{ mb: 3, textAlign: 'left' }}>
          <Typography variant="body2">
            <strong>Missing:</strong> VITE_CLERK_PUBLISHABLE_KEY
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Please contact the administrator to configure the application properly.
          </Typography>
        </Alert>

        <Typography variant="body1" color="text.secondary">
          This message appears when environment variables are not properly configured for deployment.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ConfigMissing;