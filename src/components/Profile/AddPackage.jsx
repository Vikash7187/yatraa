import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Save as SaveIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { createPackage } from '../../services/packageService';

const steps = ['Basic Information', 'Details & Amenities', 'Review & Submit'];

const categories = [
  'Palace',
  'Resort',
  'Ultra Luxury',
  'Boutique',
  'Adventure',
  'Beach',
  'Mountain',
  'Cultural',
  'Wellness'
];

const mealPlans = [
  'Room Only',
  'Breakfast Included',
  'Breakfast & Dinner',
  'All Inclusive'
];

const commonAmenities = [
  'Swimming Pool',
  'Spa',
  'Gym',
  'Restaurant',
  'Bar',
  'WiFi',
  'Air Conditioning',
  'Room Service',
  'Parking',
  'Airport Transfer',
  'Beach Access',
  'Mountain View',
  'Sea View',
  'Garden View'
];

const AddPackage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    duration: '',
    description: '',
    category: '',
    mealPlan: '',
    rating: 4.5,
    image: '',
    amenities: [],
    rooms: [],
    activities: [],
    newAmenity: '',
    newRoom: '',
    newActivity: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handleAddItem = (arrayField, inputField) => {
    const newItem = formData[inputField].trim();
    if (newItem && !formData[arrayField].includes(newItem)) {
      setFormData({
        ...formData,
        [arrayField]: [...formData[arrayField], newItem],
        [inputField]: ''
      });
    }
  };

  const handleRemoveItem = (arrayField, index) => {
    const newArray = formData[arrayField].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [arrayField]: newArray
    });
  };

  const handleAmenitySelect = (amenity) => {
    if (!formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity]
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.name) newErrors.name = 'Package name is required';
      if (!formData.location) newErrors.location = 'Location is required';
      if (!formData.price) newErrors.price = 'Price is required';
      else if (isNaN(formData.price) || formData.price <= 0) {
        newErrors.price = 'Price must be a valid positive number';
      }
      if (!formData.duration) newErrors.duration = 'Duration is required';
      if (!formData.category) newErrors.category = 'Category is required';
    }

    if (step === 1) {
      if (!formData.description) newErrors.description = 'Description is required';
      if (!formData.mealPlan) newErrors.mealPlan = 'Meal plan is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      
      const packageData = {
        name: formData.name,
        location: formData.location,
        price: parseInt(formData.price),
        duration: formData.duration,
        rating: formData.rating,
        image: formData.image || '/images/packages/default.jpg',
        mealPlan: formData.mealPlan,
        description: formData.description,
        amenities: formData.amenities,
        category: formData.category,
        rooms: formData.rooms.length > 0 ? formData.rooms : ['Standard Room'],
        activities: formData.activities
      };

      await createPackage(packageData);
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setActiveStep(0);
        setFormData({
          name: '',
          location: '',
          price: '',
          duration: '',
          description: '',
          category: '',
          mealPlan: '',
          rating: 4.5,
          image: '',
          amenities: [],
          rooms: [],
          activities: [],
          newAmenity: '',
          newRoom: '',
          newActivity: ''
        });
      }, 3000);
      
    } catch (error) {
      console.error('Failed to create package:', error);
      setError('Failed to create package. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Package Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: <StarIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={handleInputChange('location')}
                error={!!errors.location}
                helperText={errors.location}
                InputProps={{
                  startAdornment: <LocationIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price (₹)"
                type="number"
                value={formData.price}
                onChange={handleInputChange('price')}
                error={!!errors.price}
                helperText={errors.price}
                InputProps={{
                  startAdornment: <MoneyIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration (e.g., 3 Days / 2 Nights)"
                value={formData.duration}
                onChange={handleInputChange('duration')}
                error={!!errors.duration}
                helperText={errors.duration}
                InputProps={{
                  startAdornment: <CalendarIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleInputChange('category')}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rating (1-5)"
                type="number"
                inputProps={{ min: 1, max: 5, step: 0.1 }}
                value={formData.rating}
                onChange={handleInputChange('rating')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL (optional)"
                value={formData.image}
                onChange={handleInputChange('image')}
                helperText="Provide a URL to an image for your package"
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange('description')}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.mealPlan}>
                <InputLabel>Meal Plan</InputLabel>
                <Select
                  value={formData.mealPlan}
                  onChange={handleInputChange('mealPlan')}
                >
                  {mealPlans.map((plan) => (
                    <MenuItem key={plan} value={plan}>
                      {plan}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Amenities Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Amenities
              </Typography>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Select from common amenities:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {commonAmenities.map((amenity) => (
                    <Chip
                      key={amenity}
                      label={amenity}
                      onClick={() => handleAmenitySelect(amenity)}
                      variant={formData.amenities.includes(amenity) ? 'filled' : 'outlined'}
                      color={formData.amenities.includes(amenity) ? 'primary' : 'default'}
                      size="small"
                    />
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    size="small"
                    label="Add custom amenity"
                    value={formData.newAmenity}
                    onChange={handleInputChange('newAmenity')}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddItem('amenities', 'newAmenity');
                      }
                    }}
                  />
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem('amenities', 'newAmenity')}
                  >
                    Add
                  </Button>
                </Box>
                
                {formData.amenities.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Selected amenities:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {formData.amenities.map((amenity, index) => (
                        <Chip
                          key={index}
                          label={amenity}
                          onDelete={() => handleRemoveItem('amenities', index)}
                          color="primary"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Room Types Section */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Room Types
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                <TextField
                  size="small"
                  label="Add room type"
                  value={formData.newRoom}
                  onChange={handleInputChange('newRoom')}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddItem('rooms', 'newRoom');
                    }
                  }}
                />
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddItem('rooms', 'newRoom')}
                >
                  Add
                </Button>
              </Box>
              {formData.rooms.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.rooms.map((room, index) => (
                    <Chip
                      key={index}
                      label={room}
                      onDelete={() => handleRemoveItem('rooms', index)}
                      color="secondary"
                      size="small"
                    />
                  ))}
                </Box>
              )}
            </Grid>

            {/* Activities Section */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Activities
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                <TextField
                  size="small"
                  label="Add activity"
                  value={formData.newActivity}
                  onChange={handleInputChange('newActivity')}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddItem('activities', 'newActivity');
                    }
                  }}
                />
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddItem('activities', 'newActivity')}
                >
                  Add
                </Button>
              </Box>
              {formData.activities.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.activities.map((activity, index) => (
                    <Chip
                      key={index}
                      label={activity}
                      onDelete={() => handleRemoveItem('activities', index)}
                      color="info"
                      size="small"
                    />
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Package
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Package Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formData.name}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formData.location}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary">
                    Price
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    ₹{parseInt(formData.price).toLocaleString()}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formData.duration}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {formData.category}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {formData.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary">
                    Meal Plan
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formData.mealPlan}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary">
                    Rating
                  </Typography>
                  <Typography variant="body1">
                    {formData.rating} ⭐
                  </Typography>
                </Paper>
              </Grid>
              
              {formData.amenities.length > 0 && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Amenities
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {formData.amenities.map((amenity, index) => (
                        <Chip key={index} label={amenity} size="small" />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Package Created Successfully!
          </Typography>
          <Typography>
            Your travel package has been added to the system.
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Travel Package
      </Typography>
      
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {renderStepContent(activeStep)}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0 || loading}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : (activeStep === steps.length - 1 ? <SaveIcon /> : null)}
            >
              {loading ? 'Creating...' : (activeStep === steps.length - 1 ? 'Create Package' : 'Next')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddPackage;