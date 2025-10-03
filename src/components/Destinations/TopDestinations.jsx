import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Stack, Chip, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { LocationOn as LocationIcon, TravelExplore as ExploreIcon, Star as StarIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from '../../config/api';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    '& .destination-image': {
      transform: 'scale(1.1)'
    }
  },
}));

// Static fallback data for offline mode
const fallbackDestinations = [
  {
    id: 1,
    name: "Rajasthan Royal Circuit",
    location: "Rajasthan",
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience royal luxury in majestic palaces and desert landscapes",
    rating: 4.8
  },
  {
    id: 2,
    name: "Kerala Backwaters",
    location: "Kerala", 
    image: "https://images.unsplash.com/photo-1520637736862-4d197d17c91a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Serene backwaters and lush heritage properties",
    rating: 4.9
  },
  {
    id: 3,
    name: "Golden Triangle",
    location: "Delhi-Agra-Jaipur",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "India's most iconic heritage hotel circuit",
    rating: 4.9
  }
];

const TopDestinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState(fallbackDestinations);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hotel packages from API and extract top destinations
  useEffect(() => {
    const fetchTopDestinations = async () => {
      try {
        console.log('Fetching packages from API...');
        const response = await fetch(API_ENDPOINTS.packages);
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const packages = await response.json();
        console.log('Fetched packages:', packages);
        
        // Extract top 3 destinations from packages
        const topPackages = packages.slice(0, 3).map(pkg => ({
          id: pkg.id,
          name: pkg.name,
          location: pkg.location,
          image: pkg.image,
          description: pkg.description,
          rating: pkg.rating || 4.5
        }));
        
        console.log('Top packages for destinations:', topPackages);
        setDestinations(topPackages);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch destinations:', error);
        setError('Failed to load destinations. Showing fallback data.');
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    };

    fetchTopDestinations();
  }, []);

  return (
    <Box sx={{ 
      py: 8, 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Top Destinations
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto',
              mb: 4
            }}
          >
            Discover India's most sought-after heritage destinations
          </Typography>
          <Box
            sx={{
              width: 100,
              height: 4,
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              mx: 'auto',
              borderRadius: 2
            }}
          />
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="info" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
        <Grid container spacing={4}>
          {destinations.map((destination, index) => (
            <Grid item xs={12} sm={6} md={4} key={destination.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <StyledCard>
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={destination.image}
                      alt={destination.name}
                      className="destination-image"
                      sx={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', destination.image);
                      }}
                      onError={(e) => {
                        console.log('Image failed to load:', destination.image);
                        console.log('Falling back to default image');
                        e.target.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
                      }}
                    />
                    
                    {/* Rating badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: 2,
                        p: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <StarIcon sx={{ fontSize: 16, color: '#ffd700' }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {destination.rating}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                      {destination.name}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="subtitle1" color="text.secondary">
                        {destination.location}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {destination.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        )}
        <Box sx={{ 
          mt: 8, 
          display: 'flex', 
          justifyContent: 'center',
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 4,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ExploreIcon />}
            onClick={() => navigate('/destinations')}
            sx={{
              borderRadius: 3,
              px: 6,
              py: 2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1.1rem',
              backgroundColor: 'primary.main',
              color: 'white',
              boxShadow: '0 8px 25px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                backgroundColor: 'primary.dark',
                boxShadow: '0 12px 35px rgba(33, 150, 243, 0.4)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Explore All Destinations
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopDestinations; 