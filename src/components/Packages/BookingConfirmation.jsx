import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation = ({ open, onClose, bookingDetails, packageData }) => {
  const navigate = useNavigate();

  const handleViewBookings = () => {
    // Navigate to bookings page (to be implemented)
    navigate('/my-bookings');
    onClose();
  };

  if (!bookingDetails || !packageData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 0 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
          <Typography variant="h5">Booking Confirmed!</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {packageData.name}
          </Typography>
          
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Booking Reference
              </Typography>
              <Typography variant="body1">
                #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Guest Details
              </Typography>
              <Typography variant="body1">
                {bookingDetails.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bookingDetails.email} • {bookingDetails.phone}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Travel Details
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip label={`Date: ${bookingDetails.date}`} size="small" />
                <Chip label={`Guests: ${bookingDetails.guests}`} size="small" />
                <Chip label={`Duration: ${packageData.duration} days`} size="small" />
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Total Amount
              </Typography>
              <Typography variant="h6" color="primary">
                ${packageData.price * parseInt(bookingDetails.guests)}
              </Typography>
            </Box>

            {bookingDetails.message && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Special Requirements
                </Typography>
                <Typography variant="body2">
                  {bookingDetails.message}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleViewBookings}>
          View My Bookings
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingConfirmation; 