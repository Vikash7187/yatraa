import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Star,
  Security,
  LocalOffer,
  SupportAgent,
  Villa,
  Restaurant,
} from '@mui/icons-material';

const features = [
  {
    icon: <Villa sx={{ fontSize: 45 }} />,
    title: 'Handpicked Palace Hotels',
    description: 'Curated selection of India\'s most prestigious heritage properties and palace hotels'
  },
  {
    icon: <Star sx={{ fontSize: 45 }} />,
    title: 'Exclusive Experiences',
    description: 'Unique cultural experiences and royal treatments crafted for our distinguished guests'
  },
  {
    icon: <LocalOffer sx={{ fontSize: 45 }} />,
    title: 'Best Price Guarantee',
    description: 'We ensure you get the best rates with our price match promise'
  },
  {
    icon: <Restaurant sx={{ fontSize: 45 }} />,
    title: 'Gourmet Dining',
    description: 'Experience authentic royal cuisines and traditional delicacies'
  },
  {
    icon: <SupportAgent sx={{ fontSize: 45 }} />,
    title: '24/7 Concierge Service',
    description: 'Dedicated support team available round the clock for all your needs'
  },
  {
    icon: <Security sx={{ fontSize: 45 }} />,
    title: 'Secure Booking',
    description: 'Safe and secure payment process with instant confirmation'
  }
];

const WhyChooseUs = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/images/pattern-bg.png")',
          backgroundRepeat: 'repeat',
          opacity: 0.05,
          zIndex: 1,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Why Choose Yatraa
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 4
            }}
          >
            Experience the finest in luxury Indian hospitality
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'background.paper',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                    '& .MuiSvgIcon-root': {
                      transform: 'scale(1.1)',
                      color: 'primary.main',
                    }
                  }
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    p: 4,
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      '& .MuiSvgIcon-root': {
                        color: 'text.primary',
                        transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                      }
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs; 