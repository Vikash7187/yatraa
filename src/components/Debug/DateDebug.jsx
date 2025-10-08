import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
  TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { getAvailableDates } from '../../services/bookingService';

const DateDebug = () => {
  const [packageId, setPackageId] = useState('1');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchDates = async () => {
      if (!packageId) return;
      try {
        setLoading(true);
        setError(null);
        console.log(`🔍 Debug: Fetching available dates for package ${packageId}`);
        const dates = await getAvailableDates(packageId, new Date().getMonth() + 1, new Date().getFullYear());
        console.log(`✅ Debug: Fetched available dates:`, dates);
        setAvailableDates(dates);
      } catch (err) {
        console.error(`❌ Debug: Failed to fetch available dates:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDates();
  }, [packageId]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    if (newValue) {
      const formattedDate = format(newValue, 'yyyy-MM-dd');
      console.log(`📅 Debug: Start date selected: ${formattedDate}`);
      setResult(prev => ({ ...prev, startDate: formattedDate }));
    }
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    if (newValue) {
      const formattedDate = format(newValue, 'yyyy-MM-dd');
      console.log(`📅 Debug: End date selected: ${formattedDate}`);
      setResult(prev => ({ ...prev, endDate: formattedDate }));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Date Selection Debug Tool
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <TextField
            label="Package ID"
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
          />
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
          >
            Refresh Dates
          </Button>
        </Box>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6">Error</Typography>
            <Typography variant="body2">{error}</Typography>
          </Alert>
        )}
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
              disablePast
              shouldDisableDate={(date) => {
                if (!date) return true;
                const formattedDate = format(date, 'yyyy-MM-dd');
                return !availableDates.includes(formattedDate);
              }}
            />
            
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
              disablePast
              minDate={startDate}
              shouldDisableDate={(date) => {
                if (!date) return true;
                const formattedDate = format(date, 'yyyy-MM-dd');
                return !availableDates.includes(formattedDate);
              }}
            />
          </Box>
        </LocalizationProvider>
        
        {result && (
          <Alert severity="success">
            <Typography variant="h6">Selected Dates</Typography>
            <Typography variant="body2">Start Date: {result.startDate}</Typography>
            <Typography variant="body2">End Date: {result.endDate}</Typography>
          </Alert>
        )}
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Available Dates ({availableDates.length}):
          </Typography>
          <Box sx={{ 
            maxHeight: 200, 
            overflowY: 'auto', 
            p: 2, 
            border: '1px solid #ddd', 
            borderRadius: 1,
            backgroundColor: '#f5f5f5'
          }}>
            {availableDates.length > 0 ? (
              <Typography variant="body2" component="div">
                {availableDates.join(', ')}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No available dates loaded
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
      
      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" href="/profile">
          Back to Profile
        </Button>
      </Box>
    </Container>
  );
};

export default DateDebug;