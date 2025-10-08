import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.js';

// Add axios defaults for better error handling
axios.defaults.timeout = 10000; // 10 second timeout

export const getAllPackages = async () => {
  try {
    console.log('🔄 Attempting to fetch packages from:', API_ENDPOINTS.packages);
    const response = await axios.get(API_ENDPOINTS.packages);
    console.log('✅ Successfully fetched packages:', response.data.length, 'packages');
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch packages:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      code: error.code,
      timeout: error.timeout
    });
    
    // More detailed error handling
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - server took too long to respond');
    }
    
    if (!error.response) {
      throw new Error('Network error - could not connect to server');
    }
    
    throw new Error(`Failed to fetch packages: ${error.response?.statusText || error.message}`);
  }
};

export const getPackageById = async (id) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.packages}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch package details:', error);
    throw new Error('Failed to fetch package details');
  }
};

export const createPackage = async (packageData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.packages, packageData);
    return response.data;
  } catch (error) {
    console.error('Failed to create package:', error);
    throw new Error('Failed to create package');
  }
};

export const updatePackage = async (id, packageData) => {
  try {
    const response = await axios.put(`${API_ENDPOINTS.packages}/${id}`, packageData);
    return response.data;
  } catch (error) {
    console.error('Failed to update package:', error);
    throw new Error('Failed to update package');
  }
};

export const deletePackage = async (id) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.packages}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete package:', error);
    throw new Error('Failed to delete package');
  }
};

// Package liking functionality
export const likePackage = async (packageId, userId) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.packages}/${packageId}/like`, {
      userId,
      clerkUserId: userId
    });
    return response.data;
  } catch (error) {
    console.error('Failed to like package:', error);
    throw new Error('Failed to like package');
  }
};

export const unlikePackage = async (packageId, userId) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.packages}/${packageId}/like`, {
      data: {
        userId,
        clerkUserId: userId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to unlike package:', error);
    throw new Error('Failed to unlike package');
  }
};

export const checkIfLiked = async (packageId, userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.packages}/${packageId}/liked`, {
      params: {
        userId,
        clerkUserId: userId
      }
    });
    return response.data.liked;
  } catch (error) {
    console.error('Failed to check if package is liked:', error);
    return false;
  }
};