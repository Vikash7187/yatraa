import axios from 'axios';

// Replace with your actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const checkAvailability = async (packageId, startDate, endDate, guests) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages/${packageId}/availability`, {
      params: { startDate, endDate, guests }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to check availability');
  }
};

export const getDynamicPrice = async (packageId, startDate, endDate, guests) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages/${packageId}/price`, {
      params: { startDate, endDate, guests }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get dynamic price');
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create booking');
  }
};

export const getAvailableDates = async (packageId, month, year) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages/${packageId}/available-dates`, {
      params: { month, year }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get available dates');
  }
}; 