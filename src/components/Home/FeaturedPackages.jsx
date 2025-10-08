import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Rating,
  Chip,
  Stack,
  Skeleton,
} from '@mui/material';
import { LocationOn, AccessTime, Restaurant } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserSafe } from '../../hooks/useClerkSafe';
import { getAllPackages } from '../../services/packageService';

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isSignedIn } = useUserSafe();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await getAllPackages();
        console.log('Fetched packages data:', data); // Debug log
        // Show first 6 packages as featured
        setPackages(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching packages:', error);
        // Fallback data in case of error
        setPackages([
          {
            id: 1,
            name: "Taj Lake Palace Experience",
            location: "Udaipur, Rajasthan",
            price: 75000,
            duration: "3 Days / 2 Nights",
            rating: 4.9,
            image: "/images/packages/taj-lake-palace.jpg",
            mealPlan: "All Inclusive",
            description: "Experience royal luxury in this floating palace on Lake Pichola",
            amenities: ["Swimming Pool", "Spa", "Fine Dining", "Lake View"],
            category: "Palace",
            rooms: ["Luxury Room", "Royal Suite", "Grand Royal Suite"],
            activities: ["Heritage Walk", "Boat Ride", "Cultural Show"]
          },
          {
            id: 2,
            name: "The Oberoi Mumbai",
            location: "Mumbai, Maharashtra",
            price: 95000,
            duration: "5 Days / 4 Nights",
            rating: 4.8,
            image: "/images/packages/santorini-grace.jpg",
            mealPlan: "Breakfast & Dinner",
            description: "Luxury business hotel in the heart of Mumbai with stunning views",
            amenities: ["Infinity Pool", "Business Center", "Rooftop Restaurant", "Spa"],
            category: "Business",
            rooms: ["Deluxe Room", "Executive Suite", "Presidential Suite"],
            activities: ["City Tours", "Bollywood Experience", "Fine Dining"]
          },
          {
            id: 3,
            name: "ITC Grand Chola Chennai",
            location: "Chennai, Tamil Nadu",
            price: 85000,
            duration: "4 Days / 3 Nights",
            rating: 4.9,
            image: "/images/packages/burj-al-arab.jpg",
            mealPlan: "All Inclusive",
            description: "Heritage luxury hotel with award-winning hospitality in South India",
            amenities: ["Multiple Restaurants", "Luxury Spa", "Swimming Pool", "Conference Rooms"],
            category: "Heritage",
            rooms: ["Premium Room", "Club Room", "Grand Royal Suite"],
            activities: ["Temple Tours", "Cultural Shows", "Ayurvedic Spa"]
          },
          {
            id: 4,
            name: "The Leela Palace New Delhi",
            location: "New Delhi",
            price: 90000,
            duration: "3 Days / 2 Nights",
            rating: 4.8,
            image: "/images/packages/amalfi-retreat.jpg",
            mealPlan: "Breakfast & Dinner",
            description: "Urban palace hotel showcasing Indian artistry and luxury in the capital",
            amenities: ["Royal Spa", "Multiple Restaurants", "Indoor Pool", "Art Gallery"],
            category: "Palace",
            rooms: ["Deluxe Room", "Palace Wing", "Royal Suite"],
            activities: ["Heritage Walk", "Cultural Shows", "Shopping Tours"]
          },
          {
            id: 5,
            name: "Rambagh Palace Heritage",
            location: "Jaipur, Rajasthan",
            price: 65000,
            duration: "3 Days / 2 Nights",
            rating: 4.7,
            image: "/images/packages/rambagh-palace.jpg",
            mealPlan: "All Inclusive",
            description: "Indulge in Rajasthani hospitality at this former royal residence",
            amenities: ["Royal Garden", "Polo Bar", "Spa", "Indoor Pool"],
            category: "Palace",
            rooms: ["Palace Room", "Historical Suite", "Royal Suite"],
            activities: ["Heritage Walk", "Polo Match", "Afternoon Tea"]
          },
          {
            id: 6,
            name: "Kumarakom Lake Resort Kerala",
            location: "Kumarakom, Kerala",
            price: 70000,
            duration: "4 Days / 3 Nights",
            rating: 4.8,
            image: "/images/packages/maldives-villa.jpg",
            mealPlan: "All Inclusive",
            description: "Serene backwater resort with authentic Kerala hospitality",
            amenities: ["Ayurvedic Spa", "Backwater View", "Multiple Restaurants", "Swimming Pool"],
            category: "Resort",
            rooms: ["Lake View Room", "Garden View Room", "Presidential Suite"],
            activities: ["Backwater Cruise", "Spa Treatments", "Cultural Programs"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleViewDetails = (pkg) => {
    navigate(`/packages/${pkg.id}`);
  };

  const handleBookNow = (pkg) => {
    if (!isSignedIn) {
      navigate('/login');
      return;
    }
    navigate(`/booking/${pkg.id}`);
  };

  return (
    <Box
      id="featured-packages"
      component="section"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Premium Indian Hotels
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Discover India's most luxurious heritage hotels and palace stays
        </Typography>

        <Grid container spacing={4}>
          {loading
            ? Array.from(new Array(3)).map((_, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <Skeleton
                      variant="rectangular"
                      height={240}
                      animation="wave"
                    />
                    <CardContent>
                      <Skeleton height={32} width="80%" />
                      <Skeleton height={24} width="60%" />
                      <Skeleton height={24} width="40%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : packages.map((pkg) => (
                <Grid item xs={12} md={4} key={pkg.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={pkg.image}
                      alt={pkg.name}
                      sx={{ objectFit: 'cover' }}
                      onError={(e) => {
                        console.log('Image failed to load:', pkg.image);
                        e.target.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        sx={{ fontWeight: 600 }}
                      >
                        {pkg.name}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <LocationOn color="primary" sx={{ fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">
                          {pkg.location}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <AccessTime color="primary" sx={{ fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">
                          {pkg.duration}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <Restaurant color="primary" sx={{ fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">
                          {pkg.mealPlan}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {pkg.description}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 2 }}
                      >
                        <Rating value={pkg.rating} precision={0.1} readOnly />
                        <Typography variant="h6" color="primary">
                          {formatPrice(pkg.price)}
                        </Typography>
                      </Stack>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleViewDetails(pkg)}
                        sx={{ flex: 1 }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleBookNow(pkg)}
                        sx={{ flex: 1 }}
                      >
                        {isSignedIn ? 'Book Now' : 'Login to Book'}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedPackages;