import fetch from 'node-fetch';

// Your Railway service details
const serviceId = '1fc9e32d-53c7-46ce-b4b3-0d3669893e84';
const projectId = 'f58a8e0c-f6c3-4e48-b77e-a5ce01c2d6ab';

// Possible Railway URL patterns
const possibleUrls = [
  `https://web-production-${serviceId.substring(0, 8)}.up.railway.app`,
  `https://backend-production-${serviceId.substring(0, 8)}.up.railway.app`,
  `https://yatraa-production-${serviceId.substring(0, 8)}.up.railway.app`,
  `https://${projectId.substring(0, 8)}.up.railway.app`,
  `https://yatraa-backend.up.railway.app`,
  `https://web-production.up.railway.app`
];

console.log('🔍 Testing Railway deployment URLs...\n');

async function testRailwayUrl(url) {
  try {
    console.log(`Testing: ${url}`);
    const response = await fetch(url, { 
      method: 'GET',
      timeout: 5000,
      headers: {
        'User-Agent': 'Railway-Test/1.0'
      }
    });
    
    if (response.ok) {
      const data = await response.text();
      console.log(`✅ SUCCESS: ${url}`);
      console.log(`Status: ${response.status}`);
      console.log(`Response: ${data.substring(0, 100)}...\n`);
      return url;
    } else {
      console.log(`❌ Failed: ${url} (Status: ${response.status})\n`);
    }
  } catch (error) {
    console.log(`❌ Error: ${url} - ${error.message}\n`);
  }
  return null;
}

async function findWorkingUrl() {
  console.log('🚀 Your Railway deployment is running on port 8080');
  console.log('📡 Searching for the correct public URL...\n');
  
  for (const url of possibleUrls) {
    const workingUrl = await testRailwayUrl(url);
    if (workingUrl) {
      console.log(`🎉 FOUND WORKING URL: ${workingUrl}`);
      console.log(`📦 Test packages API: ${workingUrl}/api/packages`);
      return workingUrl;
    }
  }
  
  console.log('🤔 No working URLs found automatically.');
  console.log('📋 Please check Railway dashboard for the correct domain.');
  console.log('💡 Go to: Railway Dashboard → Your Service → Settings → Domains');
}

findWorkingUrl();