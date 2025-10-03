// Test script to verify API endpoints
const testEndpoints = async (baseUrl) => {
  console.log(`🧪 Testing API at: ${baseUrl}`);
  
  const endpoints = [
    { path: '/', name: 'Health Check' },
    { path: '/api/packages', name: 'Packages API' },
    { path: '/api/packages/1', name: 'Single Package' }
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${baseUrl}${endpoint.path}`);
      const data = await response.json();
      console.log(`✅ ${endpoint.name}: ${response.status} - ${response.ok ? 'OK' : 'Failed'}`);
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Error - ${error.message}`);
    }
  }
};

// Usage: node test-api.js <your-railway-url>
const apiUrl = process.argv[2] || 'http://localhost:3002';
testEndpoints(apiUrl);