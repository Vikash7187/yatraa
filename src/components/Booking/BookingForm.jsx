import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  styled,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CreditCard as CreditCardIcon,
  LocationOn as LocationIcon,
  EventNote as EventNoteIcon,
  Payment as PaymentIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUserSafe } from '../../hooks/useClerkSafe';
import { format, addMonths, startOfMonth } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { checkAvailability, getDynamicPrice, createBooking, getAvailableDates } from '../../services/bookingService';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

const BookingSummaryCard = styled(Card)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
}));

const IconTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputAdornment-root': {
    marginRight: theme.spacing(1),
  },
}));

const steps = ['Personal Details', 'Travel Information', 'Payment'];

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { user: clerkUser, isSignedIn } = useUserSafe();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Travel Information
    startDate: '',
    endDate: '',
    guests: 1,
    specialRequests: '',
    
    // Payment
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [dynamicPrice, setDynamicPrice] = useState(null);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    // Pre-fill user data if available
    if (clerkUser) {
      setFormData(prev => ({
        ...prev,
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
      }));
    }
  }, [clerkUser]);

  useEffect(() => {
    // Fetch package details based on ID (replace with actual API call)
    const fetchedPackage = {
      id: 1,
      name: "Romantic Bali Getaway",
      location: "Bali, Indonesia",
      price: 1299,
      image: "/images/destinations/bali.jpg",
      duration: 7,
    };
    setPackageDetails(fetchedPackage);
  }, [id]);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      if (!id) return;
      try {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const dates = await getAvailableDates(id, currentMonth, currentYear);
        setAvailableDates(dates);
      } catch (error) {
        console.error('Failed to fetch available dates:', error);
      }
    };
    fetchAvailableDates();
  }, [id]);

  useEffect(() => {
    const checkDynamicPrice = async () => {
      if (!formData.startDate || !formData.endDate || !formData.guests) return;
      
      try {
        setLoading(true);
        const [availabilityData, priceData] = await Promise.all([
          checkAvailability(id, formData.startDate, formData.endDate, formData.guests),
          getDynamicPrice(id, formData.startDate, formData.endDate, formData.guests)
        ]);
        
        setAvailability(availabilityData);
        setDynamicPrice(priceData);
      } catch (error) {
        console.error('Failed to fetch dynamic data:', error);
      } finally {
        setLoading(false);
      }
    };

    checkDynamicPrice();
  }, [id, formData.startDate, formData.endDate, formData.guests]);

  const handleInputChange = (field) => (event) => {
    const value = event?.target?.value ?? event;
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

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    }

    if (step === 1) {
      if (!formData.startDate) newErrors.startDate = 'Start date is required';
      if (!formData.endDate) newErrors.endDate = 'End date is required';
      if (formData.guests < 1) newErrors.guests = 'At least 1 guest is required';
    }

    if (step === 2 && formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
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
      if (!isSignedIn) { 
        navigate('/login'); 
        return; 
      }
      
      const bookingResponse = await createBooking({
        ...formData,
        packageId: id,
        profileId: user?.id,
        clerkUserId: clerkUser?.id,
        totalPrice: dynamicPrice?.total || (packageDetails?.price * formData.guests) || 0,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`
      });
      
      // Navigate to profile page with success message
      navigate('/profile', { 
        state: { 
          bookingConfirmed: true,
          bookingDetails: bookingResponse,
          message: 'Booking confirmed successfully! You can view your booking details below.'
        } 
      });
    } catch (error) {
      console.error('Booking failed:', error);
      setErrors({
        ...errors,
        submit: 'Failed to create booking. Please try again.',
      });
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
              <IconTextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  startAdornment: <PersonIcon color="action" />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <IconTextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputProps={{
                  startAdornment: <PersonIcon color="action" />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <IconTextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: <EmailIcon color="action" />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <IconTextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: <PhoneIcon color="action" />,
                }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {availability && !availability.available && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Selected dates are not available. Please choose different dates.
                </Alert>
              )}
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate ? new Date(formData.startDate) : null}
                  onChange={(newValue) => {
                    handleInputChange('startDate')(format(newValue, 'yyyy-MM-dd'));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.startDate}
                      helperText={errors.startDate}
                    />
                  )}
                  disablePast
                  shouldDisableDate={(date) => !availableDates.includes(format(date, 'yyyy-MM-dd'))}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate ? new Date(formData.endDate) : null}
                  onChange={(newValue) => {
                    handleInputChange('endDate')(format(newValue, 'yyyy-MM-dd'));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.endDate}
                      helperText={errors.endDate}
                    />
                  )}
                  disablePast
                  minDate={formData.startDate ? new Date(formData.startDate) : null}
                  shouldDisableDate={(date) => !availableDates.includes(format(date, 'yyyy-MM-dd'))}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <IconTextField
                fullWidth
                label="Number of Guests"
                type="number"
                value={formData.guests}
                onChange={handleInputChange('guests')}
                error={!!errors.guests}
                helperText={errors.guests}
                InputProps={{
                  startAdornment: <PersonIcon color="action" />,
                  inputProps: { min: 1, max: availability?.maxGuests || 10 },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <IconTextField
                fullWidth
                label="Special Requirements"
                multiline
                rows={4}
                value={formData.specialRequests}
                onChange={handleInputChange('specialRequests')}
                InputProps={{
                  startAdornment: <EventNoteIcon color="action" sx={{ alignSelf: 'flex-start', mt: 1 }} />,
                }}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Payment Method</FormLabel>
                <RadioGroup
                  row
                  value={formData.paymentMethod}
                  onChange={handleInputChange('paymentMethod')}
                >
                  <FormControlLabel
                    value="credit_card"
                    control={<Radio />}
                    label="Credit Card"
                  />
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="PayPal"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {formData.paymentMethod === 'credit_card' && (
              <>
                <Grid item xs={12}>
                  <IconTextField
                    fullWidth
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange('cardNumber')}
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber}
                    InputProps={{
                      startAdornment: <CreditCardIcon color="action" />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconTextField
                    fullWidth
                    label="Cardholder Name"
                    value={formData.cardName}
                    onChange={handleInputChange('cardName')}
                    error={!!errors.cardName}
                    helperText={errors.cardName}
                    InputProps={{
                      startAdornment: <PersonIcon color="action" />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange('expiryDate')}
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange('cvv')}
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                    type="password"
                    inputProps={{ maxLength: 4 }}
                  />
                </Grid>
              </>
            )}

            {formData.paymentMethod === 'paypal' && (
              <Grid item xs={12}>
                <Alert severity="info">
                  You will be redirected to PayPal to complete your payment.
                </Alert>
              </Grid>
            )}
          </Grid>
        );

      default:
        return null;
    }
  };

  if (!packageDetails) {
    return (
      <Container>
        <Box sx={{ py: 8 }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
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
          }}
        >
          Book Your Trip
        </Typography>

        <Grid container spacing={4}>
          {/* Booking Form */}
          <Grid item xs={12} md={8}>
            <StyledPaper>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {errors.submit && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {errors.submit}
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
                  disabled={loading || (activeStep === 1 && (!availability?.available))}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'
                  )}
                </Button>
              </Box>
            </StyledPaper>
          </Grid>

          {/* Booking Summary */}
          <Grid item xs={12} md={4}>
            <BookingSummaryCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Booking Summary
                </Typography>
                
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Package
                    </Typography>
                    <Typography variant="body1">
                      {packageDetails.name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocationIcon color="primary" fontSize="small" />
                      <Typography variant="body1">
                        {packageDetails.location}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Duration
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarIcon color="primary" fontSize="small" />
                      <Typography variant="body1">
                        {packageDetails.duration} days
                      </Typography>
                    </Stack>
                  </Box>

                  <Divider />

                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle1">
                          Price per person
                        </Typography>
                        {dynamicPrice?.isDiscounted && (
                          <Tooltip title="Special seasonal price!">
                            <InfoIcon color="primary" fontSize="small" />
                          </Tooltip>
                        )}
                      </Stack>
                      <Typography variant="h6" color="primary.main">
                        ${dynamicPrice?.perPerson || packageDetails.price}
                      </Typography>
                    </Stack>
                  </Box>

                  {formData.guests > 0 && (
                    <>
                      <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle1">
                            Total ({formData.guests} {formData.guests === 1 ? 'guest' : 'guests'})
                          </Typography>
                          <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600 }}>
                            ${dynamicPrice?.total || (packageDetails.price * formData.guests)}
                          </Typography>
                        </Stack>
                        {dynamicPrice?.breakdown && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Price breakdown:
                            </Typography>
                            {Object.entries(dynamicPrice.breakdown).map(([key, value]) => (
                              <Typography key={key} variant="body2" color="text.secondary">
                                {key}: ${value}
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Box>
                    </>
                  )}

                  {availability && (
                    <Alert 
                      severity={availability.available ? "success" : "warning"}
                      sx={{ mt: 2 }}
                    >
                      {availability.available 
                        ? `${availability.remainingSpots} spots remaining for selected dates!`
                        : "Selected dates are not available"}
                    </Alert>
                  )}
                </Stack>
              </CardContent>
            </BookingSummaryCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookingForm;