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
  Alert,
  Fade,
  Zoom
} from '@mui/material';
import {
  Person as PersonIcon,
  BookmarkBorder as BookmarkIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useUserSafe } from '../../hooks/useClerkSafe';
import { useLocation } from 'react-router-dom';
import { getProfileByClerk } from '../../services/profileService';
import { getUserBookings, getPackageById } from '../../services/bookingService';
import AddPackage from './AddPackage';
import travelImage from '../../assets/travel.jpg';

// Background component with image and gradient overlay
const Background = ({ children }) => (
  <>
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${travelImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        zIndex: 0,
      }}
    />
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1,
      }}
    />
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
      }}
    >
      {children}
    </Box>
  </>
);

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
      console.log('🔄 Fetching profile for Clerk user:', user.id);
      
      // Get user profile
      const profileData = await getProfileByClerk(user.id);
      console.log('✅ Fetched profile data:', profileData);
      setProfile(profileData);

      // Get user bookings from profile data (now includes package info)
      const userBookings = profileData.bookings || [];
      console.log('✅ Fetched user bookings:', userBookings);
      setBookings(Array.isArray(userBookings) ? userBookings : []);

      // Extract package details from bookings (now included in booking data)
      if (Array.isArray(userBookings) && userBookings.length > 0) {
        const packageDetailsMap = {};
        userBookings.forEach(booking => {
          // Use the package data directly from the booking if available
          if (booking.package) {
            packageDetailsMap[booking.id] = booking.package;
          } else {
            // Fallback data if package info is missing
            packageDetailsMap[booking.id] = {
              id: booking.packageId,
              name: `Package #${booking.packageId}`,
              location: booking.location || 'Location not available',
              price: booking.totalPrice || booking.price || 0,
              duration: booking.duration || 0,
              image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
            };
          }
        });
        console.log('✅ Package details map:', packageDetailsMap);
        setBookingDetails(packageDetailsMap);
      }
    } catch (error) {
      console.error('❌ Failed to fetch user profile:', error);
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
      <Background>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              color: 'white', 
              mt: 4,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Loading authentication...
          </Typography>
        </Container>
      </Background>
    );
  }

  if (!user) {
    return (
      <Background>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert 
            severity="warning" 
            sx={{ 
              mb: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Please log in to view your profile
            </Typography>
            <Typography>
              You will be redirected to the login page.
            </Typography>
          </Alert>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              href="/login"
              size="large"
              sx={{ 
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Go to Login
            </Button>
          </Box>
        </Container>
      </Background>
    );
  }

  if (loading) {
    return (
      <Background>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              color: 'white', 
              mt: 4,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Loading profile data...
          </Typography>
        </Container>
      </Background>
    );
  }

  return (
    <Background>
      <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh' }}>
        {/* Success Alert for New Bookings */}
        <Fade in={showBookingSuccess}>
          <Box sx={{ mb: 3 }}>
            {showBookingSuccess && (
              <Alert 
                severity="success" 
                onClose={() => setShowBookingSuccess(false)}
                sx={{ 
                  mb: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Booking Confirmed Successfully!
                </Typography>
                <Typography>
                  {location.state?.message || 'Your booking has been confirmed. You can view all your bookings below.'}
                </Typography>
              </Alert>
            )}
          </Box>
        </Fade>

        {/* Profile Header */}
        <Zoom in={true}>
          <Card 
            sx={{ 
              mb: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 3,
              boxShadow: 6,
              '&:hover': {
                boxShadow: 12,
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  src={user.imageUrl}
                  sx={{ 
                    width: 100, 
                    height: 100,
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: 3
                  }}
                >
                  <PersonIcon sx={{ fontSize: 50 }} />
                </Avatar>
                <Box>
                  <Typography 
                    variant="h3" 
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {user.fullName || user.emailAddresses[0].emailAddress}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    {user.emailAddresses[0].emailAddress}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Zoom>

        {/* Tabs */}
        <Card 
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 3,
            boxShadow: 6
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  py: 2
                },
                '& .Mui-selected': {
                  color: 'primary.main'
                }
              }}
            >
              <Tab
                icon={<BookmarkIcon />}
                label="My Bookings"
                iconPosition="start"
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(33, 150, 243, 0.1)'
                  }
                }}
              />
              <Tab
                icon={<AddIcon />}
                label="Add Package"
                iconPosition="start"
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(33, 150, 243, 0.1)'
                  }
                }}
              />
            </Tabs>
          </Box>

          {/* My Bookings Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                My Bookings ({bookings.length})
              </Typography>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={fetchUserProfile}
                disabled={loading}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                    backgroundColor: 'primary.dark'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </Button>
            </Box>
            {bookings.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Zoom in={true}>
                  <BookmarkIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
                </Zoom>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                  No bookings yet
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                  Start exploring our amazing travel packages!
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  href="/"
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                      backgroundColor: 'primary.dark'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Browse Hotels
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {bookings.map((booking, index) => {
                  // Use the package data directly from the booking if available through the backend
                  // Otherwise fall back to the bookingDetails state
                  const packageData = booking.package || bookingDetails[booking.id];
                  const isPackageDataAvailable = packageData && 
                    packageData.name && 
                    !packageData.name.startsWith('Package #');
                  
                  return (
                    <Grid item xs={12} md={6} key={booking.id}>
                      <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                        <Card 
                          sx={{ 
                            height: '100%',
                            borderRadius: 3,
                            boxShadow: 3,
                            '&:hover': {
                              boxShadow: 8,
                              transform: 'translateY(-4px)',
                              transition: 'all 0.3s ease'
                            }
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {isPackageDataAvailable ? packageData.name : `Package #${booking.packageId}`}
                              </Typography>
                              <Chip
                                label={booking.status}
                                color={getStatusColor(booking.status)}
                                size="small"
                                sx={{
                                  fontWeight: 'bold',
                                  boxShadow: 1
                                }}
                              />
                            </Box>
                            
                            {isPackageDataAvailable ? (
                              <>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <LocationIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {packageData.location || 'Location not available'}
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <CalendarIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'} - 
                                    {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
                                  </Typography>
                                </Box>
                                
                                <Divider sx={{ my: 2 }} />
                                
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Guests
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                      {booking.guests || 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Duration
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                      {packageData.duration ? `${packageData.duration} days` : 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Total Price
                                    </Typography>
                                    <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                                      ₹{booking.totalPrice?.toLocaleString() || ((packageData.price || 0) * (booking.guests || 1)).toLocaleString() || 'N/A'}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              <Box sx={{ py: 2 }}>
                                <Alert severity="info" sx={{ mb: 2 }}>
                                  <Typography variant="body2">
                                    Package details are currently unavailable. This might be because the package was removed or there was a connection issue.
                                  </Typography>
                                </Alert>
                                
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Booking Dates
                                    </Typography>
                                    <Typography variant="body1">
                                      {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'} - 
                                      {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      Guests
                                    </Typography>
                                    <Typography variant="body1">
                                      {booking.guests || 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="body2" color="text.secondary">
                                      Total Price
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                      ₹{booking.totalPrice?.toLocaleString() || 'N/A'}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            )}
                            
                            <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                              <Button
                                variant="outlined"
                                size="small"
                                href={`/packages/${booking.packageId}`}
                                sx={{
                                  borderRadius: 2,
                                  '&:hover': {
                                    transform: 'translateY(-1px)',
                                    boxShadow: 2
                                  },
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                View Package
                              </Button>
                              {booking.status === 'confirmed' && (
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="success"
                                  sx={{
                                    borderRadius: 2,
                                    '&:hover': {
                                      transform: 'translateY(-1px)',
                                      boxShadow: 4
                                    },
                                    transition: 'all 0.2s ease'
                                  }}
                                >
                                  Download Voucher
                                </Button>
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                      </Zoom>
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
    </Background>
  );
};

export default UserProfile;