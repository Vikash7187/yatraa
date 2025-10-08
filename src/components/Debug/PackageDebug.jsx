import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { getPackageById } from '../../services/packageService';

const PackageDebug = () => {
  const [packageId, setPackageId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchPackage = async () => {
    if (!packageId) {
      setError('Please enter a package ID');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      console.log(`🔍 Debug: Fetching package with ID ${packageId}`);
      const data = await getPackageById(packageId);
      console.log(`✅ Debug: Successfully fetched package`, data);
      setResult(data);
    } catch (err) {
      console.error(`❌ Debug: Failed to fetch package ${packageId}`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Package Debug Tool
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <TextField
            label="Package ID"
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
          />
          <Button
            variant="contained"
            onClick={handleFetchPackage}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Fetch Package'}
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6">Error</Typography>
            <Typography variant="body2">{error}</Typography>
          </Alert>
        )}
        
        {result && (
          <Alert severity="success">
            <Typography variant="h6">Package Data</Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </Alert>
        )}
      </Paper>
      
      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" href="/profile">
          Back to Profile
        </Button>
      </Box>
    </Container>
  );
};

export default PackageDebug;