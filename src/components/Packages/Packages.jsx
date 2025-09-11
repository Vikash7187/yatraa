import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress,
  useTheme,
  Pagination,
  Divider,
  Collapse,
  CardActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Group as GroupIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { checkAvailability } from '../../services/bookingService';
import { format, addDays } from 'date-fns';
import RecommendedPackages from './RecommendedPackages';

// Mock data for initial state and fallback
const MOCK_PACKAGES = [
  {
    id: 1,
    name: "Royal Rajasthan Experience",
    type: "Luxury",
    duration: 7,
    price: 175000,
    rating: 4.9,
    reviews: 156,
    image: "/images/destinations/udaipur-lake-palace.jpg",
    location: "Udaipur, Rajasthan",
    description: "Experience royal luxury at the iconic Taj Lake Palace with exclusive palace tours and cultural experiences"
  },
  {
    id: 2,
    name: "Taj Mahal Romance Package",
    type: "Honeymoon",
    duration: 5,
    price: 145000,
    rating: 4.9,
    reviews: 142,
    image: "/images/destinations/agra-amarvilas.jpg",
    location: "Agra, Uttar Pradesh",
    description: "Luxury stay at The Oberoi Amarvilas with breathtaking views of the Taj Mahal from every room"
  },
  {
    id: 3,
    name: "Kerala Backwaters Retreat",
    type: "Wellness",
    duration: 6,
    price: 120000,
    rating: 4.8,
    reviews: 210,
    image: "/images/destinations/kerala-leela.jpg",
    location: "Kumarakom, Kerala",
    description: "Rejuvenating experience at The Leela Palace with Ayurvedic spa treatments and houseboat cruises"
  },
  {
    id: 4,
    name: "Pink City Royal Escape",
    type: "Heritage",
    duration: 4,
    price: 135000,
    rating: 4.8,
    reviews: 178,
    image: "/images/destinations/jaipur-rambagh.jpg",
    location: "Jaipur, Rajasthan",
    description: "Live like royalty at the Rambagh Palace with heritage walks and royal dining experiences"
  },
  {
    id: 5,
    name: "Mumbai Luxury Gateway",
    type: "Business",
    duration: 3,
    price: 95000,
    rating: 4.9,
    reviews: 225,
    image: "/images/destinations/mumbai-taj.jpg",
    location: "Mumbai, Maharashtra",
    description: "Iconic stay at The Taj Mahal Palace with sea views and world-class dining"
  },
  {
    id: 6,
    name: "Blue City Heritage Tour",
    type: "Family",
    duration: 5,
    price: 155000,
    rating: 4.9,
    reviews: 164,
    image: "/images/destinations/jodhpur-umaid.jpg",
    location: "Jodhpur, Rajasthan",
    description: "Family retreat at the majestic Umaid Bhawan Palace with museum tours and royal experiences"
  },
  {
    id: 7,
    name: "Goa Beach Resort Luxury",
    type: "Beach",
    duration: 4,
    price: 85000,
    rating: 4.7,
    reviews: 198,
    image: "/images/destinations/goa-taj.jpg",
    location: "Goa",
    description: "Beachfront luxury at Taj Fort Aguada with private beach access and water sports"
  },
  {
    id: 8,
    name: "Ranthambore Wildlife Luxury",
    type: "Adventure",
    duration: 4,
    price: 125000,
    rating: 4.8,
    reviews: 145,
    image: "/images/destinations/ranthambore-oberoi.jpg",
    location: "Ranthambore, Rajasthan",
    description: "Luxury wildlife experience at The Oberoi Vanyavilas with tiger safaris and spa treatments"
  }
];

