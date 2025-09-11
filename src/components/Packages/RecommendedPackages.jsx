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
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 'bold',
          color: 'primary.main'
        }}
      >
        <TrendingUp /> Top Recommended Packages
      </Typography>

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
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={pkg.image}
                    alt={pkg.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <Chip
                      icon={<Star sx={{ color: 'gold !important' }} />}
                      label={`Top ${index + 1}`}
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  </Box>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                    }}
                    onClick={() => onFavoriteToggle(pkg.id)}
                  >
                    {favorites.includes(pkg.id) ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {pkg.name}
                  </Typography>

                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn color="primary" sx={{ fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {pkg.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime color="primary" sx={{ fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {pkg.duration} days
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating
                        value={pkg.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({pkg.reviews} reviews)
                      </Typography>
                    </Box>

                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 'bold', mt: 2 }}
                    >
                      ${pkg.price.toLocaleString()}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {' '}
                        / person
                      </Typography>
                    </Typography>

                    <Chip
                      label={pkg.type}
                      size="small"
                      color="primary"
                      sx={{ alignSelf: 'flex-start' }}
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