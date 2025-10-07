import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  styled,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  History as HistoryIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { getProfile, getProfileByClerk } from '../../services/profileService';
import { useUser } from '@clerk/clerk-react';
import { getImagePath, IMAGES } from '../../utils/imagePaths';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  ...(status === 'upcoming' && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
  ...(status === 'past' && {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.secondary,
  }),
  ...(status === 'cancelled' && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  }),
}));

const statusFromDates = (startDate, endDate) => {
  const now = new Date();
  if (new Date(endDate) < now) return 'past';
  return 'upcoming';
};

const Bookings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();
  const { user: clerkUser, isSignedIn } = useUser();

  useEffect(() => {
    const load = async () => {
      if (!isSignedIn) return;
      // Prefer Clerk profile
      const profile = clerkUser ? await getProfileByClerk(clerkUser.id) : (user ? await getProfile(user.id) : { bookings: [] });
      // Map server data to UI format
      const mapped = profile.bookings.map((b, idx) => ({
        id: b.id,
        packageName: `Package #${b.packageId}`,
        location: '',
        startDate: b.startDate,
        endDate: b.endDate,
        status: b.status || statusFromDates(b.startDate, b.endDate),
        price: b.totalPrice || 0,
        guests: b.guests,
        bookingNumber: `BK${String(b.id).padStart(4, '0')}`,
        image: getImagePath(IMAGES.travel),
      }));
      setBookings(mapped);
    };
    load();
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleRescheduleOpen = (booking) => {
    setSelectedBooking(booking);
    setOpenReschedule(true);
  };

  const handleCancelOpen = (booking) => {
    setSelectedBooking(booking);
    setOpenCancel(true);
  };

  const handleInvoiceOpen = (booking) => {
    setSelectedBooking(booking);
    setOpenInvoice(true);
  };

  const handleDownloadInvoice = () => {
    // Implement invoice download logic
    console.log('Downloading invoice for booking:', selectedBooking.bookingNumber);
    setOpenInvoice(false);
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 0) return booking.status === 'upcoming';
    if (activeTab === 1) return booking.status === 'past';
    return true;
  });

  const renderBookingCard = (booking) => (
    <Grid item xs={12} md={6} key={booking.id}>
      <StyledCard>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="h3">
                {booking.packageName}
              </Typography>
              <StatusChip
                label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                status={booking.status}
              />
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationIcon color="primary" fontSize="small" />
                <Typography variant="body2">{booking.location}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarIcon color="primary" fontSize="small" />
                <Typography variant="body2">
                  {format(new Date(booking.startDate), 'MMM d, yyyy')} - 
                  {format(new Date(booking.endDate), 'MMM d, yyyy')}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <TimeIcon color="primary" fontSize="small" />
                <Typography variant="body2">
                  {Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))} days
                </Typography>
              </Stack>
            </Stack>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Booking Number: {booking.bookingNumber}
              </Typography>
              <Typography variant="h6" color="primary.main">
                ${booking.price} <Typography component="span" variant="body2">/ {booking.guests} guests</Typography>
              </Typography>
            </Box>

            {booking.status === 'upcoming' && (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleRescheduleOpen(booking)}
                >
                  Reschedule
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => handleCancelOpen(booking)}
                >
                  Cancel
                </Button>
              </Stack>
            )}

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<ReceiptIcon />}
                onClick={() => handleInvoiceOpen(booking)}
                fullWidth
              >
                View Details
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </StyledCard>
    </Grid>
  );

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ 
            mb: 6, 
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          My Bookings
        </Typography>

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab 
              icon={<CheckCircleIcon />} 
              label="Upcoming Bookings" 
              iconPosition="start"
            />
            <Tab 
              icon={<HistoryIcon />} 
              label="Past Bookings" 
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        <Grid container spacing={4}>
          {filteredBookings.map(renderBookingCard)}
        </Grid>

        {/* Reschedule Dialog */}
        <Dialog open={openReschedule} onClose={() => setOpenReschedule(false)}>
          <DialogTitle>Reschedule Booking</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                label="New Start Date"
                type="date"
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="New End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenReschedule(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpenReschedule(false)}>
              Confirm Reschedule
            </Button>
          </DialogActions>
        </Dialog>

        {/* Cancel Dialog */}
        <Dialog open={openCancel} onClose={() => setOpenCancel(false)}>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogContent>
            <Typography sx={{ pt: 2 }}>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCancel(false)}>No, Keep Booking</Button>
            <Button variant="contained" color="error" onClick={() => setOpenCancel(false)}>
              Yes, Cancel Booking
            </Button>
          </DialogActions>
        </Dialog>

        {/* Invoice/Details Dialog */}
        <Dialog 
          open={openInvoice} 
          onClose={() => setOpenInvoice(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              Booking Details
              {selectedBooking && (
                <Tooltip title="Download Invoice">
                  <IconButton onClick={handleDownloadInvoice} color="primary">
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </DialogTitle>
          <DialogContent>
            {selectedBooking && (
              <Box sx={{ pt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      {selectedBooking.packageName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Booking Number: {selectedBooking.bookingNumber}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Travel Dates
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {format(new Date(selectedBooking.startDate), 'MMM d, yyyy')} - 
                      {format(new Date(selectedBooking.endDate), 'MMM d, yyyy')}
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom>
                      Location
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {selectedBooking.location}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Number of Guests
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {selectedBooking.guests} persons
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom>
                      Total Price
                    </Typography>
                    <Typography variant="h6" color="primary.main" paragraph>
                      ${selectedBooking.price}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Status
                    </Typography>
                    <StatusChip
                      label={selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                      status={selectedBooking.status}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenInvoice(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Bookings; 