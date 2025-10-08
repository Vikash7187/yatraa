import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.js';

// Add axios defaults for better error handling
axios.defaults.timeout = 15000; // 15 second timeout

export const getAllPackages = async () => {
  try {
    console.log('🔄 Attempting to fetch packages from:', API_ENDPOINTS.packages);
    
    // Log the base URL for debugging
    console.log('🔧 API Base URL:', import.meta.env.VITE_API_BASE_URL || 'Not set');
    console.log('🔧 Current environment:', import.meta.env.MODE);
    
    const response = await axios.get(API_ENDPOINTS.packages, {
      // Add timeout and retry configuration
      timeout: 15000,
    });
    
    console.log('✅ Successfully fetched packages:', response.data.length, 'packages');
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch packages:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      code: error.code,
      timeout: error.timeout
    });
    
    // More detailed error handling
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - server took too long to respond (15s timeout)');
    }
    
    if (!error.response) {
      throw new Error(`Network error - could not connect to server at ${API_ENDPOINTS.packages}`);
    }
    
    // Handle specific HTTP status codes
    switch (error.response?.status) {
      case 404:
        throw new Error('API endpoint not found - check if backend server is running');
      case 500:
        throw new Error('Server error - backend encountered an issue');
      case 502:
      case 503:
        throw new Error('Service unavailable - backend server may be down');
      default:
        throw new Error(`Failed to fetch packages: ${error.response?.statusText || error.message} (${error.response?.status})`);
    }
  }
};

export const getPackageById = async (id) => {
  try {
    console.log(`🔍 Fetching package details for ID: ${id}`);
    console.log(`🔗 API endpoint: ${API_ENDPOINTS.packages}/${id}`);
    
    const response = await axios.get(`${API_ENDPOINTS.packages}/${id}`);
    console.log(`✅ Successfully fetched package ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to fetch package details for ID ${id}:`, error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      code: error.code
    });
    
    // More detailed error handling
    if (error.code === 'ECONNABORTED') {
      throw new Error(`Request timeout - server took too long to respond for package ${id}`);
    }
    
    if (!error.response) {
      throw new Error(`Network error - could not connect to server for package ${id}`);
    }
    
    // Handle specific HTTP status codes
    switch (error.response?.status) {
      case 404:
        throw new Error(`Package with ID ${id} not found`);
      case 500:
        throw new Error('Server error - backend encountered an issue');
      case 502:
      case 503:
        throw new Error('Service unavailable - backend server may be down');
      default:
        throw new Error(`Failed to fetch package: ${error.response?.statusText || error.message} (${error.response?.status})`);
    }
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