import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const packages = [
  {
    id: 1,
    name: "Bali Adventure Package",
    duration: "7 Days",
    price: "$999",
    image: "/images/destinations/bali.jpg",
    description: "Experience the best of Bali with this complete package",
    highlights: ["Hotel", "Flights", "Activities"]
  },
  {
    id: 2,
    name: "Swiss Winter Holiday",
    duration: "5 Days",
    price: "$1499",
    image: "/images/destinations/swiss-alps.jpg",
    description: "Enjoy skiing and winter sports in the Swiss Alps",
    highlights: ["Ski Pass", "Resort Stay", "Equipment"]
  },
  {
    id: 3,
    name: "Greek Island Hopping",
    duration: "10 Days",
    price: "$1299",
    image: "/images/destinations/santorini.jpg",
    description: "Visit multiple Greek islands including Santorini",
    highlights: ["Ferry Passes", "Hotels", "Tours"]
  }
];

const PopularPackages = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Popular Packages
        </Typography>
        <Grid container spacing={4}>
          {packages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="240"
                  image={pkg.image}
                  alt={pkg.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {pkg.name}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip label={pkg.duration} color="primary" size="small" />
                    <Chip label={pkg.price} color="secondary" size="small" />
                  </Stack>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {pkg.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {pkg.highlights.map((highlight, index) => (
                      <Chip
                        key={index}
                        label={highlight}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Stack>
                  <Button variant="contained" color="primary" fullWidth>
                    Book Now
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PopularPackages; 