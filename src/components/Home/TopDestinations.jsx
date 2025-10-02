import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
  Stack,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Divider,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  FlightTakeoff,
  Hotel,
  Restaurant,
  LocalActivity,
  Pool,
  Spa,
  Close,
  Person,
  CalendarMonth,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';

const destinations = [
  {
    id: 1,
    name: 'Taj Lake Palace, Udaipur',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    description: 'Luxury heritage hotel floating on Lake Pichola with stunning views of the City Palace',
    rating: 4.9,
    activities: ['Heritage', 'Luxury', 'Culture'],
    price: 35000,
    attractions: ['Boat Rides', 'Royal Spa', 'Heritage Walk'],
  },
  {
    id: 2,
    name: 'The Oberoi Amarvilas, Agra',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80',
    description: 'Every room offers breathtaking views of the iconic Taj Mahal',
    rating: 4.9,
    activities: ['Heritage', 'Luxury', 'Romance'],
    price: 45000,
    attractions: ['Taj Mahal View', 'Spa', 'Fine Dining'],
  },
  {
    id: 3,
    name: 'Rambagh Palace, Jaipur',
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    description: 'Former residence of the Maharaja of Jaipur, now a luxury heritage hotel',
    rating: 4.8,
    activities: ['Royal Experience', 'Heritage', 'Culture'],
    price: 38000,
    attractions: ['Palace Tours', 'Royal Dining', 'Peacock Gardens'],
  },
  {
    id: 4,
    name: 'The Leela Palace, Kerala',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c91a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    description: 'Backwater luxury resort with private lagoon and Ayurvedic spa',
    rating: 4.8,
    activities: ['Ayurveda', 'Backwaters', 'Nature'],
    price: 28000,
    attractions: ['Houseboat Cruise', 'Ayurvedic Spa', 'Lagoon View'],
  },
  {
    id: 5,
    name: 'Umaid Bhawan Palace, Jodhpur',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    description: 'One of the world\'s largest private residences, part luxury hotel',
    rating: 4.9,
    activities: ['Heritage', 'Museum', 'Luxury'],
    price: 42000,
    attractions: ['Palace Museum', 'Royal Dining', 'Heritage Walk'],
  },
  {
    id: 6,
    name: 'The Taj Mahal Palace, Mumbai',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    description: 'Iconic seafront luxury hotel with stunning Gateway of India views',
    rating: 4.9,
    activities: ['Heritage', 'Luxury', 'Dining'],
    price: 32000,
    attractions: ['Sea View', 'Heritage Walk', 'Luxury Spa'],
  },
];

