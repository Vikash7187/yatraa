import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api';

export const getAllPackages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch packages');
  }
};

export const getPackageById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch package details');
  }
};

export const createPackage = async (packageData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/packages`, packageData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create package');
  }
};

export const updatePackage = async (id, packageData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/packages/${id}`, packageData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update package');
  }
};

export const deletePackage = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/packages/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete package');
  }
};