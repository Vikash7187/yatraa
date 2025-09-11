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

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages/featured');
        const data = await response.json();
        setPackages(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured packages:', error);
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
            name: "Santorini Grace",
            location: "Santorini, Greece",
            price: 95000,
            duration: "5 Days / 4 Nights",
            rating: 4.8,
            image: "/images/packages/santorini-grace.jpg",
            mealPlan: "Breakfast & Dinner",
            description: "Luxurious cliffside retreat with stunning Aegean Sea views",
            amenities: ["Infinity Pool", "Mediterranean Spa", "Sunset Terrace", "Wine Cellar"],
            category: "Resort",
            rooms: ["Sea View Suite", "Plunge Pool Suite", "Grace Suite"],
            activities: ["Wine Tasting", "Sunset Cruise", "Greek Cooking Class"]
          },
          {
            id: 3,
            name: "Burj Al Arab Experience",
            location: "Dubai, UAE",
            price: 150000,
            duration: "4 Days / 3 Nights",
            rating: 4.9,
            image: "/images/packages/burj-al-arab.jpg",
            mealPlan: "All Inclusive",
            description: "Ultimate luxury in the world's most iconic seven-star hotel",
            amenities: ["Private Beach", "Helipad", "Gold-Plated Interiors", "Underwater Restaurant"],
            category: "Ultra Luxury",
            rooms: ["Deluxe Suite", "Panoramic Suite", "Royal Suite"],
            activities: ["Desert Safari", "Yacht Tour", "Sky View Restaurant"]
          },
          {
            id: 4,
            name: "Amalfi Coast Retreat",
            location: "Positano, Italy",
            price: 85000,
            duration: "6 Days / 5 Nights",
            rating: 4.7,
            image: "/images/packages/amalfi-retreat.jpg",
            mealPlan: "Breakfast & Dinner",
            description: "Cliffside luxury with breathtaking Mediterranean views",
            amenities: ["Panoramic Pool", "Italian Spa", "Michelin Restaurant", "Private Beach Access"],
            category: "Boutique",
            rooms: ["Sea View Room", "Deluxe Suite", "Presidential Suite"],
            activities: ["Cooking Class", "Boat Tours", "Wine Tasting"]
          },
          {
            id: 5,
            name: "Rambagh Palace Heritage",
            location: "Jaipur, India",
            price: 65000,
            duration: "3 Days / 2 Nights",
            rating: 4.7,
            image: "/images/packages/rambagh-palace.jpg",
            mealPlan: "All Inclusive",
            description: "Indulge in Rajasthani hospitality at its finest",
            amenities: ["Royal Garden", "Polo Bar", "Spa", "Indoor Pool"],
            category: "Palace",
            rooms: ["Palace Room", "Historical Suite", "Royal Suite"],
            activities: ["Heritage Walk", "Polo Match", "Afternoon Tea"]
          },
          {
            id: 6,
            name: "Maldives Water Villa",
            location: "Male, Maldives",
            price: 120000,
            duration: "5 Days / 4 Nights",
            rating: 4.8,
            image: "/images/packages/maldives-villa.jpg",
            mealPlan: "All Inclusive",
            description: "Overwater luxury in pristine tropical paradise",
            amenities: ["Private Pool", "Glass Floor", "Direct Ocean Access", "Sunset Deck"],
            category: "Resort",
            rooms: ["Water Villa", "Sunset Villa", "Ocean Suite"],
            activities: ["Snorkeling", "Spa Treatments", "Sunset Cruise"]
          }
        ]);
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
    // Store the package details in localStorage before navigation
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    navigate(`/packages/${pkg.id}`);
  };

  return (
    <Box
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
          Featured Luxury Stays
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Discover our handpicked collection of India's finest palace hotels
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
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleViewDetails(pkg)}
                        sx={{
                          py: 1,
                          backgroundColor: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        }}
                      >
                        View Details
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