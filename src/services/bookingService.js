import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.js';

export const checkAvailability = async (packageId, startDate, endDate, guests) => {
  try {
    const response = await axios.post(API_ENDPOINTS.checkAvailability, {
      packageId,
      startDate,
      endDate,
      guests
    });
    return response.data;
  } catch (error) {
    console.error('Failed to check availability:', error);
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
    const response = await axios.get(`${API_ENDPOINTS.packages}/${packageId}/price`, {
      params: { startDate, endDate, guests }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get dynamic price:', error);
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
    const response = await axios.post(API_ENDPOINTS.bookings, bookingData);
    return response.data;
  } catch (error) {
    console.error('Failed to create booking:', error);
    throw new Error('Failed to create booking');
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.bookings}?profileId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get user bookings:', error);
    throw new Error('Failed to get user bookings');
  }
};

export const getPackageById = async (packageId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.packages}/${packageId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get package details:', error);
    throw new Error('Failed to get package details');
  }
};

export const getAvailableDates = async (packageId, month, year) => {
  try {
    const response = await axios.get(API_ENDPOINTS.availableDates, {
      params: { packageId, month, year }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get available dates:', error);
    throw new Error('Failed to get available dates');
  }
}; 