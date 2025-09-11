import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  position: 'relative',
  backgroundImage: 'url("/images/travel.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed', // This creates a parallax effect
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%)',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  color: 'white',
  maxWidth: '600px',
  animation: 'fadeIn 1s ease-in',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  animation: 'slideUp 1s ease-in-out',
  '@keyframes slideUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const Hero = () => {
  return (
    <HeroSection>
      <Container>
        <ContentWrapper>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '4rem' },
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Insurance
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 3,
              color: '#FF9F43',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            you can count on!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontWeight: 'normal',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Acceptance criteria, terms and conditions apply
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              maxWidth: '80%',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
          </Typography>
          <AnimatedButton
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#7AB800',
              '&:hover': {
                backgroundColor: '#698F00',
              },
              borderRadius: '25px',
              padding: '12px 40px',
              fontSize: '1.1rem',
              boxShadow: '0 4px 15px rgba(122, 184, 0, 0.3)',
            }}
          >
            Get a quote
          </AnimatedButton>
        </ContentWrapper>
      </Container>
    </HeroSection>
  );
};

export default Hero; 