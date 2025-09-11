import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const getProfile = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/profiles/${id}`);
  return response.data;
};

export const getProfileByClerk = async (clerkUserId) => {
  const response = await axios.get(`${API_BASE_URL}/profiles/by-clerk/${clerkUserId}`);
  return response.data;
};


