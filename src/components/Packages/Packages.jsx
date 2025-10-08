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
import { getAllPackages, likePackage, unlikePackage, checkIfLiked } from '../../services/packageService';
import { format, addDays } from 'date-fns';
import RecommendedPackages from './RecommendedPackages';
import { useUserSafe } from '../../hooks/useClerkSafe';

// Mock data for initial state and fallback
const MOCK_PACKAGES = [
  {
    id: 1,
    name: "Taj Lake Palace Udaipur",
    type: "Palace",
    duration: 3,
    price: 45000,
    rating: 4.9,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    location: "Udaipur, Rajasthan",
    description: "Experience royal luxury in this floating palace on Lake Pichola, one of India's most iconic heritage hotels",
    highlights: [
      "Floating Palace Hotel",
      "Lake Pichola Views", 
      "Royal Heritage Experience",
      "Fine Dining",
      "Luxury Spa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Royal Arrival",
        description: "Airport pickup, boat transfer to palace, welcome ceremony with royal treatment"
      },
      {
        day: 2,
        title: "Palace Exploration", 
        description: "Heritage walk, spa treatments, sunset dinner by the lake"
      },
      {
        day: 3,
        title: "Cultural Experience",
        description: "Cultural show, city tour, departure with royal memories"
      }
    ],
    inclusions: [
      "5-star palace accommodation",
      "All meals included",
      "Airport transfers",
      "Guided heritage tours",
      "Spa session",
      "Cultural show"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance", 
      "Personal expenses",
      "Additional activities"
    ]
  },
  {
    id: 2,
    name: "The Oberoi Mumbai",
    type: "Luxury Business",
    duration: 4,
    price: 35000,
    rating: 4.8,
    reviews: 287,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    location: "Mumbai, Maharashtra",
    description: "Luxury business hotel in the heart of Mumbai with stunning views of the Arabian Sea",
    highlights: [
      "Arabian Sea Views",
      "Business Center",
      "Rooftop Pool", 
      "Award-winning Restaurants",
      "Luxury Spa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Mumbai Arrival",
        description: "Airport pickup, hotel check-in, welcome drink with city views"
      },
      {
        day: 2,
        title: "City Exploration",
        description: "Mumbai city tour, Gateway of India, Marine Drive, local markets"
      },
      {
        day: 3,
        title: "Bollywood Experience", 
        description: "Film City tour, Bollywood studio visit, traditional Indian dinner"
      },
      {
        day: 4,
        title: "Relaxation & Departure",
        description: "Spa treatments, pool time, shopping, departure transfer"
      }
    ],
    inclusions: [
      "Luxury hotel accommodation",
      "Daily breakfast and dinner",
      "Airport transfers",
      "City tours",
      "Bollywood studio visit", 
      "Spa session"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ]
  }
];

