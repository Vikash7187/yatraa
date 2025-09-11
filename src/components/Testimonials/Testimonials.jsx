import React from 'react';
import { Container, Typography, Box, Avatar, Paper } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://source.unsplash.com/random/?woman,portrait',
    rating: 5,
    text: 'The trip to Japan was absolutely amazing! Every detail was perfectly planned, and the local guides were exceptional.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    avatar: 'https://source.unsplash.com/random/?man,portrait',
    rating: 5,
    text: 'Our African safari exceeded all expectations. The accommodations were luxurious and the wildlife viewing was incredible.',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    location: 'London, UK',
    avatar: 'https://source.unsplash.com/random/?girl,portrait',
    rating: 5,
    text: 'The Greek Islands tour was a dream come true. The personalized service and attention to detail made it unforgettable.',
  },
];

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  margin: theme.spacing(2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -20,
    left: '50%',
    transform: 'translateX(-50%)',
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderBottom: `20px solid ${theme.palette.background.paper}`,
  },
}));

const QuoteIcon = styled(FormatQuote)(({ theme }) => ({
  fontSize: 40,
  color: theme.palette.primary.main,
  opacity: 0.3,
}));

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          What Our Travelers Say
        </Typography>

        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <Box key={testimonial.id}>
              <TestimonialCard elevation={3}>
                <Avatar
                  src={testimonial.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    margin: '0 auto',
                    marginBottom: 2,
                    border: '3px solid',
                    borderColor: 'primary.main',
                  }}
                />
                <QuoteIcon />
                <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                  {testimonial.text}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.location}
                </Typography>
              </TestimonialCard>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Testimonials; 