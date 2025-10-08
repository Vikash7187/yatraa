// API Configuration for different environments
const getApiBaseUrl = () => {
  // Check if we're in production
  if (import.meta.env.PROD) {
    // Try to get the API URL from environment variable first
    return import.meta.env.VITE_API_BASE_URL || 'https://yatraa-production.up.railway.app';
  }
  
  // Development environment
  return 'http://localhost:3003';
};

export const API_BASE_URL = getApiBaseUrl();
export const API_ENDPOINTS = {
  packages: `${API_BASE_URL}/api/packages`,
  bookings: `${API_BASE_URL}/api/bookings`,
  profiles: `${API_BASE_URL}/api/profiles`,
  checkAvailability: `${API_BASE_URL}/api/check-availability`,
  availableDates: `${API_BASE_URL}/api/available-dates`,
  health: `${API_BASE_URL}/health`,
  register: `${API_BASE_URL}/api/register`,
  login: `${API_BASE_URL}/api/login`
};

// Console log for debugging
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:', {
    environment: import.meta.env.MODE,
    baseUrl: API_BASE_URL,
    endpoints: API_ENDPOINTS
  });
}