const Packages = () => {
  const theme = useTheme();
  const { user, isSignedIn } = useUserSafe();
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
        console.log('🔄 Fetching packages from API...');
        console.log('🔧 API endpoint:', import.meta.env.VITE_API_BASE_URL || 'Not set');
        console.log('🔧 Current environment:', import.meta.env.MODE);
        
        const data = await getAllPackages();
        console.log('✅ Successfully fetched packages:', data);
        setPackages(data);
        setError(null);
      } catch (error) {
        console.error('❌ Failed to fetch packages:', error);
        const errorMessage = error.message || 'Failed to fetch packages from server. Showing demo data.';
        setError(errorMessage);
        // Keep using mock data if fetch fails
        setPackages(MOCK_PACKAGES);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Load user's favorite packages
  useEffect(() => {
    const loadUserFavorites = async () => {
      if (!isSignedIn || !user) return;
      
      try {
        const favoritePromises = packages.map(pkg => checkIfLiked(pkg.id, user.id));
        const favoriteResults = await Promise.all(favoritePromises);
        const userFavorites = packages.filter((_, index) => favoriteResults[index]).map(pkg => pkg.id);
        setFavorites(userFavorites);
      } catch (error) {
        console.error('Failed to load user favorites:', error);
      }
    };
    
    if (packages.length > 0) {
      loadUserFavorites();
    }
  }, [isSignedIn, user, packages]);

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

  const handleFavoriteToggle = async (packageId) => {
    if (!isSignedIn) {
      alert('Please login to like packages');
      return;
    }
    
    try {
      const isCurrentlyLiked = favorites.includes(packageId);
      
      if (isCurrentlyLiked) {
        await unlikePackage(packageId, user.id);
        setFavorites(prev => prev.filter(id => id !== packageId));
      } else {
        await likePackage(packageId, user.id);
        setFavorites(prev => [...prev, packageId]);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      alert('Failed to update favorite. Please try again.');
    }
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
    <Box sx={{ 
      py: 8, 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        {/* Enhanced Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '4rem' },
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Luxury Hotel Packages
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto',
              mb: 4
            }}
          >
            Discover India's finest heritage hotels and luxury experiences
          </Typography>
          <Box
            sx={{
              width: 100,
              height: 4,
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              mx: 'auto',
              borderRadius: 2
            }}
          />
        </Box>

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

        {/* Enhanced Search and Filter Controls */}
        <Paper 
          elevation={8}
          sx={{ 
            p: 4, 
            mb: 6,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search luxury hotels by name or destination..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                      boxShadow: '0 4px 20px rgba(33, 150, 243, 0.2)'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
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
                  sx={{
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SortIcon color="primary" />
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
                variant={showFilters ? "contained" : "outlined"}
                onClick={toggleFilters}
                startIcon={<FilterIcon />}
                endIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  ...(showFilters ? {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  } : {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      borderColor: 'primary.dark'
                    }
                  })
                }}
              >
                Advanced Filters
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

        {/* Enhanced Results Summary */}
        <Box sx={{ 
          mb: 6,
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 3,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 40,
                background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                borderRadius: 1
              }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {filteredPackages.length} Luxury Packages Available
                {filters.search && ` for "${filters.search}"`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Curated collection of India's finest heritage hotels
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Enhanced Package Grid */}
        <Grid container spacing={4}>
          {currentPackages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg.id}>
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
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                    '& .card-image': {
                      transform: 'scale(1.1)'
                    },
                    '& .price-badge': {
                      transform: 'scale(1.05)'
                    }
                  },
                }}
              >
                {/* Image with overlay effects */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={pkg.image}
                    alt={pkg.name}
                    className="card-image"
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onError={(e) => {
                      console.log('Image failed to load:', pkg.image);
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
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)'
                    }}
                  />
                  
                  {/* Package type badge */}
                  <Chip
                    label={pkg.type}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      backgroundColor: 'rgba(33, 150, 243, 0.9)',
                      color: 'white',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  />
                  
                  {/* Favorite button */}
                  <IconButton
                    className="favorite-btn"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
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
                    onClick={() => handleFavoriteToggle(pkg.id)}
                  >
                    {favorites.includes(pkg.id) ? (
                      <FavoriteIcon sx={{ color: '#ff4757' }} />
                    ) : (
                      <FavoriteBorderIcon color="action" />
                    )}
                  </IconButton>
                </Box>
                {/* Enhanced Card Content */}
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: 'text.primary',
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {pkg.name}
                  </Typography>
                  
                  {/* Location with enhanced styling */}
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        p: 0.5,
                        borderRadius: 1,
                        backgroundColor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <LocationIcon sx={{ fontSize: 16, color: 'primary.main' }} />
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
                  </Stack>

                  {/* Duration with enhanced styling */}
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        p: 0.5,
                        borderRadius: 1,
                        backgroundColor: 'success.light',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <TimeIcon sx={{ fontSize: 16, color: 'success.main' }} />
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
                  </Stack>

                  {/* Rating with enhanced design */}
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <Rating 
                      value={pkg.rating} 
                      precision={0.1} 
                      size="small" 
                      readOnly
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
                  </Stack>

                  {/* Availability status */}
                  {availabilityMap[pkg.id] && (
                    <Alert 
                      severity={availabilityMap[pkg.id].available ? "success" : "warning"}
                      sx={{ 
                        mb: 2,
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        '& .MuiAlert-message': {
                          fontWeight: 500
                        }
                      }}
                      icon={false}
                    >
                      {availabilityMap[pkg.id].available 
                        ? `✓ ${availabilityMap[pkg.id].remainingSpots} spots available`
                        : "⚠️ Limited availability"}
                    </Alert>
                  )}

                  {/* Price section with enhanced styling */}
                  <Box
                    className="price-badge"
                    sx={{
                      mt: 'auto',
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        mb: 0.5
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
                </CardContent>

                {/* Enhanced Action Button */}
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button 
                    component={RouterLink} 
                    to={`/packages/${pkg.id}`}
                    variant="contained" 
                    fullWidth
                    size="large"
                    sx={{ 
                      borderRadius: 3,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={(e) => {
                      console.log(`🚀 Navigating to package ${pkg.id}`);
                      console.log(`🔗 URL: /packages/${pkg.id}`);
                    }}
                  >
                    Explore Package
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <Box 
            sx={{ 
              mt: 8, 
              display: 'flex', 
              justifyContent: 'center',
              p: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 4,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  margin: '0 4px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
                  }
                },
                '& .Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Packages; 