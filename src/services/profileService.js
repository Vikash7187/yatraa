import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.js';

export const getProfile = async (id) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.profiles}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get profile:', error);
    throw new Error('Failed to get profile');
  }
};

export const getProfileByClerk = async (clerkUserId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.profiles}/by-clerk/${clerkUserId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get profile by Clerk ID:', error);
    throw new Error('Failed to get profile by Clerk ID');
  }
};

export const updateProfile = async (id, profileData) => {
  try {
    const response = await axios.put(`${API_ENDPOINTS.profiles}/${id}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw new Error('Failed to update profile');
  }
};

export const createProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.profiles}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Failed to create profile:', error);
    throw new Error('Failed to create profile');
  }
};