const TopDestinations = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: null,
    checkOut: null,
    guests: 2,
    roomType: 'deluxe',
    specialRequests: '',
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStatus, setBookingStatus] = useState({ success: false, message: '' });

  const handleFavoriteToggle = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleViewDetails = (destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseDetails = () => {
    setSelectedDestination(null);
    setShowBookingForm(false);
    setBookingStatus({ success: false, message: '' });
  };

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleBookingSubmit = () => {
    // Validate booking data
    if (!bookingData.checkIn || !bookingData.checkOut) {
      setBookingStatus({
        success: false,
        message: 'Please select check-in and check-out dates'
      });
      return;
    }

    // Simulate booking success
    setBookingStatus({
      success: true,
      message: 'Booking successful! You will receive a confirmation email shortly.'
    });

    // Reset form after successful booking
    setTimeout(() => {
      handleCloseDetails();
      setBookingData({
        checkIn: null,
        checkOut: null,
        guests: 2,
        roomType: 'deluxe',
        specialRequests: '',
      });
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        background: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            component="h2"
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Top Destinations
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            Discover India's most luxurious heritage hotels and palace stays
          </Typography>
        </Box>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {destinations.map((destination) => (
              <Grid item xs={12} sm={6} md={4} key={destination.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    onMouseEnter={() => setHoveredId(destination.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="260"
                        image={destination.image}
                        alt={destination.name}
                        sx={{
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          console.log('Image failed to load:', destination.image);
                          e.target.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteToggle(destination.id);
                        }}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                        }}
                      >
                        {favorites.includes(destination.id) ? (
                          <Favorite color="error" />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </IconButton>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                          p: 2,
                          transition: 'opacity 0.3s',
                          opacity: hoveredId === destination.id ? 1 : 0,
                        }}
                      >
                        <Stack direction="row" spacing={1}>
                          {destination.activities.map((activity) => (
                            <Chip
                              key={activity}
                              label={activity}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                color: 'text.primary',
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h3"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {destination.name}
                      </Typography>

                      <Stack spacing={2}>
                        <Typography variant="body2" color="text.secondary">
                          {destination.description}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOn color="primary" sx={{ fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            Top Attractions:
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {destination.attractions.map((attraction) => (
                            <Chip
                              key={attraction}
                              label={attraction}
                              size="small"
                              variant="outlined"
                              color="primary"
                            />
                          ))}
                        </Stack>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                            From ₹{destination.price.toLocaleString()}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleViewDetails(destination)}
                            startIcon={<Hotel />}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Details Modal */}
        <Dialog
          open={!!selectedDestination}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
        >
          {selectedDestination && (
            <>
              <DialogTitle
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5" component="span">
                  {selectedDestination.name}
                </Typography>
                <IconButton onClick={handleCloseDetails}>
                  <Close />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                {!showBookingForm ? (
                  <Box>
                    <Box sx={{ position: 'relative', mb: 3 }}>
                      <CardMedia
                        component="img"
                        height="400"
                        image={selectedDestination.image}
                        alt={selectedDestination.name}
                        sx={{ borderRadius: 1 }}
                      />
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom>
                          About the Property
                        </Typography>
                        <Typography paragraph>
                          {selectedDestination.description}
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                          Amenities
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                          {selectedDestination.activities.map((activity) => (
                            <Chip
                              key={activity}
                              label={activity}
                              icon={activity === 'Luxury' ? <Spa /> : activity === 'Heritage' ? <Hotel /> : <LocalActivity />}
                            />
                          ))}
                        </Stack>

                        <Typography variant="h6" gutterBottom>
                          Attractions Nearby
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {selectedDestination.attractions.map((attraction) => (
                            <Chip
                              key={attraction}
                              label={attraction}
                              variant="outlined"
                              color="primary"
                            />
                          ))}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            Price Details
                          </Typography>
                          <Typography variant="h4" color="primary" gutterBottom>
                            ₹{selectedDestination.price.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" display="block" gutterBottom>
                            per night
                          </Typography>
                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleBookNow}
                            sx={{ mt: 2 }}
                          >
                            Book Now
                          </Button>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  <Box sx={{ py: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Booking Details
                    </Typography>
                    {bookingStatus.message && (
                      <Alert 
                        severity={bookingStatus.success ? "success" : "error"}
                        sx={{ mb: 3 }}
                      >
                        {bookingStatus.message}
                      </Alert>
                    )}
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Check-in Date"
                            value={bookingData.checkIn}
                            onChange={(newValue) => setBookingData(prev => ({ ...prev, checkIn: newValue }))}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            minDate={new Date()}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Check-out Date"
                            value={bookingData.checkOut}
                            onChange={(newValue) => setBookingData(prev => ({ ...prev, checkOut: newValue }))}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            minDate={bookingData.checkIn || new Date()}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Number of Guests</InputLabel>
                          <Select
                            value={bookingData.guests}
                            label="Number of Guests"
                            onChange={(e) => setBookingData(prev => ({ ...prev, guests: e.target.value }))}
                          >
                            {[1, 2, 3, 4].map((num) => (
                              <MenuItem key={num} value={num}>
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Room Type</InputLabel>
                          <Select
                            value={bookingData.roomType}
                            label="Room Type"
                            onChange={(e) => setBookingData(prev => ({ ...prev, roomType: e.target.value }))}
                          >
                            <MenuItem value="deluxe">Deluxe Room</MenuItem>
                            <MenuItem value="suite">Luxury Suite</MenuItem>
                            <MenuItem value="presidential">Presidential Suite</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Special Requests"
                          multiline
                          rows={4}
                          value={bookingData.specialRequests}
                          onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                {showBookingForm ? (
                  <>
                    <Button onClick={() => setShowBookingForm(false)}>
                      Back to Details
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleBookingSubmit}
                      disabled={bookingStatus.success}
                    >
                      Confirm Booking
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleCloseDetails}>Close</Button>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/destinations')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              fontSize: '1.1rem',
            }}
          >
            View All Destinations
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopDestinations; 