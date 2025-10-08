import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

export const register = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error; // Throw the original error to preserve error details
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error; // Throw the original error to preserve error details
  }
};


