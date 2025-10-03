import https from 'https';

// Common Railway URL patterns based on your service ID
const serviceId = '1fc9e32d-53c7-46ce-b4b3-0d3669893e84';
const shortId = serviceId.substring(0, 8); // First 8 chars

const possibleUrls = [
  `https://web-production-${shortId}.up.railway.app`,
  `https://backend-production-${shortId}.up.railway.app`,
  `https://yatraa-production-${shortId}.up.railway.app`,
  `https://yatraa-backend-production.up.railway.app`,
  `https://web-production.up.railway.app`
];

console.log('🔍 Testing possible Railway URLs...\n');

async function testUrl(url) {
  return new Promise((resolve) => {
    const request = https.get(url, (response) => {
      console.log(`✅ Found: ${url} (Status: ${response.statusCode})`);
      resolve(url);
    });
    
    request.on('error', () => {
      console.log(`❌ Not found: ${url}`);
      resolve(null);
    });
    
    request.setTimeout(5000, () => {
      request.destroy();
      console.log(`⏰ Timeout: ${url}`);
      resolve(null);
    });
  });
}

async function findWorkingUrl() {
  for (const url of possibleUrls) {
    const result = await testUrl(url);
    if (result) {
      console.log(`\n🎉 Your Railway URL is: ${result}`);
      return result;
    }
  }
  console.log('\n🤔 No URLs responded. Check Railway dashboard for the exact URL.');
}

findWorkingUrl();