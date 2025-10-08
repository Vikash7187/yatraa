import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import { useUserSafe } from '../../hooks/useClerkSafe';
import { getProfileByClerk } from '../../services/profileService';
import { getUserBookings, getPackageById } from '../../services/bookingService';
import { getAllPackages, likePackage, unlikePackage, checkIfLiked } from '../../services/packageService';

const ApiTest = () => {
  const { user, isSignedIn } = useUserSafe();
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testAPIs = async () => {
    setLoading(true);
    const testResults = {};

    try {
      // Test packages API
      console.log('Testing packages API...');
      const packages = await getAllPackages();
      testResults.packages = { success: true, count: packages.length, data: packages.slice(0, 2) };
    } catch (error) {
      testResults.packages = { success: false, error: error.message };
    }

    if (isSignedIn && user) {
      try {
        // Test profile API
        console.log('Testing profile API...');
        const profile = await getProfileByClerk(user.id);
        testResults.profile = { success: true, data: profile };

        // Test bookings API
        console.log('Testing bookings API...');
        const bookings = await getUserBookings(profile.id);
        testResults.bookings = { success: true, count: bookings.length, data: bookings };

        // Test package liking
        console.log('Testing package liking...');
        try {
          await likePackage(1, user.id);
          const isLiked = await checkIfLiked(1, user.id);
          await unlikePackage(1, user.id);
          const isUnliked = await checkIfLiked(1, user.id);
          testResults.liking = { success: true, likeTest: isLiked, unlikeTest: !isUnliked };
        } catch (error) {
          testResults.liking = { success: false, error: error.message };
        }
      } catch (error) {
        testResults.profile = { success: false, error: error.message };
        testResults.bookings = { success: false, error: error.message };
      }
    } else {
      testResults.auth = { success: false, message: 'User not signed in' };
    }

    setResults(testResults);
    setLoading(false);
  };

  const ResultItem = ({ title, result }) => (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {result.success ? (
        <Alert severity="success">
          SUCCESS - {JSON.stringify(result, null, 2).substring(0, 200)}...
        </Alert>
      ) : (
        <Alert severity="error">
          FAILED - {result.error || result.message}
        </Alert>
      )}
    </Paper>
  );

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        API Functionality Test
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          User Status: {isSignedIn ? `Signed in as ${user?.emailAddresses?.[0]?.emailAddress}` : 'Not signed in'}
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={testAPIs}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Test All APIs'}
      </Button>

      {Object.entries(results).map(([key, result]) => (
        <ResultItem key={key} title={key.charAt(0).toUpperCase() + key.slice(1)} result={result} />
      ))}
    </Box>
  );
};

export default ApiTest;