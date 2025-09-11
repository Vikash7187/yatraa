import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const features = [
  {
    icon: <FlightTakeoffIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: "Wide Destination Network",
    description: "Access to hundreds of destinations worldwide with carefully curated travel experiences"
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: "Secure Travel Insurance",
    description: "Comprehensive travel insurance coverage for worry-free adventures"
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance from our dedicated travel experts"
  },
  {
    icon: <LocalOfferIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: "Best Price Guarantee",
    description: "Competitive prices and regular deals to ensure the best value for your money"
  }
];

const WhyChooseUs = () => {
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
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StyledPaper elevation={3}>
                {feature.icon}
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs; 