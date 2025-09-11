import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleGetQuote = () => {
    navigate('/packages');
  };

  return (
    <Box>
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