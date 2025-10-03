import fs from 'fs';

// Function to update frontend with Railway URL
function updateFrontendConfig(railwayUrl) {
  console.log('🔧 Updating frontend configuration...');
  
  // Update .env file
  const envContent = `# Production Environment Variables
VITE_CLERK_PUBLISHABLE_KEY=pk_test_demo_key
VITE_API_BASE_URL=${railwayUrl}
`;
  
  fs.writeFileSync('.env', envContent);
  console.log('✅ Updated .env file');
  
  // Create instructions for Netlify
  const netlifyInstructions = `
🚀 NETLIFY DEPLOYMENT INSTRUCTIONS

1. Build frontend:
   npm run build

2. Deploy to Netlify:
   - Go to https://netlify.com
   - Drag 'dist' folder to deploy area

3. Configure Environment Variables:
   Site Settings → Environment Variables → Add:
   
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_demo_key
   VITE_API_BASE_URL=${railwayUrl}

4. Redeploy after adding variables

Your Railway API: ${railwayUrl}
Test endpoints:
- Health: ${railwayUrl}/
- Packages: ${railwayUrl}/api/packages
`;
  
  fs.writeFileSync('NETLIFY_INSTRUCTIONS.txt', netlifyInstructions);
  console.log('✅ Created Netlify instructions');
  console.log('📋 Next step: npm run build');
}

// Get Railway URL from command line argument
const railwayUrl = process.argv[2];

if (!railwayUrl) {
  console.log('❌ Please provide Railway URL');
  console.log('Usage: node update-frontend.js https://your-railway-url.up.railway.app');
} else {
  updateFrontendConfig(railwayUrl);
}