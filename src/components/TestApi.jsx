import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { getAllPackages } from '../services/packageService';

const TestApi = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testApiConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPackages();
      setPackages(data);
      console.log('API Test Success:', data);
    } catch (err) {
      setError(err.message);
      console.error('API Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        API Connection Test
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={testApiConnection}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Test API Connection'}
      </Button>
      
      {error && (
        <Paper sx={{ p: 2, mb: 2, backgroundColor: '#ffebee' }}>
          <Typography color="error">
            Error: {error}
          </Typography>
        </Paper>
      )}
      
      {packages.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Successfully fetched {packages.length} packages:
          </Typography>
          <ul>
            {packages.map(pkg => (
              <li key={pkg.id}>
                <Typography>{pkg.name}</Typography>
              </li>
            ))}
          </ul>
        </Paper>
      )}
    </Box>
  );
};

export default TestApi;