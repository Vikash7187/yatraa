import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const topDestinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "/images/destinations/bali.jpg",
    description: "Experience tropical paradise"
  },
  {
    id: 2,
    name: "Swiss Alps",
    country: "Switzerland",
    image: "/images/destinations/swiss-alps.jpg",
    description: "Majestic mountain peaks"
  },
  {
    id: 3,
    name: "Santorini",
    country: "Greece",
    image: "/images/destinations/santorini.jpg",
    description: "Beautiful island getaway"
  }
];

const TopDestinations = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Top Destinations
        </Typography>
        <Grid container spacing={4}>
          {topDestinations.map((destination) => (
            <Grid item xs={12} sm={6} md={4} key={destination.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="240"
                  image={destination.image}
                  alt={destination.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {destination.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {destination.country}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {destination.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/destinations')}
          >
            Explore All Destinations
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopDestinations; 