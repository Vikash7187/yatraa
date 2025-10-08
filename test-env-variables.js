// Test file to verify environment variable usage
console.log('Testing environment variable access...');

// This is how we should access environment variables in Vite/React
console.log('import.meta.env.MODE:', import.meta.env.MODE);
console.log('import.meta.env.PROD:', import.meta.env.PROD);
console.log('import.meta.env.DEV:', import.meta.env.DEV);

// This would cause "process is not defined" error in browser
try {
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
} catch (error) {
  console.log('❌ process.env is not available in browser environment:', error.message);
}

console.log('✅ Test completed. Use import.meta.env instead of process.env in frontend code.');