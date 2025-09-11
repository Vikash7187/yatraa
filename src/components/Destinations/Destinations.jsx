import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Sample data - In a real app, this would come from an API
const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    category: "Beach",
    image: "/images/destinations/bali.jpg",
    description: "Experience tropical paradise with pristine beaches and rich culture."
  },
  {
    id: 2,
    name: "Swiss Alps",
    country: "Switzerland",
    category: "Mountain",
    image: "/images/destinations/swiss-alps.jpg",
    description: "Majestic mountain peaks and world-class skiing destinations."
  },
  // Add more destinations here
];

const categories = ["All", "Beach", "Mountain", "City", "Adventure", "Cultural", "Hill Station"];
const regions = ["All", "Asia", "Europe", "North America", "South America", "Africa", "Oceania"];

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

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  // Filter destinations based on selected filters
  const filteredDestinations = destinations.filter(dest => {
    const categoryMatch = selectedCategory === "All" || dest.category === selectedCategory;
    const regionMatch = selectedRegion === "All" || dest.country === selectedRegion;
    return categoryMatch && regionMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const currentDestinations = filteredDestinations.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(1);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom align="center" 
          sx={{ mb: 6, fontWeight: 'bold' }}>
          Explore Destinations
        </Typography>

        {/* Filters */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3} 
          sx={{ mb: 6 }}
          justifyContent="center"
        >
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Region</InputLabel>
            <Select
              value={selectedRegion}
              onChange={handleRegionChange}
              label="Region"
            >
              {regions.map((region) => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* Destinations Grid */}
        <Grid container spacing={4}>
          {currentDestinations.map((destination) => (
            <Grid item xs={12} sm={6} md={4} key={destination.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="240"
                  image={destination.image}
                  alt={destination.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {destination.name}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip label={destination.category} color="primary" size="small" />
                    <Chip label={destination.country} color="secondary" size="small" />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {destination.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Destinations; 