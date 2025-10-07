import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Rating,
  Button,
  TextField,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import BookingConfirmation from './BookingConfirmation';
import { checkAvailability, getDynamicPrice } from '../../services/bookingService';
import { getPackageById } from '../../services/packageService';
import { format, addDays } from 'date-fns';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  height: '500px',
  width: '100%',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '60vh',
  width: '100%',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
}));

const HeroImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2,
  color: 'white',
  textAlign: 'center',
  width: '100%',
  padding: theme.spacing(2),
}));

const DetailCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const PriceHighlight = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(2, 4),
  borderRadius: theme.spacing(2),
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  borderRadius: '16px',
  fontWeight: 500,
  padding: theme.spacing(0.5, 1),
  '&.MuiChip-outlined': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));

const BookingForm = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

// Sample packages data matching Railway backend
const packagesData = [
  {
    id: 1,
    name: "Taj Lake Palace Udaipur",
    type: "Palace",
    location: "Udaipur, Rajasthan",
    price: 45000,
    duration: 3,
    rating: 4.9,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mealPlan: "All Inclusive",
    description: "Experience royal luxury in this floating palace on Lake Pichola, one of India's most iconic heritage hotels",
    highlights: [
      "Floating Palace Hotel",
      "Lake Pichola Views", 
      "Royal Heritage Experience",
      "Fine Dining",
      "Luxury Spa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Royal Arrival",
        description: "Airport pickup, boat transfer to palace, welcome ceremony with royal treatment"
      },
      {
        day: 2,
        title: "Palace Exploration", 
        description: "Heritage walk, spa treatments, sunset dinner by the lake"
      },
      {
        day: 3,
        title: "Cultural Experience",
        description: "Cultural show, city tour, departure with royal memories"
      }
    ],
    inclusions: [
      "5-star palace accommodation",
      "All meals included",
      "Airport transfers",
      "Guided heritage tours",
      "Spa session",
      "Cultural show"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance", 
      "Personal expenses",
      "Additional activities"
    ],
    amenities: ["Swimming Pool", "Spa", "Fine Dining", "Lake View"],
    category: "Palace",
    rooms: ["Luxury Room", "Royal Suite", "Grand Royal Suite"],
    activities: ["Heritage Walk", "Boat Ride", "Cultural Show"]
  },
  {
    id: 2,
    name: "The Oberoi Mumbai",
    type: "Luxury Business",
    location: "Mumbai, Maharashtra", 
    price: 35000,
    duration: 4,
    rating: 4.8,
    reviews: 287,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mealPlan: "Breakfast & Dinner",
    description: "Luxury business hotel in the heart of Mumbai with stunning views of the Arabian Sea",
    highlights: [
      "Arabian Sea Views",
      "Business Center",
      "Rooftop Pool", 
      "Award-winning Restaurants",
      "Luxury Spa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Mumbai Arrival",
        description: "Airport pickup, hotel check-in, welcome drink with city views"
      },
      {
        day: 2,
        title: "City Exploration",
        description: "Mumbai city tour, Gateway of India, Marine Drive, local markets"
      },
      {
        day: 3,
        title: "Bollywood Experience", 
        description: "Film City tour, Bollywood studio visit, traditional Indian dinner"
      },
      {
        day: 4,
        title: "Relaxation & Departure",
        description: "Spa treatments, pool time, shopping, departure transfer"
      }
    ],
    inclusions: [
      "Luxury hotel accommodation",
      "Daily breakfast and dinner",
      "Airport transfers",
      "City tours",
      "Bollywood studio visit", 
      "Spa session"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ],
    amenities: ["Infinity Pool", "Business Center", "Multiple Restaurants", "Spa & Fitness"],
    category: "Business Hotel",
    rooms: ["Deluxe Room", "Executive Suite", "Presidential Suite"],
    activities: ["City Tours", "Bollywood Experience", "Fine Dining"]
  }
];

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(null);
  const [dynamicPrice, setDynamicPrice] = useState(null);
  const [error, setError] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching package with ID:', id); // Debug log
        const data = await getPackageById(id);
        console.log('API returned package data:', data); // Debug log
        setPackageData(data);
      } catch (error) {
        console.error('Failed to fetch package:', error);
        console.log('Using fallback data for package ID:', id); // Debug log
        // Use fallback data if API fails
        const fallbackPackage = packagesData.find(pkg => pkg.id === parseInt(id));
        if (fallbackPackage) {
          console.log('Found fallback package:', fallbackPackage); // Debug log
          setPackageData(fallbackPackage);
        } else {
          console.log('No fallback package found for ID:', id); // Debug log
          setError('Package not found');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPackageData();
    } else {
      setError('No package ID provided');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const checkCurrentAvailability = async () => {
      if (!id || !packageData) return;
      
      try {
        const startDate = format(new Date(), 'yyyy-MM-dd');
        const duration = typeof packageData.duration === 'number' ? packageData.duration : parseInt(packageData.duration) || 7;
        const endDate = format(addDays(new Date(), duration), 'yyyy-MM-dd');
        
        const [availabilityData, priceData] = await Promise.all([
          checkAvailability(id, startDate, endDate, 1),
          getDynamicPrice(id, startDate, endDate, 1)
        ]);
        
        setAvailability(availabilityData);
        setDynamicPrice(priceData);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
        // Set default values if availability check fails
        setAvailability({ available: true, remainingSpots: 5, maxGuests: 10 });
        setDynamicPrice({ perPerson: packageData?.price || 0, total: packageData?.price || 0 });
      }
    };

    if (packageData) {
      checkCurrentAvailability();
    }
  }, [id, packageData]);

  const validateForm = () => {
    const errors = {};
    if (!bookingForm.name.trim()) errors.name = 'Name is required';
    if (!bookingForm.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(bookingForm.email)) errors.email = 'Email is invalid';
    if (!bookingForm.phone.trim()) errors.phone = 'Phone is required';
    if (!bookingForm.date) errors.date = 'Date is required';
    if (!bookingForm.guests) errors.guests = 'Number of guests is required';
    else if (parseInt(bookingForm.guests) < 1) errors.guests = 'At least 1 guest is required';
    return errors;
  };

  const handleBookingChange = (field) => (event) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      // Form is valid, show confirmation
      setShowConfirmation(true);
      
      // In a real app, you would also:
      // 1. Send booking data to backend API
      // 2. Handle payment processing
      // 3. Store booking in database
      console.log('Booking submitted:', bookingForm);
    } else {
      setFormErrors(errors);
    }
  };

  const handleBookingOpen = () => {
    if (!isSignedIn) {
      navigate('/login');
      return;
    }
    navigate(`/booking/${id}`);
  };

  const handleBookingClose = () => setOpenBooking(false);

  // Get today's date in YYYY-MM-DD format for min date in date picker
  const today = new Date().toISOString().split('T')[0];

  if (loading) {
    return (
      <Container>
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress size={50} />
          <Typography variant="h5" sx={{ mt: 2 }}>Loading package details...</Typography>
        </Box>
      </Container>
    );
  }

  if (error || !packageData) {
    return (
      <Container>
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {error || 'Package not found'}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {error === 'Package not found' 
              ? "The package you're looking for doesn't exist or has been removed."
              : 'There was an issue loading the package details. Please try again.'
            }
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <HeroSection>
        <HeroImage 
          src={packageData.image} 
          alt={packageData.name} 
          onError={(e) => {
            console.log('Hero image failed to load:', packageData.image);
            e.target.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80';
          }}
        />
        <HeroContent>
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {packageData.name}
            </Typography>
            <Stack 
              direction="row" 
              spacing={2} 
              justifyContent="center" 
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Chip
                icon={<LocationOnIcon />}
                label={packageData.location}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'text.primary',
                  fontWeight: 500,
                }}
              />
              <Chip
                icon={<AccessTimeIcon />}
                label={`${typeof packageData.duration === 'number' ? packageData.duration : parseInt(packageData.duration) || 0} days`}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'text.primary',
                  fontWeight: 500,
                }}
              />
              <Chip
                icon={<GroupIcon />}
                label={packageData.type || 'Package'}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'text.primary',
                  fontWeight: 500,
                }}
              />
            </Stack>
          </Container>
        </HeroContent>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mt: -8, mb: 8, position: 'relative', zIndex: 3 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <DetailCard>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Overview
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                {packageData.description}
              </Typography>

              <Box sx={{ my: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Package Highlights
                </Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1.5}>
                  {(packageData.highlights || []).map((highlight, index) => (
                    <FeatureChip
                      key={index}
                      label={highlight}
                      variant="outlined"
                      icon={<CheckCircleIcon />}
                    />
                  ))}
                </Stack>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Detailed Itinerary
              </Typography>
              {(packageData.itinerary || []).map((day, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Day {day.day}: {day.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {day.description}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 4 }} />

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Inclusions
                  </Typography>
                  <List>
                    {(packageData.inclusions || []).map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Exclusions
                  </Typography>
                  <List>
                    {(packageData.exclusions || []).map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CancelIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DetailCard>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <DetailCard>
              <PriceHighlight>
                <Typography variant="h4" component="span">
                  ${dynamicPrice?.perPerson || packageData.price}
                </Typography>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  / person
                </Typography>
                {dynamicPrice?.isDiscounted && (
                  <Tooltip title="Special seasonal price!">
                    <InfoIcon sx={{ ml: 1 }} />
                  </Tooltip>
                )}
              </PriceHighlight>

              {availability && (
                <Alert 
                  severity={availability.available ? "success" : "warning"}
                  sx={{ mb: 3 }}
                >
                  {availability.available 
                    ? `${availability.remainingSpots} spots available for immediate booking!`
                    : "Limited availability. Please check specific dates."}
                </Alert>
              )}

              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <Rating value={packageData.rating || 0} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({packageData.reviews || 0} reviews)
                </Typography>
              </Stack>

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleBookingOpen}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <EventIcon />}
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                }}
              >
                {loading ? 'Loading...' : (isSignedIn ? 'Book Now' : 'Login to Book')}
              </Button>

              {dynamicPrice?.breakdown && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Price breakdown:
                  </Typography>
                  {Object.entries(dynamicPrice.breakdown).map(([key, value]) => (
                    <Typography key={key} variant="body2" color="text.secondary">
                      {key}: ${value}
                    </Typography>
                  ))}
                </Box>
              )}
            </DetailCard>
          </Grid>
        </Grid>
      </Container>

      {/* Booking Dialog */}
      <Dialog 
        open={openBooking} 
        onClose={handleBookingClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Book Your Package
          </Typography>
        </DialogTitle>
        <DialogContent>
          <BookingForm>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Full Name"
                  fullWidth
                  value={bookingForm.name}
                  onChange={handleBookingChange('name')}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  value={bookingForm.email}
                  onChange={handleBookingChange('email')}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  required
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  value={bookingForm.phone}
                  onChange={handleBookingChange('phone')}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="date"
                  label="Travel Date"
                  type="date"
                  fullWidth
                  value={bookingForm.date}
                  onChange={handleBookingChange('date')}
                  error={!!formErrors.date}
                  helperText={formErrors.date}
                  required
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: today }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="guests"
                  label="Number of Guests"
                  type="number"
                  fullWidth
                  value={bookingForm.guests}
                  onChange={handleBookingChange('guests')}
                  error={!!formErrors.guests}
                  helperText={formErrors.guests}
                  required
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="message"
                  label="Special Requirements"
                  fullWidth
                  value={bookingForm.message}
                  onChange={handleBookingChange('message')}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </BookingForm>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleBookingClose}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBookingSubmit}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booking Confirmation Dialog */}
      <BookingConfirmation
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        bookingDetails={bookingForm}
        packageData={packageData}
      />
    </Box>
  );
};

export default PackageDetail; 