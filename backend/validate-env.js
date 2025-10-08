// Environment variable validation script
console.log('🔍 Validating Environment Variables...\n');

// Required environment variables
const requiredEnvVars = ['NODE_ENV', 'PORT'];

// Optional environment variables
const optionalEnvVars = ['CORS_ORIGIN', 'LOG_LEVEL'];

console.log('✅ Required Environment Variables:');
requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value) {
    console.log(`  ${envVar}: ${value}`);
  } else {
    console.log(`  ${envVar}: ❌ NOT SET (using defaults)`);
  }
});

console.log('\nℹ️  Optional Environment Variables:');
optionalEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value) {
    console.log(`  ${envVar}: ${value}`);
  } else {
    console.log(`  ${envVar}: ❌ NOT SET`);
  }
});

console.log('\n📊 All Environment Variables (excluding sensitive ones):');
Object.keys(process.env).forEach(key => {
  // Skip sensitive environment variables
  if (!key.includes('KEY') && !key.includes('SECRET') && !key.includes('PASSWORD')) {
    console.log(`  ${key}: ${process.env[key]}`);
  }
});

console.log('\n✅ Environment variable validation complete.');