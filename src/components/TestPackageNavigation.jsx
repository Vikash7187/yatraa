import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const TestPackageNavigation = () => {
  const navigate = useNavigate();
  
  const testPackages = [
    { id: 1, name: 'Taj Lake Palace Udaipur' },
    { id: 2, name: 'The Oberoi Mumbai' },
    { id: 3, name: 'ITC Grand Chola Chennai' },
    { id: 4, name: 'The Leela Palace New Delhi' },
    { id: 5, name: 'Rambagh Palace Jaipur' },
    { id: 6, name: 'Kumarakom Lake Resort Kerala' }
  ];

  const handleNavigate = (id) => {
    console.log(`🔍 Testing navigation to package ${id}`);
    navigate(`/packages/${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Test Package Navigation
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
        Click on any button below to test navigation to package details
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {testPackages.map((pkg) => (
          <Box key={pkg.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ flex: 1 }}>
              {pkg.id}. {pkg.name}
            </Typography>
            <Button 
              variant="contained" 
              component={RouterLink} 
              to={`/packages/${pkg.id}`}
              onClick={() => console.log(`🚀 RouterLink to package ${pkg.id}`)}
            >
              RouterLink
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => handleNavigate(pkg.id)}
            >
              useNavigate
            </Button>
          </Box>
        ))}
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          component={RouterLink} 
          to="/packages"
          sx={{ mr: 2 }}
        >
          Back to Packages
        </Button>
        <Button 
          variant="outlined" 
          component={RouterLink} 
          to="/"
        >
          Home
        </Button>
      </Box>
    </Container>
  );
};

export default TestPackageNavigation;