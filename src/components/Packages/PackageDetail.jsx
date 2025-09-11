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

// Sample packages data
const packagesData = [
  {
    id: 1,
    name: "Romantic Bali Getaway",
    type: "Honeymoon",
    duration: 7,
    price: 1299,
    rating: 4.8,
    reviews: 245,
    image: "/images/destinations/bali.jpg",
    description: "Experience the perfect romantic escape in tropical paradise with our carefully curated Bali getaway package.",
    location: "Bali, Indonesia",
    highlights: ["Luxury Resort", "Couple Spa", "Private Beach", "Sunset Dinner", "Island Tours"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description: "Airport pickup, check-in to luxury resort, welcome dinner"
      },
      {
        day: 2,
        title: "Spa & Relaxation",
        description: "Couple spa treatment, beach relaxation, romantic dinner"
      },
      {
        day: 3,
        title: "Island Exploration",
        description: "Private island tour, water activities, sunset cruise"
      }
    ],
    inclusions: [
      "5-star accommodation",
      "Daily breakfast",
      "Airport transfers",
      "Guided tours",
      "Couple spa session",
      "Welcome dinner"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Additional activities"
    ]
  },
  {
    id: 2,
    name: "Swiss Family Adventure",
    type: "Family",
    duration: 5,
    price: 2499,
    rating: 4.5,
    reviews: 180,
    image: "/images/destinations/swiss-alps.jpg",
    description: "Experience an unforgettable family adventure in the majestic Swiss Alps with activities for everyone.",
    location: "Swiss Alps, Switzerland",
    highlights: ["Ski Resort", "Family Activities", "Mountain Views", "Adventure Sports", "Kids Club"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description: "Airport pickup, resort check-in, welcome dinner"
      },
      {
        day: 2,
        title: "Ski Adventure",
        description: "Ski lessons, winter sports, evening bonfire"
      },
      {
        day: 3,
        title: "Mountain Exploration",
        description: "Cable car ride, hiking, mountain activities"
      }
    ],
    inclusions: [
      "4-star resort accommodation",
      "Ski passes",
      "Equipment rental",
      "Daily meals",
      "Family activities",
      "Mountain guide"
    ],
    exclusions: [
      "Flights",
      "Travel insurance",
      "Personal gear",
      "Extra activities"
    ]
  },
  {
    id: 3,
    name: "Greek Island Explorer",
    type: "Solo",
    duration: 10,
    price: 1799,
    rating: 4.7,
    reviews: 210,
    image: "/images/destinations/santorini.jpg",
    description: "Embark on an unforgettable journey through the Greek Islands, experiencing the best of Mediterranean culture.",
    location: "Greek Islands, Greece",
    highlights: ["Island Hopping", "Cultural Tours", "Beach Activities", "Local Cuisine", "Historical Sites"],
    itinerary: [
      {
        day: 1,
        title: "Athens Arrival",
        description: "Airport pickup, hotel check-in, Athens city tour"
      },
      {
        day: 2,
        title: "Santorini Adventure",
        description: "Ferry to Santorini, island tour, sunset viewing"
      },
      {
        day: 3,
        title: "Beach & Culture",
        description: "Beach activities, local village tour, cooking class"
      }
    ],
    inclusions: [
      "Hotel accommodation",
      "Ferry transfers",
      "Island tours",
      "Breakfast daily",
      "Local guide",
      "Welcome dinner"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  }
];

const PackageDetail = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [dynamicPrice, setDynamicPrice] = useState(null);
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
  const navigate = useNavigate();

  useEffect(() => {
    // Find the package with matching id
    const foundPackage = packagesData.find(pkg => pkg.id === parseInt(id));
    if (foundPackage) {
      setPackageData(foundPackage);
    }
  }, [id]);

  useEffect(() => {
    const checkCurrentAvailability = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const startDate = format(new Date(), 'yyyy-MM-dd');
        const endDate = format(addDays(new Date(), packageData?.duration || 7), 'yyyy-MM-dd');
        
        const [availabilityData, priceData] = await Promise.all([
          checkAvailability(id, startDate, endDate, 1),
          getDynamicPrice(id, startDate, endDate, 1)
        ]);
        
        setAvailability(availabilityData);
        setDynamicPrice(priceData);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      } finally {
        setLoading(false);
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
    navigate(`/booking-form/${id}`);
  };

  const handleBookingClose = () => setOpenBooking(false);

  // Get today's date in YYYY-MM-DD format for min date in date picker
  const today = new Date().toISOString().split('T')[0];

  if (!packageData) {
    return (
      <Container>
        <Box sx={{ py: 8 }}>
          <Typography variant="h4">Package not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <HeroSection>
        <HeroImage src={packageData.image} alt={packageData.name} />
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
                label={`${packageData.duration} days`}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'text.primary',
                  fontWeight: 500,
                }}
              />
              <Chip
                icon={<GroupIcon />}
                label={packageData.type}
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
                  {packageData.highlights.map((highlight, index) => (
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
              {packageData.itinerary.map((day, index) => (
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
                    {packageData.inclusions.map((item, index) => (
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
                    {packageData.exclusions.map((item, index) => (
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
                <Rating value={packageData.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({packageData.reviews} reviews)
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
                {loading ? 'Checking Availability...' : 'Book Now'}
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