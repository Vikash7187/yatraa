import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Rating,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder,
  AccessTime,
  LocationOn,
  TrendingUp,
  Star
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const RecommendedPackages = ({ packages, onFavoriteToggle, favorites }) => {
  const theme = useTheme();

  // Get top rated packages
  const topPackages = [...packages]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <Box sx={{ 
      mb: 8,
      p: 4,
      borderRadius: 4,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 800,
            color: 'primary.main',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <TrendingUp sx={{ fontSize: '2rem', color: 'primary.main' }} /> 
          Top Recommended Packages
        </Typography>
        <Box
          sx={{
            width: 120,
            height: 4,
            backgroundColor: 'primary.main',
            mx: 'auto',
            borderRadius: 2
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {topPackages.map((pkg, index) => (
          <Grid item xs={12} md={4} key={pkg.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-16px) scale(1.03)',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
                    '& .recommended-image': {
                      transform: 'scale(1.15)'
                    }
                  },
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={pkg.image}
                    alt={pkg.name}
                    className="recommended-image"
                    sx={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onError={(e) => {
                      console.log('Recommended package image failed to load:', pkg.image);
                      e.target.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  
                  {/* Gradient overlay */}
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
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <Chip
                      icon={<Star sx={{ color: '#ffd700 !important', fontSize: '1rem' }} />}
                      label={`#${index + 1} Recommended`}
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  </Box>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'scale(1.1)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                      },
                    }}
                    onClick={() => onFavoriteToggle(pkg.id)}
                  >
                    {favorites.includes(pkg.id) ? (
                      <Favorite sx={{ color: '#ff4757' }} />
                    ) : (
                      <FavoriteBorder color="action" />
                    )}
                  </IconButton>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{ 
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      mb: 2,
                      color: 'text.primary'
                    }}
                  >
                    {pkg.name}
                  </Typography>

                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          p: 0.5,
                          borderRadius: 1,
                          backgroundColor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <LocationOn sx={{ fontSize: 16, color: 'primary.main' }} />
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          fontWeight: 500
                        }}
                      >
                        {pkg.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          p: 0.5,
                          borderRadius: 1,
                          backgroundColor: 'success.light',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <AccessTime sx={{ fontSize: 16, color: 'success.main' }} />
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          fontWeight: 500
                        }}
                      >
                        {pkg.duration} days / {pkg.duration - 1} nights
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating
                        value={pkg.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: '#ffd700'
                          }
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          fontWeight: 500
                        }}
                      >
                        ({pkg.reviews} reviews)
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 3,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        textAlign: 'center'
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ 
                          fontWeight: 700,
                          fontSize: '1.3rem'
                        }}
                      >
                        ₹{pkg.price?.toLocaleString() || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ 
                          opacity: 0.9,
                          fontWeight: 500
                        }}
                      >
                        per person
                      </Typography>
                    </Box>

                    <Chip
                      label={pkg.type}
                      sx={{
                        alignSelf: 'flex-start',
                        backgroundColor: 'secondary.light',
                        color: 'secondary.main',
                        fontWeight: 600,
                        mt: 1
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedPackages; 