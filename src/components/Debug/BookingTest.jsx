import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { createBooking, getPackageById } from '../../services/bookingService';

const BookingTest = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [bookingData, setBookingData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    startDate: '2023-12-01',
    endDate: '2023-12-07',
    guests: 2
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Fetch available packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // For testing, we'll manually create package data
        const testPackages = [
          { id: 1, name: 'Taj Lake Palace Udaipur', price: 45000 },
          { id: 2, name: 'The Oberoi Mumbai', price: 35000 },
          { id: 3, name: 'ITC Grand Chola Chennai', price: 28000 },
          { id: 4, name: 'The Leela Palace New Delhi', price: 42000 }
        ];
        setPackages(testPackages);
        setSelectedPackage('1');
      } catch (err) {
        console.error('Failed to fetch packages:', err);
        setError('Failed to load packages');
      }
    };
    
    fetchPackages();
  }, []);

  const handleInputChange = (field) => (event) => {
    setBookingData({
      ...bookingData,
      [field]: event.target.value
    });
  };

  const handlePackageChange = (event) => {
    setSelectedPackage(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      console.log('📤 Submitting test booking:', {
        ...bookingData,
        packageId: parseInt(selectedPackage)
      });
      
      const response = await createBooking({
        ...bookingData,
        packageId: parseInt(selectedPackage),
        totalPrice: packages.find(p => p.id === parseInt(selectedPackage))?.price * bookingData.guests || 0
      });
      
      console.log('✅ Booking created:', response);
      setResult(response);
    } catch (err) {
      console.error('❌ Booking failed:', err);
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking Test Tool
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Test Booking Creation
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Select Package</InputLabel>
            <Select
              value={selectedPackage}
              onChange={handlePackageChange}
              label="Select Package"
            >
              {packages.map(pkg => (
                <MenuItem key={pkg.id} value={pkg.id.toString()}>
                  {pkg.id}. {pkg.name} (₹{pkg.price.toLocaleString()})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="First Name"
            value={bookingData.firstName}
            onChange={handleInputChange('firstName')}
            fullWidth
          />
          
          <TextField
            label="Last Name"
            value={bookingData.lastName}
            onChange={handleInputChange('lastName')}
            fullWidth
          />
          
          <TextField
            label="Email"
            value={bookingData.email}
            onChange={handleInputChange('email')}
            fullWidth
            type="email"
          />
          
          <TextField
            label="Phone"
            value={bookingData.phone}
            onChange={handleInputChange('phone')}
            fullWidth
          />
          
          <TextField
            label="Start Date"
            value={bookingData.startDate}
            onChange={handleInputChange('startDate')}
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            label="End Date"
            value={bookingData.endDate}
            onChange={handleInputChange('endDate')}
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            label="Guests"
            value={bookingData.guests}
            onChange={handleInputChange('guests')}
            fullWidth
            type="number"
            InputProps={{ inputProps: { min: 1, max: 10 } }}
          />
        </Box>
        
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Create Test Booking'}
        </Button>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography variant="h6">Error</Typography>
            <Typography variant="body2">{error}</Typography>
          </Alert>
        )}
        
        {result && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="h6">Booking Created Successfully!</Typography>
            <Typography variant="body2">Booking ID: {result.id}</Typography>
            <Typography variant="body2">Package ID: {result.packageId}</Typography>
            <Typography variant="body2">Status: {result.status}</Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: 10 }}>
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

export default BookingTest;