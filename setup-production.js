#!/usr/bin/env node

// Quick setup script for production deployment
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Yatraa Deployment Setup');
console.log('============================');

rl.question('Enter your Railway backend URL (e.g., https://backend-production-xxxx.up.railway.app): ', (railwayUrl) => {
  rl.question('Enter your Clerk publishable key (pk_test_...): ', (clerkKey) => {
    
    // Update .env file
    const envContent = `# Production Environment Variables
VITE_CLERK_PUBLISHABLE_KEY=${clerkKey}
VITE_API_BASE_URL=${railwayUrl}
`;
    
    fs.writeFileSync('.env', envContent);
    console.log('✅ Updated .env file');
    
    // Create netlify env vars instructions
    const netlifyInstructions = `
📋 NETLIFY ENVIRONMENT VARIABLES
Copy these to Netlify Site Settings → Environment Variables:

VITE_CLERK_PUBLISHABLE_KEY=${clerkKey}
VITE_API_BASE_URL=${railwayUrl}

🚀 NEXT STEPS:
1. Run: npm run build
2. Drag dist folder to Netlify
3. Add environment variables above
4. Redeploy on Netlify
`;
    
    fs.writeFileSync('NETLIFY_ENV_VARS.txt', netlifyInstructions);
    console.log('✅ Created NETLIFY_ENV_VARS.txt with instructions');
    
    console.log('\n🎉 Setup complete!');
    console.log('📋 Next: npm run build');
    
    rl.close();
  });
});