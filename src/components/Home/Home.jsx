import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
} from '@mui/material';
import {
  LocationOn,
  Star,
  ArrowForward,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import './Home.css';
import Hero from './Hero';
import TopDestinations from './TopDestinations';
import FeaturedPackages from './FeaturedPackages';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showBookingSuccess, setShowBookingSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // Simple loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Check if user came from successful booking
  React.useEffect(() => {
    if (location.state?.bookingConfirmed) {
      setShowBookingSuccess(true);
      // Clear the state to prevent showing the message on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleGetQuote = () => {
    navigate('/packages');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Success Alert for New Bookings */}
      {showBookingSuccess && (
        <Container maxWidth="lg" sx={{ pt: 12, pb: 2 }}>
          <Alert 
            severity="success" 
            onClose={() => setShowBookingSuccess(false)}
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" gutterBottom>
              🎉 Booking Confirmed Successfully!
            </Typography>
            <Typography>
              {location.state?.message || 'Your hotel booking has been confirmed. Check your profile to view booking details.'}
            </Typography>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => navigate('/profile')} 
              sx={{ mt: 1 }}
            >
              View My Bookings
            </Button>
          </Alert>
        </Container>
      )}
      
      <Hero />
      <TopDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </Box>
  );
};

// Sample data for top destinations
const topDestinations = [
  {
    id: 1,
    name: 'Bali',
    location: 'Indonesia',
    rating: 4.8,
    image: '/images/destinations/bali.jpg',
  },
  {
    id: 2,
    name: 'Santorini',
    location: 'Greece',
    rating: 4.9,
    image: '/images/destinations/santorini.jpg',
  },
  {
    id: 3,
    name: 'Maldives',
    location: 'South Asia',
    rating: 4.7,
    image: '/images/destinations/maldives.jpg',
  },
];

export default Home; 