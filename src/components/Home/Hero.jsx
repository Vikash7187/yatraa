import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ChevronLeft,
  ChevronRight,
  Search,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getImagePath, IMAGES } from '../../utils/imagePaths';
import travelImage from '../../assets/travel.jpg';

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleExplore = () => {
    // Scroll to the featured packages section
    const element = document.getElementById('featured-packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/packages');
    }
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1,
        },
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${travelImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          mt: { xs: -8, md: 0 },
        }}
      >
        <Box
          sx={{
            maxWidth: '800px',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.2,
              animation: 'fadeInUp 1s ease-out',
            }}
          >
            Discover India's
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.1,
              animation: 'fadeInUp 1s ease-out 0.3s',
              animationFillMode: 'both',
            }}
          >
            Royal Heritage Hotels
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: '600px',
              fontWeight: 400,
              animation: 'fadeInUp 1s ease-out 0.6s',
              animationFillMode: 'both',
            }}
          >
            Experience the luxury and grandeur of India's finest palace hotels and heritage properties
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              animation: 'fadeInUp 1s ease-out 0.9s',
              animationFillMode: 'both',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleExplore}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Explore Royal Stays
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Social Media Links */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          position: 'absolute',
          right: { xs: '20px', md: '40px' },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          display: { xs: 'none', md: 'flex' },
        }}
      >
        {[
          { icon: <Facebook />, label: 'Facebook', url: '#' },
          { icon: <Twitter />, label: 'Twitter', url: '#' },
          { icon: <Instagram />, label: 'Instagram', url: '#' },
          { icon: <LinkedIn />, label: 'LinkedIn', url: '#' },
        ].map((social) => (
          <IconButton
            key={social.label}
            aria-label={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {social.icon}
          </IconButton>
        ))}
      </Stack>

      {/* Navigation Arrows */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          position: 'absolute',
          bottom: { xs: '20px', md: '40px' },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        {[
          { icon: <ChevronLeft />, label: 'Previous' },
          { icon: <ChevronRight />, label: 'Next' },
        ].map((arrow) => (
          <IconButton
            key={arrow.label}
            aria-label={arrow.label}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {arrow.icon}
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
};

export default Hero;