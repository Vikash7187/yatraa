import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardMedia,
  Stack,
  Alert,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  Restaurant,
  Pool,
  Spa,
  LocalBar,
  KingBed,
  EventAvailable,
  ArrowBack,
} from '@mui/icons-material';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try to get package details from localStorage
    const storedPackage = localStorage.getItem('selectedPackage');
    if (storedPackage) {
      const parsedPackage = JSON.parse(storedPackage);
      if (parsedPackage.id === parseInt(id)) {
        setPackageDetails(parsedPackage);
        setLoading(false);
        return;
      }
    }

    // If not in localStorage, fetch from API
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`/api/packages/${id}`);
        const data = await response.json();
        setPackageDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching package details:', error);
        setError('Failed to load package details. Please try again later.');
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!packageDetails) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">Package not found</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/packages')}
          sx={{ mb: 4 }}
        >
          Back to Packages
        </Button>

        <Grid container spacing={4}>
          {/* Left Column - Main Image and Details */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={packageDetails.image}
                alt={packageDetails.name}
                sx={{ objectFit: 'cover' }}
              />
            </Card>

            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                {packageDetails.name}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip
                  icon={<LocationOn />}
                  label={packageDetails.location}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<AccessTime />}
                  label={packageDetails.duration}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<Restaurant />}
                  label={packageDetails.mealPlan}
                  color="primary"
                  variant="outlined"
                />
              </Stack>

              <Box sx={{ mb: 3 }}>
                <Rating value={packageDetails.rating} precision={0.1} readOnly />
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ mt: 1, fontWeight: 600 }}
                >
                  {formatPrice(packageDetails.price)}
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                {packageDetails.description}
              </Typography>
            </Paper>

            {/* Amenities Section */}
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Amenities
              </Typography>
              <Grid container spacing={2}>
                {packageDetails.amenities.map((amenity, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Chip
                      icon={<Pool />}
                      label={amenity}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Activities Section */}
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Activities & Experiences
              </Typography>
              <List>
                {packageDetails.activities.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <EventAvailable color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={activity} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Right Column - Booking Section */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Available Room Types
              </Typography>
              <List>
                {packageDetails.rooms.map((room, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <KingBed color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={room} />
                    </ListItem>
                    {index < packageDetails.rooms.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => navigate(`/booking/${packageDetails.id}`)}
                sx={{ mt: 3 }}
              >
                Book Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PackageDetails; 