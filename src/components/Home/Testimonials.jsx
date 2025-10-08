import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ChevronLeft, ChevronRight, FormatQuote, Castle } from '@mui/icons-material';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    location: 'Mumbai, India',
    avatar: '/images/testimonials/guest1.jpg',
    rating: 5,
    text: 'Our stay at the Taj Lake Palace was absolutely magical. The service was impeccable, and the experience of staying in a floating palace was unforgettable. The attention to detail and royal treatment made us feel like maharajas!',
    title: 'Business Executive'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    location: 'London, UK',
    avatar: '/images/testimonials/guest2.jpg',
    rating: 5,
    text: 'The heritage hotels booked through Yatraa exceeded all expectations. From the traditional welcome to the luxurious accommodations, every moment was steeped in Indian royalty. The concierge service was particularly outstanding.',
    title: 'Travel Blogger'
  },
  {
    id: 3,
    name: 'Priya Patel',
    location: 'Delhi, India',
    avatar: '/images/testimonials/guest3.jpg',
    rating: 5,
    text: 'What sets Yatraa apart is their attention to detail and understanding of luxury travel. The curated experiences at Rambagh Palace were exceptional. The traditional Rajasthani dinner under the stars was a highlight!',
    title: 'Fashion Designer'
  },
  {
    id: 4,
    name: 'James Chen',
    location: 'Singapore',
    avatar: '/images/testimonials/guest4.jpg',
    rating: 5,
    text: 'The seamless booking process and personalized recommendations made our Indian palace hotel experience truly special. The cultural experiences arranged by Yatraa added an authentic touch to our luxury stay.',
    title: 'Tech Entrepreneur'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex * itemsPerPage) + itemsPerPage
  );

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Royal Guest Experiences
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
            Hear what our distinguished guests have to say about their Indian palace stays
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 4,
            position: 'relative',
            justifyContent: 'center',
          }}
        >
          {visibleTestimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              sx={{
                maxWidth: 500,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ position: 'relative', mb: 4 }}>
                  <FormatQuote
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      fontSize: 40,
                      color: 'primary.main',
                      opacity: 0.2,
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      lineHeight: 1.8,
                      fontStyle: 'italic',
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 64, height: 64 }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.location}
                    </Typography>
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 4
          }}
        >
          <IconButton
            onClick={handlePrevious}
            sx={{
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;