import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.js';

export const getAllPackages = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.packages);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch packages:', error);
    throw new Error('Failed to fetch packages');
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