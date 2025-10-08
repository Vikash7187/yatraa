import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.js';

export const checkAvailability = async (packageId, startDate, endDate, guests) => {
  try {
    console.log(`🔍 Checking availability for package ${packageId}: ${startDate} to ${endDate} for ${guests} guests`);
    const response = await axios.post(API_ENDPOINTS.checkAvailability, {
      packageId,
      startDate,
      endDate,
      guests
    });
    console.log(`✅ Availability check completed:`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to check availability:', error);
    // Return default availability if API fails
    return {
      available: true,
      remainingSpots: 5,
      maxGuests: 10
    };
  }
};

export const getDynamicPrice = async (packageId, startDate, endDate, guests) => {
  try {
    console.log(`🔍 Getting dynamic price for package ${packageId}: ${startDate} to ${endDate} for ${guests} guests`);
    const response = await axios.get(`${API_ENDPOINTS.packages}/${packageId}/price`, {
      params: { startDate, endDate, guests }
    });
    console.log(`✅ Dynamic price fetched:`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to get dynamic price:', error);
    // Return default price if API fails
    return {
      perPerson: 1000,
      total: 1000 * (guests || 1),
      isDiscounted: false
    };
  }
};

export const createBooking = async (bookingData) => {
  try {
    console.log('📥 Creating booking with data:', bookingData);
    const response = await axios.post(API_ENDPOINTS.bookings, bookingData);
    console.log('✅ Booking created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to create booking:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data
    });
    
    // More detailed error handling
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 400:
          if (error.response.data?.error?.includes('Package')) {
            throw new Error('Package not found. Please select a valid package.');
          }
          throw new Error('Invalid booking data. Please check all required fields.');
        case 401:
          throw new Error('Unauthorized. Please log in to create a booking.');
        case 404:
          throw new Error('Package not found.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(`Booking failed: ${error.response.statusText || error.message}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      // Something else happened
      throw new Error('Failed to create booking. Please try again.');
    }
  }
};

export const getUserBookings = async (userId) => {
  try {
    console.log(`🔍 Fetching bookings for user ${userId}`);
    const response = await axios.get(`${API_ENDPOINTS.bookings}?profileId=${userId}`);
    console.log(`✅ Found ${response.data.length} bookings for user ${userId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to get user bookings:', error);
    throw new Error('Failed to get user bookings');
  }
};

export const getPackageById = async (packageId) => {
  try {
    console.log(`🔍 Fetching package details for ID: ${packageId}`);
    const response = await axios.get(`${API_ENDPOINTS.packages}/${packageId}`);
    console.log(`✅ Package details fetched:`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to get package details:', error);
    throw new Error('Failed to get package details');
  }
};

export const getAvailableDates = async (packageId, month, year) => {
  try {
    console.log(`🔍 Fetching available dates for package ${packageId}: ${month}/${year}`);
    const response = await axios.get(API_ENDPOINTS.availableDates, {
      params: { packageId, month, year }
    });
    console.log(`✅ Available dates fetched:`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to get available dates:', error);
    throw new Error('Failed to get available dates');
  }
};