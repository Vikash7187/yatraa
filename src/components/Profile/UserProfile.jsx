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
  Zoom,
  CircularProgress,
  styled,
  keyframes
} from '@mui/material';
import {
  Person as PersonIcon,
  BookmarkBorder as BookmarkIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Refresh as RefreshIcon,
  FlightTakeoff as FlightIcon,
  Hotel as HotelIcon,
  LocalActivity as ActivityIcon,
  Star as StarIcon,
  AttachMoney as PriceIcon
} from '@mui/icons-material';
import { useUserSafe } from '../../hooks/useClerkSafe';
import { useLocation } from 'react-router-dom';
import { getProfileByClerk } from '../../services/profileService';
import { getUserBookings, getPackageById } from '../../services/bookingService';
import AddPackage from './AddPackage';
import travelImage from '../../assets/travel.jpg';

// Custom animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const AnimatedBackground = styled(Box)(({ theme }) => ({
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
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 100%)',
    backdropFilter: 'blur(3px)',
  }
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
    background: 'rgba(255, 255, 255, 0.25)',
  }
}));

const InteractiveAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: '4px solid transparent',
  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
  padding: '4px',
  animation: `${float} 3s ease-in-out infinite`,
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-5px',
    left: '-5px',
    right: '-5px',
    bottom: '-5px',
    background: 'linear-gradient(45deg, #2196F3, #21CBF3, #FF4081, #FFD740)',
    borderRadius: '50%',
    zIndex: -1,
    animation: `${gradientShift} 3s ease-in-out infinite`,
    backgroundSize: '400% 400%',
  }
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '12px 24px',
  fontWeight: 'bold',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: '0.5s',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    '&::before': {
      left: '100%',
    }
  },
  '&:active': {
    transform: 'translateY(-1px)',
  }
}));

const BookingCard = styled(GlassCard)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
  },
  '&:hover': {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 203, 243, 0.1))',
      pointerEvents: 'none',
    }
  }
}));

