import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

export const register = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw new Error('Failed to register');
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw new Error('Failed to login');
  }
};


