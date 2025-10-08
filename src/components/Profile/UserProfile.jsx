import React, { useState, useEffect, useRef } from 'react';
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
  Fab
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
  AttachMoney as PriceIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import { useUserSafe } from '../../hooks/useClerkSafe';
import { useLocation } from 'react-router-dom';
import { getProfileByClerk } from '../../services/profileService';
import { getUserBookings, getPackageById } from '../../services/bookingService';
import AddPackage from './AddPackage';
import travelImage from '../../assets/travel.jpg';

// Background component with subtle image and dark overlay
const Background = styled(Box)(({ theme }) => ({
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  }
}));

// Compact card with subtle shadow
const CompactCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 3px 15px rgba(0, 0, 0, 0.12)',
  }
}));

// Small avatar with subtle border
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: '1px solid #e0e0e0',
  backgroundColor: '#f5f5f5',
}));

// Compact button with clean design
const CompactButton = styled(Button)(({ theme }) => ({
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '0.875rem',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  backgroundColor: '#f5f5f5',
  color: '#333',
  border: '1px solid #e0e0e0',
  minHeight: '32px',
  '&:hover': {
    backgroundColor: '#e0e0e0',
    transform: 'translateY(-1px)',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
  }
}));

// Active button with primary color
const ActiveButton = styled(Button)(({ theme }) => ({
  borderRadius: '6px',
  padding: '6px 12px',
  fontSize: '0.875rem',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  backgroundColor: '#1976d2',
  color: 'white',
  minHeight: '32px',
  '&:hover': {
    backgroundColor: '#1565c0',
    transform: 'translateY(-1px)',
    boxShadow: '0 1px 6px rgba(25, 118, 210, 0.2)',
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
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef(null);

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

  // Smooth scroll to top when tab changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [tabValue]);

  // Handle scroll events for scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setShowScrollTop(containerRef.current.scrollTop > 300);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

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

  const getStatusVariant = (status) => {
    switch (status) {
      case 'confirmed':
        return 'outlined';
      case 'pending':
        return 'outlined';
      case 'cancelled':
        return 'outlined';
      default:
        return 'outlined';
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
        <Background />
        <Container maxWidth="md" sx={{ py: 3, position: 'relative', zIndex: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress size={32} sx={{ color: 'white' }} />
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'white', 
                ml: 1.5,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
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
        <Background />
        <Container maxWidth="md" sx={{ py: 3, position: 'relative', zIndex: 3 }}>
          <Fade in={true}>
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                maxWidth: 500,
                mx: 'auto',
                borderRadius: 1.5,
                boxShadow: 1
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Please log in to view your profile
              </Typography>
              <Typography variant="body2">
                You will be redirected to the login page.
              </Typography>
            </Alert>
          </Fade>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Zoom in={true}>
              <ActiveButton 
                variant="contained" 
                href="/login"
                size="small"
              >
                Go to Login
              </ActiveButton>
            </Zoom>
          </Box>
        </Container>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Background />
        <Container maxWidth="md" sx={{ py: 3, position: 'relative', zIndex: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress size={32} sx={{ color: 'white' }} />
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'white', 
                ml: 1.5,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              Loading profile data...
            </Typography>
          </Box>
        </Container>
      </>
    );
  }

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Background />
      <Container 
        maxWidth="md" 
        sx={{ 
          py: 6, 
          position: 'relative', 
          zIndex: 3, 
          minHeight: '100vh',
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'thin',
          scrollbarColor: '#1976d2 rgba(255, 255, 255, 0.1)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#1976d2',
            borderRadius: '4px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
          },
        }} 
        ref={containerRef}
      >
        {/* Success Alert for New Bookings */}
        <Fade in={showBookingSuccess}>
          <Box sx={{ mb: 3 }}>
            {showBookingSuccess && (
              <Alert 
                severity="success" 
                onClose={() => setShowBookingSuccess(false)}
                sx={{ 
                  mb: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: 1.5,
                  boxShadow: 2,
                  border: '1px solid #4caf50',
                  py: 1,
                  px: 1.5
                }}
              >
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: '500' }}>
                  Booking Confirmed Successfully!
                </Typography>
                <Typography variant="body2">
                  {location.state?.message || 'Your booking has been confirmed.'}
                </Typography>
              </Alert>
            )}
          </Box>
        </Fade>

        {/* Profile Header */}
        <Zoom in={true}>
          <CompactCard sx={{ mb: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <SmallAvatar
                  src={user.imageUrl}
                >
                  <PersonIcon sx={{ fontSize: 32 }} />
                </SmallAvatar>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{
                      fontWeight: '600',
                      color: '#333',
                      mb: 0.5,
                      fontSize: '1.25rem'
                    }}
                  >
                    {user.fullName || user.emailAddresses[0].emailAddress}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {user.emailAddresses[0].emailAddress}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      label={`Member since ${new Date(user.createdAt).getFullYear()}`} 
                      size="small"
                      sx={{ 
                        backgroundColor: '#f5f5f5',
                        color: '#666',
                        fontWeight: '500',
                        borderRadius: '4px',
                        height: '20px'
                      }} 
                    />
                    <Chip 
                      icon={<StarIcon sx={{ color: '#ffb300 !important', fontSize: '14px !important' }} />} 
                      label={`${bookings.length} Trips`} 
                      size="small"
                      sx={{ 
                        backgroundColor: '#f5f5f5',
                        color: '#666',
                        fontWeight: '500',
                        borderRadius: '4px',
                        height: '20px'
                      }} 
                    />
                  </Box>
                </Box>
                <Box>
                  <CompactButton
                    variant="outlined"
                    startIcon={<RefreshIcon sx={{ fontSize: '16px !important' }} />}
                    onClick={fetchUserProfile}
                    disabled={loading}
                    size="small"
                  >
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </CompactButton>
                </Box>
              </Box>
            </CardContent>
          </CompactCard>
        </Zoom>

        {/* Tabs */}
        <CompactCard>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  py: 1.5,
                  px: 1,
                  color: '#666',
                  textTransform: 'none',
                  minHeight: '40px'
                },
                '& .Mui-selected': {
                  color: '#1976d2'
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#1976d2',
                  height: '2px'
                }
              }}
            >
              <Tab
                icon={<BookmarkIcon sx={{ fontSize: '16px !important' }} />}
                label="My Bookings"
                iconPosition="start"
              />
              <Tab
                icon={<AddIcon sx={{ fontSize: '16px !important' }} />}
                label="Add Package"
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* My Bookings Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: '600', color: '#333', fontSize: '1.125rem' }}>
                My Bookings ({bookings.length})
              </Typography>
            </Box>
            {bookings.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Zoom in={true}>
                  <Box sx={{ mb: 2 }}>
                    <BookmarkIcon sx={{ fontSize: 40, color: '#bdbdbd', mb: 1 }} />
                  </Box>
                </Zoom>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: '500', color: '#333', mb: 1 }}>
                  No bookings yet
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                  Start exploring our amazing travel packages!
                </Typography>
                <Zoom in={true} style={{ transitionDelay: '150ms' }}>
                  <ActiveButton
                    variant="contained"
                    size="small"
                    href="/"
                  >
                    Browse Hotels
                  </ActiveButton>
                </Zoom>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {bookings.map((booking, index) => {
                  // Use the package data directly from the booking if available through the backend
                  // Otherwise fall back to the bookingDetails state
                  const packageData = booking.package || bookingDetails[booking.id];
                  const isPackageDataAvailable = packageData && 
                    packageData.name && 
                    !packageData.name.startsWith('Package #');
                  
                  return (
                    <Grid item xs={12} md={6} key={booking.id}>
                      <Zoom in={true} style={{ transitionDelay: `${index * 80}ms` }}>
                        <CompactCard sx={{ height: '100%' }}>
                          <CardContent sx={{ p: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: '600', color: '#333', mb: 0.5, fontSize: '0.95rem' }}>
                                  {isPackageDataAvailable ? packageData.name : `Package #${booking.packageId}`}
                                </Typography>
                                {isPackageDataAvailable && (
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocationIcon sx={{ fontSize: 14, mr: 0.5, color: '#757575' }} />
                                    <Typography variant="caption" color="text.secondary">
                                      {packageData.location || 'Location not available'}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                              <Chip
                                label={booking.status}
                                color={getStatusColor(booking.status)}
                                variant={getStatusVariant(booking.status)}
                                size="small"
                                sx={{
                                  fontWeight: '500',
                                  borderRadius: '3px',
                                  height: '20px',
                                  fontSize: '0.65rem'
                                }}
                              />
                            </Box>
                            
                            {isPackageDataAvailable ? (
                              <>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                  <CalendarIcon sx={{ fontSize: 14, mr: 0.5, color: '#757575' }} />
                                  <Typography variant="caption" color="text.secondary">
                                    {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'} - 
                                    {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
                                  </Typography>
                                </Box>
                                
                                <Divider sx={{ my: 1.5 }} />
                                
                                <Grid container spacing={1.5}>
                                  <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.25, display: 'block' }}>
                                      Guests
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: '500', color: '#333' }}>
                                      {booking.guests || 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.25, display: 'block' }}>
                                      Duration
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: '500', color: '#333' }}>
                                      {packageData.duration ? `${packageData.duration} days` : 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.25, display: 'block' }}>
                                      Total Price
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: '600', color: '#1976d2' }}>
                                      ₹{booking.totalPrice?.toLocaleString() || ((packageData.price || 0) * (booking.guests || 1)).toLocaleString() || 'N/A'}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              <Box sx={{ py: 1 }}>
                                <Alert 
                                  severity="info" 
                                  sx={{ 
                                    mb: 1.5,
                                    backgroundColor: '#e3f2fd',
                                    borderRadius: 1,
                                    py: 0.5,
                                    px: 1
                                  }}
                                >
                                  <Typography variant="caption">
                                    Package details unavailable.
                                  </Typography>
                                </Alert>
                                
                                <Grid container spacing={1.5}>
                                  <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.25, display: 'block' }}>
                                      Booking Dates
                                    </Typography>
                                    <Typography variant="body2">
                                      {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'} - 
                                      {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.25, display: 'block' }}>
                                      Guests
                                    </Typography>
                                    <Typography variant="body2">
                                      {booking.guests || 'N/A'}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.25, display: 'block' }}>
                                      Total Price
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#1976d2' }}>
                                      ₹{booking.totalPrice?.toLocaleString() || 'N/A'}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            )}
                            
                            <Box sx={{ mt: 2, display: 'flex', gap: 0.75, justifyContent: 'flex-end' }}>
                              <CompactButton
                                variant="outlined"
                                size="small"
                                href={`/packages/${booking.packageId}`}
                                sx={{ p: '4px 8px', fontSize: '0.75rem' }}
                              >
                                View
                              </CompactButton>
                              {booking.status === 'confirmed' && (
                                <ActiveButton
                                  variant="contained"
                                  size="small"
                                  color="success"
                                  sx={{ p: '4px 8px', fontSize: '0.75rem' }}
                                >
                                  Voucher
                                </ActiveButton>
                              )}
                            </Box>
                          </CardContent>
                        </CompactCard>
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
        </CompactCard>
      </Container>
      
      {/* Scroll to Top Button */}
      <Fade in={showScrollTop}>
        <Fab
          color="primary"
          size="small"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            backgroundColor: 'rgba(25, 118, 210, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(21, 101, 192, 0.9)',
            }
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Fade>
    </>
  );
};

export default UserProfile;