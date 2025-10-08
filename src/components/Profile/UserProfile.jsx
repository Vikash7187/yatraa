import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Tabs,
  Tab,
  Chip,
  Button,
  Divider,
  Alert
} from '@mui/material';
import {
  Person as PersonIcon,
  BookmarkBorder as BookmarkIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useUserSafe } from '../../hooks/useClerkSafe';
import { useLocation } from 'react-router-dom';
import { getProfileByClerk } from '../../services/profileService';
import { getUserBookings, getPackageById } from '../../services/bookingService';
import AddPackage from './AddPackage';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const UserProfile = () => {
  const { user, isLoaded, isSignedIn } = useUserSafe();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  // Check if user came from successful booking
  useEffect(() => {
    if (location.state?.bookingConfirmed) {
      setShowBookingSuccess(true);
      // Refresh bookings when user comes from successful booking
      if (isLoaded && user) {
        fetchUserProfile();
      }
      // Clear the state to prevent showing the message on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location, isLoaded, user]);

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserProfile();
    }
  }, [isLoaded, user]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      console.log('Fetching profile for Clerk user:', user.id); // Debug log
      // Get user profile
      const profileData = await getProfileByClerk(user.id);
      console.log('Fetched profile data:', profileData); // Debug log
      setProfile(profileData);

      // Get user bookings
      const userBookings = await getUserBookings(profileData.id);
      console.log('Fetched user bookings:', userBookings); // Debug log
      setBookings(Array.isArray(userBookings) ? userBookings : []);

      // Get package details for each booking
      if (Array.isArray(userBookings) && userBookings.length > 0) {
        const packageDetailsPromises = userBookings.map(async (booking) => {
          try {
            const packageData = await getPackageById(booking.packageId);
            return { [booking.id]: packageData };
          } catch (error) {
            console.error(`Failed to fetch package ${booking.packageId}:`, error);
            return { [booking.id]: null };
          }
        });

        const packageDetailsArray = await Promise.all(packageDetailsPromises);
        const packageDetailsMap = packageDetailsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setBookingDetails(packageDetailsMap);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Set empty arrays as fallback
      setBookings([]);
      setBookingDetails({});
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  console.log('UserProfile Debug:', {
    isLoaded,
    loading,
    user: user ? {
      id: user.id,
      fullName: user.fullName,
      email: user.emailAddresses?.[0]?.emailAddress,
      isSignedIn: !!user
    } : null,
    isSignedIn
  });

  if (!isLoaded) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading authentication...</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Please log in to view your profile. You will be redirected to the login page.
        </Alert>
        <Typography>Please log in to view your profile.</Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading profile data...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Success Alert for New Bookings */}
      {showBookingSuccess && (
        <Alert 
          severity="success" 
          onClose={() => setShowBookingSuccess(false)}
          sx={{ mb: 3 }}
        >
          <Typography variant="h6" gutterBottom>
            Booking Confirmed Successfully!
          </Typography>
          <Typography>
            {location.state?.message || 'Your booking has been confirmed. You can view all your bookings below.'}
          </Typography>
        </Alert>
      )}

      {/* Profile Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              src={user.imageUrl}
              sx={{ width: 80, height: 80 }}
            >
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                {user.fullName || user.emailAddresses[0].emailAddress}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.emailAddresses[0].emailAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab
              icon={<BookmarkIcon />}
              label="My Bookings"
              iconPosition="start"
            />
            <Tab
              icon={<AddIcon />}
              label="Add Package"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* My Bookings Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2">
              My Bookings ({bookings.length})
            </Typography>
            <Button
              variant="outlined"
              onClick={fetchUserProfile}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </Box>
          {bookings.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <BookmarkIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No bookings yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start exploring our amazing travel packages!
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                href="/"
              >
                Browse Hotels
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {bookings.map((booking) => {
                const packageData = bookingDetails[booking.id];
                return (
                  <Grid item xs={12} md={6} key={booking.id}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6">
                            {packageData?.name || 'Loading...'}
                          </Typography>
                          <Chip
                            label={booking.status}
                            color={getStatusColor(booking.status)}
                            size="small"
                          />
                        </Box>
                        
                        {packageData && (
                          <>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {packageData.location}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <CalendarIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                              </Typography>
                            </Box>
                            
                            <Divider sx={{ my: 2 }} />
                            
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Guests
                                </Typography>
                                <Typography variant="body1">
                                  {booking.guests}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Room Type
                                </Typography>
                                <Typography variant="body1">
                                  {booking.roomType}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">
                                  Total Price
                                </Typography>
                                <Typography variant="h6" color="primary">
                                  Rs.{(packageData.price * booking.guests).toLocaleString()}
                                </Typography>
                              </Grid>
                            </Grid>
                          </>
                        )}
                        
                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            href={`/packages/${booking.packageId}`}
                          >
                            View Package
                          </Button>
                          {booking.status === 'confirmed' && (
                            <Button
                              variant="contained"
                              size="small"
                              color="success"
                            >
                              Download Voucher
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </TabPanel>

        {/* Add Package Tab */}
        <TabPanel value={tabValue} index={1}>
          <AddPackage />
        </TabPanel>
      </Card>
    </Container>
  );
};

export default UserProfile;