// Simple script to test API connection
const testApiConnection = async () => {
  const API_URL = 'https://yatraa-production.up.railway.app';
  
  console.log('Testing API connection to:', API_URL);
  
  try {
    // Test health endpoint
    console.log('Testing /health endpoint...');
    const healthResponse = await fetch(`${API_URL}/health`);
    console.log('Health check status:', healthResponse.status);
    console.log('Health check response:', await healthResponse.json());
    
    // Test packages endpoint
    console.log('Testing /api/packages endpoint...');
    const packagesResponse = await fetch(`${API_URL}/api/packages`);
    console.log('Packages endpoint status:', packagesResponse.status);
    
    if (packagesResponse.ok) {
      const packages = await packagesResponse.json();
      console.log('Successfully fetched', packages.length, 'packages');
      console.log('First package:', packages[0]?.name);
    } else {
      console.error('Failed to fetch packages:', packagesResponse.status, packagesResponse.statusText);
    }
  } catch (error) {
    console.error('Connection test failed:', error.message);
  }
};

// Run the test
testApiConnection();