const StatCard = styled(GlassCard)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  animation: `${pulse} 2s ease-in-out infinite`,
  '&:hover': {
    animation: 'none',
  }
}));

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
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalSpent: 0,
    favoriteDestinations: 0
  });

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

      // Calculate stats
      const totalSpent = userBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
      const destinations = [...new Set(userBookings.map(booking => 
        booking.package?.location || 'Unknown'
      ))].filter(loc => loc !== 'Unknown');
      
      setStats({
        totalBookings: userBookings.length,
        totalSpent,
        favoriteDestinations: destinations.length
      });

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FlightIcon />;
      case 'pending':
        return <HotelIcon />;
      case 'cancelled':
        return <ActivityIcon />;
      default:
        return <BookmarkIcon />;
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
      <>
        <AnimatedBackground />
        <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress size={60} sx={{ color: 'white' }} />
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                ml: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Loading authentication...
            </Typography>
          </Box>
        </Container>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <AnimatedBackground />
        <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 3 }}>
          <Fade in={true}>
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                maxWidth: 600,
                mx: 'auto',
                borderRadius: 3,
                boxShadow: 3
              }}
            >
              <Typography variant="h6" gutterBottom>
                Please log in to view your profile
              </Typography>
              <Typography>
                You will be redirected to the login page.
              </Typography>
            </Alert>
          </Fade>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Zoom in={true}>
              <AnimatedButton 
                variant="contained" 
                color="primary" 
                href="/login"
                size="large"
                sx={{ 
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2, #03A9F4)',
                  }
                }}
              >
                Go to Login
              </AnimatedButton>
            </Zoom>
          </Box>
        </Container>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <AnimatedBackground />
        <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress size={60} sx={{ color: 'white' }} />
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                ml: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Loading profile data...
            </Typography>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 3, minHeight: '100vh' }}>
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
                  borderRadius: 3,
                  boxShadow: 6,
                  border: '1px solid rgba(0, 255, 0, 0.3)'
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Booking Confirmed Successfully! 🎉
                </Typography>
                <Typography>
                  {location.state?.message || 'Your booking has been confirmed. You can view all your bookings below.'}
                </Typography>
              </Alert>
            )}
          </Box>
        </Fade>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <StatCard>
              <FlightIcon sx={{ fontSize: 40, color: '#2196F3', mb: 1 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
                {stats.totalBookings}
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Total Bookings
              </Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard>
              <PriceIcon sx={{ fontSize: 40, color: '#4CAF50', mb: 1 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
                ₹{stats.totalSpent.toLocaleString()}
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Total Spent
              </Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard>
              <LocationIcon sx={{ fontSize: 40, color: '#FF9800', mb: 1 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
                {stats.favoriteDestinations}
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Destinations
              </Typography>
            </StatCard>
          </Grid>
        </Grid>

        {/* Profile Header */}
        <Zoom in={true}>
          <GlassCard sx={{ mb: 4, borderRadius: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                <InteractiveAvatar
                  src={user.imageUrl}
                >
                  <PersonIcon sx={{ fontSize: 60, color: 'white' }} />
                </InteractiveAvatar>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h2" 
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #2196F3, #21CBF3, #FF4081)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      backgroundSize: '300% 300%',
                      animation: `${gradientShift} 4s ease infinite`,
                      mb: 1
                    }}
                  >
                    {user.fullName || user.emailAddresses[0].emailAddress}
                  </Typography>
                  <Typography variant="h5" color="rgba(255, 255, 255, 0.9)" sx={{ mb: 1 }}>
                    {user.emailAddresses[0].emailAddress}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      label={`Member since ${new Date(user.createdAt).getFullYear()}`} 
                      sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 'bold'
                      }} 
                    />
                    <Chip 
                      icon={<StarIcon sx={{ color: '#FFD740 !important' }} />} 
                      label={`${stats.totalBookings} Trips`} 
                      sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 'bold'
                      }} 
                    />
                  </Box>
                </Box>
                <Box>
                  <AnimatedButton
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={fetchUserProfile}
                    disabled={loading}
                    sx={{
                      background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2, #03A9F4)',
                      }
                    }}
                  >
                    {loading ? 'Refreshing...' : 'Refresh Data'}
                  </AnimatedButton>
                </Box>
              </Box>
            </CardContent>
          </GlassCard>
        </Zoom>

        {/* Tabs */}
        <GlassCard sx={{ borderRadius: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  py: 3,
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'none'
                },
                '& .Mui-selected': {
                  color: 'white'
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#2196F3',
                  height: '4px'
                }
              }}
            >
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', color: 'white' }}>
                My Bookings ({bookings.length})
              </Typography>
            </Box>
            {bookings.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Zoom in={true}>
                  <Box sx={{ mb: 4 }}>
                    <BookmarkIcon sx={{ fontSize: 100, color: 'rgba(255, 255, 255, 0.3)', mb: 3 }} />
                  </Box>
                </Zoom>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
                  No bookings yet
                </Typography>
                <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
                  Start exploring our amazing travel packages!
                </Typography>
                <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                  <AnimatedButton
                    variant="contained"
                    size="large"
                    href="/"
                    sx={{
                      py: 2,
                      px: 6,
                      fontSize: '1.2rem',
                      background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2, #03A9F4)',
                      }
                    }}
                  >
                    Browse Hotels
                  </AnimatedButton>
                </Zoom>
              </Box>
            ) : (
              <Grid container spacing={4}>
                {bookings.map((booking, index) => {
                  // Use the package data directly from the booking if available through the backend
                  // Otherwise fall back to the bookingDetails state
                  const packageData = booking.package || bookingDetails[booking.id];
                  const isPackageDataAvailable = packageData && 
                    packageData.name && 
                    !packageData.name.startsWith('Package #');
                  
                  return (
                    <Grid item xs={12} md={6} key={booking.id}>
                      <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                        <BookingCard>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                              <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
                                  {isPackageDataAvailable ? packageData.name : `Package #${booking.packageId}`}
                                </Typography>
                                {isPackageDataAvailable && (
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocationIcon sx={{ fontSize: 18, mr: 1, color: '#FF9800' }} />
                                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                      {packageData.location || 'Location not available'}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                              <Chip
                                icon={getStatusIcon(booking.status)}
                                label={booking.status}
                                color={getStatusColor(booking.status)}
                                size="small"
                                sx={{
                                  fontWeight: 'bold',
                                  boxShadow: 2,
                                  minWidth: 100
                                }}
                              />
                            </Box>
                            
                            {isPackageDataAvailable ? (
                              <>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <CalendarIcon sx={{ fontSize: 18, mr: 1, color: '#4CAF50' }} />
                                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                    {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'} - 
                                    {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
                                  </Typography>
                                </Box>
                                
                                <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                                
                                <Grid container spacing={3}>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 1 }}>
                                      <HotelIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                                      Guests
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                      {booking.guests || 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 1 }}>
                                      <FlightIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                                      Duration
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                      {packageData.duration ? `${packageData.duration} days` : 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 1 }}>
                                      <PriceIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                                      Total Price
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                                      ₹{booking.totalPrice?.toLocaleString() || ((packageData.price || 0) * (booking.guests || 1)).toLocaleString() || 'N/A'}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              <Box sx={{ py: 2 }}>
                                <Alert 
                                  severity="info" 
                                  sx={{ 
                                    mb: 3,
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                    color: 'white',
                                    borderRadius: 2
                                  }}
                                >
                                  <Typography variant="body2">
                                    Package details are currently unavailable. This might be because the package was removed or there was a connection issue.
                                  </Typography>
                                </Alert>
                                
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 1 }}>
                                      Booking Dates
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'white' }}>
                                      {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'} - 
                                      {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 1 }}>
                                      Guests
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'white' }}>
                                      {booking.guests || 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 1 }}>
                                      Total Price
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                                      ₹{booking.totalPrice?.toLocaleString() || 'N/A'}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            )}
                            
                            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                              <AnimatedButton
                                variant="outlined"
                                size="medium"
                                href={`/packages/${booking.packageId}`}
                                sx={{
                                  borderColor: 'rgba(255, 255, 255, 0.3)',
                                  color: 'white',
                                  '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.6)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                  }
                                }}
                              >
                                View Details
                              </AnimatedButton>
                              {booking.status === 'confirmed' && (
                                <AnimatedButton
                                  variant="contained"
                                  size="medium"
                                  color="success"
                                  sx={{
                                    background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
                                    '&:hover': {
                                      background: 'linear-gradient(45deg, #388E3C, #689F38)',
                                    }
                                  }}
                                >
                                  Download Voucher
                                </AnimatedButton>
                              )}
                            </Box>
                          </CardContent>
                        </BookingCard>
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
        </GlassCard>
      </Container>
    </>
  );
};

export default UserProfile;