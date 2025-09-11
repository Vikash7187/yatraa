import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#FF9F43',
              }}
            >
              YATRAA
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: '#ccc',
                lineHeight: 1.6,
              }}
            >
              Discover the world with us. We create unforgettable travel experiences
              and make your dream vacations come true.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: <Facebook />, label: 'Facebook' },
                { icon: <Twitter />, label: 'Twitter' },
                { icon: <Instagram />, label: 'Instagram' },
                { icon: <LinkedIn />, label: 'LinkedIn' },
              ].map((social) => (
                <IconButton
                  key={social.label}
                  aria-label={social.label}
                  sx={{
                    color: '#FF9F43',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 159, 67, 0.1)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#FF9F43',
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {[
                { text: 'Home', path: '/' },
                { text: 'Destinations', path: '/destinations' },
                { text: 'Packages', path: '/packages' },
                { text: 'About Us', path: '/about' },
              ].map((link) => (
                <Link
                  key={link.text}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: '#ccc',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#FF9F43',
                      textDecoration: 'none',
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#FF9F43',
              }}
            >
              Contact Us
            </Typography>
            <Stack spacing={2}>
              {[
                {
                  icon: <Phone sx={{ color: '#FF9F43' }} />,
                  text: '+1 234 567 8900',
                },
                {
                  icon: <Email sx={{ color: '#FF9F43' }} />,
                  text: 'info@yatraa.com',
                },
                {
                  icon: <LocationOn sx={{ color: '#FF9F43' }} />,
                  text: '123 Travel Street, Adventure City, AC 12345',
                },
              ].map((contact, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ color: '#ccc' }}
                >
                  {contact.icon}
                  <Typography variant="body2">{contact.text}</Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 4,
            pt: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ccc',
          }}
        >
          © {new Date().getFullYear()} Yatraa. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer; 