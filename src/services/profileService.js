import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api';

export const getProfile = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/profiles/${id}`);
  return response.data;
};

export const getProfileByClerk = async (clerkUserId) => {
  const response = await axios.get(`${API_BASE_URL}/profiles/by-clerk/${clerkUserId}`);
  return response.data;
};

export const updateProfile = async (id, profileData) => {
  const response = await axios.put(`${API_BASE_URL}/profiles/${id}`, profileData);
  return response.data;
};

export const createProfile = async (profileData) => {
  const response = await axios.post(`${API_BASE_URL}/profiles`, profileData);
  return response.data;
};


