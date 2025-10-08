# 🕐 Timeout Issue Troubleshooting Guide

This guide helps diagnose and resolve the "Request timeout - server took too long to respond (15s timeout)" error.

## 🔍 Common Causes

### 1. CORS Issues
When the frontend cannot properly communicate with the backend due to CORS restrictions, requests can hang and eventually timeout.

### 2. Network Connectivity Issues
- DNS resolution problems
- Firewall restrictions
- Network latency

### 3. Server Performance Issues
- High server load
- Resource constraints
- Blocking operations

### 4. Incorrect API Configuration
- Wrong API base URL
- Missing environment variables
- Incorrect endpoint paths

## 🛠️ Solutions Applied

### 1. Enhanced CORS Configuration
Modified the backend CORS configuration to be more permissive in production:

```javascript
// NEW: Allow all origins in production to prevent CORS issues
if (process.env.NODE_ENV === 'production') {
  console.log(`⚠️  Production mode: Allowing CORS for origin: ${origin}`);
  return callback(null, true);
}
```

### 2. Added Detailed Logging
Added comprehensive logging to help diagnose issues:

```javascript
app.get('/api/packages', (req, res) => {
  console.log(`📦 Packages requested from ${req.headers.origin || 'unknown origin'}`);
  console.log(`🌐 Request headers:`, req.headers);
  // ... rest of the implementation
});
```

### 3. Environment Variable Verification
Ensure all environment variables are correctly set:
- [VITE_API_BASE_URL](file:///C:/Users/suhan/yatraa/.env.example#L12-L12) should point to your Render backend
- [VITE_CLERK_PUBLISHABLE_KEY](file:///C:/Users/suhan/yatraa/vercel.env#L4-L4) should be valid

## 🧪 Testing Steps

### 1. Verify Backend Health
```bash
curl https://yatraa-2.onrender.com/health
```

### 2. Test Packages Endpoint
```bash
curl https://yatraa-2.onrender.com/api/packages
```

### 3. Test Specific Package
```bash
curl https://yatraa-2.onrender.com/api/packages/1
```

## 🔧 Frontend Debugging

### 1. Check Browser Console
Look for:
- CORS errors
- Network timeouts
- 404/500 errors

### 2. Verify Environment Variables
Check that your Vercel environment variables are correctly set:
- [VITE_API_BASE_URL](file:///C:/Users/suhan/yatraa/.env.example#L12-L12) = https://yatraa-2.onrender.com
- [VITE_CLERK_PUBLISHABLE_KEY](file:///C:/Users/suhan/yatraa/vercel.env#L4-L4) = your Clerk key

### 3. Check Network Tab
In browser developer tools:
1. Open Network tab
2. Refresh the page
3. Look for failed requests to your API endpoints
4. Check request/response headers
5. Verify timing information

## 🔄 Redeployment Steps

After making changes:

1. Push to GitHub
2. Trigger redeployment on Render (backend)
3. Trigger redeployment on Vercel (frontend)

## 📞 If Issues Persist

1. Check Render logs for backend errors
2. Check Vercel logs for frontend errors
3. Verify the specific domain of your Vercel deployment and add it to CORS configuration
4. Contact support for both platforms if needed

## 📈 Monitoring

After deployment, monitor:
- Response times
- Error rates
- Successful request rates