const Packages = () => {
  const theme = useTheme();
  const [packages, setPackages] = useState(MOCK_PACKAGES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    duration: 'All',
    priceRange: [0, 200000],
    minRating: 0,
    location: 'All',
    availability: 'All',
    hotelCategory: 'All',
    amenities: [],
    mealPlan: 'All'
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [availabilityMap, setAvailabilityMap] = useState({});
  const itemsPerPage = 6;

  // Filter options
  const filterOptions = {
    types: ['All', 'Luxury', 'Heritage', 'Wellness', 'Honeymoon', 'Business', 'Family', 'Beach', 'Adventure'],
    durations: ['All', '1-3 Days', '4-7 Days', '8+ Days'],
    locations: ['All', 'Rajasthan', 'Kerala', 'Uttar Pradesh', 'Maharashtra', 'Goa'],
    hotelCategories: ['All', 'Palace Hotels', 'Beach Resorts', 'Wildlife Lodges', 'Heritage Hotels', 'Luxury Tents', 'Business Hotels', 'Wellness Resorts'],
    amenities: [
      'Private Pool',
      'Spa',
      'Butler Service',
      'Heritage Tours',
      'Beach Access',
      'Business Center',
      'Kids Club',
      'Yoga Center',
      'Safari Services',
      'Water Sports'
    ],
    mealPlans: ['All', 'Breakfast Only', 'Half Board', 'Full Board', 'All Inclusive']
  };

  // Helper function to get duration range
  const getDurationRange = (days) => {
    if (days <= 3) return '1-3 Days';
    if (days <= 7) return '4-7 Days';
    return '8+ Days';
  };

  // Helper function to get meal plan category
  const getMealPlanCategory = (meals) => {
    if (!meals) return 'Breakfast Only';
    if (meals.length === 1 && meals.includes('Breakfast')) return 'Breakfast Only';
    if (meals.length === 2 && meals.includes('Breakfast')) return 'Half Board';
    if (meals.length === 3) return 'Full Board';
    if (meals.length > 3) return 'All Inclusive';
    return 'Breakfast Only';
  };

  // Fetch packages data
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/packages');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        setPackages(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
        setError('Failed to fetch packages from server. Showing demo data.');
        // Keep using mock data if fetch fails
        setPackages(MOCK_PACKAGES);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Filter packages
  const filteredPackages = packages.filter(pkg => {
    const searchMatch = !filters.search || 
      pkg.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      pkg.location.toLowerCase().includes(filters.search.toLowerCase()) ||
      pkg.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const typeMatch = filters.type === "All" || pkg.type === filters.type;
    const durationMatch = filters.duration === "All" || getDurationRange(pkg.duration) === filters.duration;
    const priceMatch = pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1];
    const ratingMatch = pkg.rating >= filters.minRating;
    
    const locationMatch = filters.location === "All" || 
      pkg.location.includes(filters.location);

    const hotelCategoryMatch = filters.hotelCategory === "All" || 
      (pkg.type === "Heritage" && filters.hotelCategory === "Heritage Hotels") ||
      (pkg.type === "Luxury" && filters.hotelCategory === "Palace Hotels") ||
      (pkg.type === "Beach" && filters.hotelCategory === "Beach Resorts") ||
      (pkg.type === "Adventure" && filters.hotelCategory === "Wildlife Lodges") ||
      (pkg.type === "Business" && filters.hotelCategory === "Business Hotels") ||
      (pkg.type === "Wellness" && filters.hotelCategory === "Wellness Resorts");

    const amenitiesMatch = filters.amenities.length === 0 || 
      filters.amenities.every(amenity => pkg.amenities?.includes(amenity));

    const mealPlanMatch = filters.mealPlan === "All" || 
      getMealPlanCategory(pkg.meals) === filters.mealPlan;

    return searchMatch && typeMatch && durationMatch && priceMatch && 
           ratingMatch && locationMatch && hotelCategoryMatch && 
           amenitiesMatch && mealPlanMatch;
  });

  // Sort filtered packages
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return a.duration - b.duration;
      default:
        return b.rating * b.reviews - a.rating * a.reviews; // recommended
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedPackages.length / itemsPerPage);
  const currentPackages = sortedPackages.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Check availability for displayed packages
  useEffect(() => {
    const checkPackagesAvailability = async () => {
      if (!currentPackages.length) return; // Add this check

      const startDate = format(new Date(), 'yyyy-MM-dd');
      const availabilityPromises = currentPackages.map(pkg => 
        checkAvailability(
          pkg.id, 
          startDate, 
          format(addDays(new Date(), pkg.duration), 'yyyy-MM-dd'),
          1
        ).catch(() => ({ available: false }))
      );

      try {
        const results = await Promise.all(availabilityPromises);
        const newAvailabilityMap = {};
        currentPackages.forEach((pkg, index) => {
          newAvailabilityMap[pkg.id] = results[index];
        });
        setAvailabilityMap(prev => ({
          ...prev,
          ...newAvailabilityMap
        }));
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      }
    };

    checkPackagesAvailability();
  }, [currentPackages]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFavoriteToggle = (packageId) => {
    setFavorites(prev => 
      prev.includes(packageId)
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  if (loading) {
    return (
      <Box sx={{ 
        py: 8, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ 
            mb: 6, 
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            color: 'text.primary' 
          }}
        >
          Luxury Hotel Packages
        </Typography>

        {error && (
          <Alert severity="info" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Add RecommendedPackages section */}
        <RecommendedPackages 
          packages={packages}
          onFavoriteToggle={handleFavoriteToggle}
          favorites={favorites}
        />

        {/* Search and Filter Controls */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search packages by name or location..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                  startAdornment={
                    <InputAdornment position="start">
                      <SortIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="recommended">Recommended</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="duration">Duration</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={toggleFilters}
                startIcon={<FilterIcon />}
                endIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              >
                Filters
              </Button>
            </Grid>
          </Grid>

          <Collapse in={showFilters}>
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={filters.type}
                      label="Type"
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                      {filterOptions.types.map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Hotel Category</InputLabel>
                    <Select
                      value={filters.hotelCategory}
                      label="Hotel Category"
                      onChange={(e) => handleFilterChange('hotelCategory', e.target.value)}
                    >
                      {filterOptions.hotelCategories.map(category => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Location</InputLabel>
                    <Select
                      value={filters.location}
                      label="Location"
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    >
                      {filterOptions.locations.map(location => (
                        <MenuItem key={location} value={location}>{location}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Duration</InputLabel>
                    <Select
                      value={filters.duration}
                      label="Duration"
                      onChange={(e) => handleFilterChange('duration', e.target.value)}
                    >
                      {filterOptions.durations.map(duration => (
                        <MenuItem key={duration} value={duration}>{duration}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Meal Plan</InputLabel>
                    <Select
                      value={filters.mealPlan}
                      label="Meal Plan"
                      onChange={(e) => handleFilterChange('mealPlan', e.target.value)}
                    >
                      {filterOptions.mealPlans.map(plan => (
                        <MenuItem key={plan} value={plan}>{plan}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Minimum Rating</Typography>
                  <Rating
                    value={filters.minRating}
                    onChange={(e, newValue) => handleFilterChange('minRating', newValue)}
                    precision={0.5}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Price Range (₹)</Typography>
                  <Slider
                    value={filters.priceRange}
                    onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={200000}
                    step={5000}
                    valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Amenities</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {filterOptions.amenities.map(amenity => (
                      <Chip
                        key={amenity}
                        label={amenity}
                        onClick={() => {
                          handleFilterChange('amenities', prev =>
                            prev.includes(amenity)
                              ? prev.filter(a => a !== amenity)
                              : [...prev, amenity]
                          );
                        }}
                        color={filters.amenities.includes(amenity) ? "primary" : "default"}
                        variant={filters.amenities.includes(amenity) ? "filled" : "outlined"}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Paper>

        {/* Results Summary */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {filteredPackages.length} packages found
            {filters.search && ` for "${filters.search}"`}
          </Typography>
        </Box>

        {/* Package Grid */}
        <Grid container spacing={4}>
          {currentPackages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                  position: 'relative',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={pkg.image}
                  alt={pkg.name}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                    },
                  }}
                  onClick={() => handleFavoriteToggle(pkg.id)}
                >
                  {favorites.includes(pkg.id) ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {pkg.name}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <LocationIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {pkg.location}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <TimeIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {pkg.duration} days
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <Rating value={pkg.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({pkg.reviews})
                    </Typography>
                  </Stack>

                  {availabilityMap[pkg.id] && (
                    <Alert 
                      severity={availabilityMap[pkg.id].available ? "success" : "warning"}
                      sx={{ mb: 2 }}
                      icon={false}
                    >
                      {availabilityMap[pkg.id].available 
                        ? `${availabilityMap[pkg.id].remainingSpots} spots available`
                        : "Limited availability"}
                    </Alert>
                  )}

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 2 }}
                  >
                    <Typography variant="h6" color="primary">
                      ${pkg.price}
                      <Typography component="span" variant="body2" color="text.secondary">
                        {' '}/ person
                      </Typography>
                    </Typography>
                  </Stack>
                </CardContent>

                <Button 
                  component={RouterLink} 
                  to={`/packages/${pkg.id}`}
                  variant="contained" 
                  fullWidth
                  sx={{ 
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  View Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Packages; 