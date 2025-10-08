import React from 'react';
import { Box, Typography, Alert, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AuthDebug = () => {
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const hasValidClerkKey = clerkKey && clerkKey !== 'pk_test_placeholder';
  
  const debugInfo = {
    environment: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    baseUrl: import.meta.env.BASE_URL,
    clerkKey: clerkKey ? `${clerkKey.substring(0, 10)}...` : 'Not set',
    clerkKeyLength: clerkKey?.length || 0,
    clerkKeyValid: hasValidClerkKey,
    clerkKeyStartsWithPk: clerkKey?.startsWith('pk_'),
    currentPath: window.location.pathname,
    currentUrl: window.location.href,
    userAgent: navigator.userAgent
  };
  
  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Authentication Debug Information
      </Typography>
      
      <Alert severity={hasValidClerkKey ? 'success' : 'warning'} sx={{ mb: 3 }}>
        Clerk Status: {hasValidClerkKey ? 'Available and Valid' : 'Not Available or Invalid'}
      </Alert>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Environment Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          </Paper>
        </AccordionDetails>
      </Accordion>
      
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Clerk Configuration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="body2" paragraph>
              <strong>Publishable Key:</strong> {clerkKey ? 'Present' : 'Missing'}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Key Length:</strong> {clerkKey?.length || 0} characters
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Key Format Valid:</strong> {clerkKey?.startsWith('pk_') ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Key Preview:</strong> {clerkKey ? `${clerkKey.substring(0, 20)}...` : 'N/A'}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AuthDebug;