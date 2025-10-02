import React, { useState, useEffect } from 'react';
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
  Paper,
  TextField,
  InputAdornment,
  Button,
  Rating,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Enhanced Indian destinations data with real images
const destinations = [
  {
    id: 1,
    name: "Rajasthan Royal Circuit",
    state: "Rajasthan",
    category: "Heritage",
    region: "North India",
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Explore majestic palaces, desert landscapes, and vibrant culture in the land of maharajas.",
    rating: 4.8,
    packages: 12,
    highlights: ["Udaipur City Palace", "Jaisalmer Fort", "Jodhpur Blue City"]
  },
  {
    id: 2,
    name: "Kerala Backwaters",
    state: "Kerala",
    category: "Nature",
    region: "South India",
    image: "https://images.unsplash.com/photo-1520637736862-4d197d17c91a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Serene backwaters, lush greenery, and traditional houseboats in God's Own Country.",
    rating: 4.9,
    packages: 8,
    highlights: ["Alleppey Houseboats", "Kumarakom Bird Sanctuary", "Munnar Tea Gardens"]
  },
  {
    id: 3,
    name: "Goa Beaches",
    state: "Goa",
    category: "Beach",
    region: "West India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Golden beaches, Portuguese heritage, and vibrant nightlife on India's coast.",
    rating: 4.6,
    packages: 15,
    highlights: ["Calangute Beach", "Old Goa Churches", "Anjuna Night Market"]
  },
  {
    id: 4,
    name: "Himachal Pradesh Hills",
    state: "Himachal Pradesh",
    category: "Mountain",
    region: "North India",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Snow-capped peaks, hill stations, and adventure sports in the Himalayas.",
    rating: 4.7,
    packages: 10,
    highlights: ["Shimla Mall Road", "Manali Adventure", "Dharamshala Monasteries"]
  },
  {
    id: 5,
    name: "Golden Triangle",
    state: "Delhi-Agra-Jaipur",
    category: "Cultural",
    region: "North India",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "India's most famous circuit featuring Delhi, Agra's Taj Mahal, and Jaipur's palaces.",
    rating: 4.9,
    packages: 20,
    highlights: ["Taj Mahal", "Red Fort Delhi", "Amber Palace Jaipur"]
  },
  {
    id: 6,
    name: "Mumbai Metropolitan",
    state: "Maharashtra",
    category: "City",
    region: "West India",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Bollywood capital with colonial architecture, street food, and modern luxury.",
    rating: 4.5,
    packages: 7,
    highlights: ["Gateway of India", "Marine Drive", "Bollywood Studios"]
  },
  {
    id: 7,
    name: "Ladakh Adventure",
    state: "Ladakh",
    category: "Adventure",
    region: "North India",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "High-altitude desert with Buddhist monasteries, pristine lakes, and mountain passes.",
    rating: 4.8,
    packages: 6,
    highlights: ["Pangong Lake", "Nubra Valley", "Thiksey Monastery"]
  },
  {
    id: 8,
    name: "Tamil Nadu Temples",
    state: "Tamil Nadu",
    category: "Spiritual",
    region: "South India",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Ancient temples, classical arts, and Dravidian architecture in South India.",
    rating: 4.7,
    packages: 9,
    highlights: ["Meenakshi Temple", "Mahabalipuram", "Thanjavur Palace"]
  },
  {
    id: 9,
    name: "Andaman Islands",
    state: "Andaman & Nicobar",
    category: "Island",
    region: "East India",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Pristine islands with crystal clear waters, coral reefs, and untouched beaches.",
    rating: 4.6,
    packages: 5,
    highlights: ["Radhanagar Beach", "Cellular Jail", "Scuba Diving"]
  }
];

const categories = ["All", "Heritage", "Nature", "Beach", "Mountain", "Cultural", "City", "Adventure", "Spiritual", "Island"];
const regions = ["All", "North India", "South India", "West India", "East India", "Northeast India"];

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    '& .destination-image': {
      transform: 'scale(1.1)'
    },
    '& .rating-badge': {
      transform: 'scale(1.05)'
    }
  },
}));

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  // Filter destinations based on selected filters and search
  const filteredDestinations = destinations.filter(dest => {
    const categoryMatch = selectedCategory === "All" || dest.category === selectedCategory;
    const regionMatch = selectedRegion === "All" || dest.region === selectedRegion;
    const searchMatch = searchQuery === "" || 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && regionMatch && searchMatch;
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleFavoriteToggle = (destinationId) => {
    setFavorites(prev => 
      prev.includes(destinationId)
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
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