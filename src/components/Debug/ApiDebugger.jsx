import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { API_ENDPOINTS } from '../../config/api';

const ApiDebugger = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const testApiEndpoints = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🔍 Testing API endpoints...');
      console.log('🔧 API Base URL:', API_ENDPOINTS.packages);

      // Test health endpoint
      console.log('🏥 Testing health endpoint...');
      const healthResponse = await fetch(`${API_ENDPOINTS.packages.replace('/api/packages', '/health')}`);
      const healthData = await healthResponse.json();
      console.log('✅ Health check:', healthData);

      // Test packages endpoint
      console.log('📦 Testing packages endpoint...');
      const packagesResponse = await fetch(API_ENDPOINTS.packages);
      const packagesData = await packagesResponse.json();
      console.log('✅ Packages data:', packagesData);

      // Test specific package endpoint
      console.log('🔍 Testing specific package endpoint...');
      const packageResponse = await fetch(`${API_ENDPOINTS.packages}/1`);
      const packageData = await packageResponse.json();
      console.log('✅ Package 1 data:', packageData);

      setResults({
        health: healthData,
        packages: {
          count: packagesData.length,
          sample: packagesData.slice(0, 2)
        },
        packageDetail: packageData
      });
    } catch (err) {
      console.error('❌ API test failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔧 API Debugger mounted');
    console.log('🔧 API Endpoints:', API_ENDPOINTS);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        API Debugger
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
        Test API connectivity and endpoints
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button 
          variant="contained" 
          onClick={testApiEndpoints}
          disabled={loading}
          sx={{ mr: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Test API Endpoints'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      )}

      {results && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Health Check</Typography>
            <Typography variant="body2">
              Status: {results.health.status}
            </Typography>
            <Typography variant="body2">
              Service: {results.health.service}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Packages Endpoint</Typography>
            <Typography variant="body2">
              Total Packages: {results.packages.count}
            </Typography>
            <Typography variant="body2">
              Sample Data: {JSON.stringify(results.packages.sample, null, 2)}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Package Detail</Typography>
            <Typography variant="body2">
              Name: {results.packageDetail.name}
            </Typography>
            <Typography variant="body2">
              ID: {results.packageDetail.id}
            </Typography>
          </Paper>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Button 
          variant="outlined" 
          onClick={() => window.location.reload()}
          sx={{ mr: 2 }}
        >
          Refresh
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default ApiDebugger;