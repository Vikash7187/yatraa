# 📋 "Package not found" Troubleshooting Guide

## 🔍 Common Causes and Solutions

### 1. Invalid Package ID in Booking

#### Symptoms:
- "Package not found" message appears in user profile
- Package details don't display in booking history
- Fallback package information is shown

#### Solutions:
1. **Check Booking Data**:
   - Verify that bookings contain valid package IDs
   - Ensure package IDs match those in the database

2. **Verify Package Database**:
   - Confirm packages exist in the backend database
   - Check that package IDs are consistent (all numbers or all strings)

### 2. API Endpoint Issues

#### Symptoms:
- 404 errors when fetching package details
- Network errors in browser console
- Package data fails to load

#### Solutions:
1. **Test API Endpoints**:
   - Visit `/api/packages/{id}` directly in browser
   - Use curl or Postman to test package endpoints
   - Check backend server logs for errors

2. **Check Server Configuration**:
   - Ensure backend server is running
   - Verify CORS settings allow requests from frontend
   - Check that all required endpoints are implemented

### 3. Data Type Mismatches

#### Symptoms:
- Package lookup fails despite valid IDs
- Console shows type errors
- Inconsistent data handling

#### Solutions:
1. **Standardize ID Types**:
   - Ensure all package IDs are numbers (not strings)
   - Convert IDs properly when comparing
   - Validate data types in both frontend and backend

### 4. Network Connectivity Issues

#### Symptoms:
- Intermittent "Package not found" errors
- Slow loading of package details
- Network errors in console

#### Solutions:
1. **Check Network Connection**:
   - Verify stable internet connection
   - Test API endpoints directly
   - Check for firewall or proxy issues

## 🛠️ Debugging Tools

### 1. Package Debug Tool
- Visit `/package-debug` to test package fetching
- Enter package IDs to verify they can be retrieved
- Check for specific error messages

### 2. Browser Developer Tools
1. Open Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed API requests
4. Look for 404 or 500 status codes

### 3. Backend Server Logs
1. Check terminal where backend server is running
2. Look for error messages when package endpoints are called
3. Verify that package requests are being received

### 4. Manual API Testing
```bash
# Test specific package endpoint
curl https://yatraa-production.up.railway.app/api/packages/1

# Test all packages endpoint
curl https://yatraa-production.up.railway.app/api/packages

# Test health endpoint
curl https://yatraa-production.up.railway.app/health
```

## 🧪 Step-by-Step Testing

### 1. Verify Backend Health
1. Visit `https://yatraa-production.up.railway.app/health`
2. Confirm you see: `{"status":"OK","timestamp":"...","service":"Yatraa API"}`

### 2. Test Package Endpoints
1. Visit `https://yatraa-production.up.railway.app/api/packages`
2. Confirm you see a JSON array of packages
3. Visit `https://yatraa-production.up.railway.app/api/packages/1`
4. Confirm you see package details for ID 1

### 3. Test Booking Flow
1. Create a new booking
2. Navigate to user profile
3. Check that booking appears with package details
4. Verify no "Package not found" errors

### 4. Use Debug Tools
1. Visit `/package-debug`
2. Test various package IDs
3. Check for consistent results

## 📊 Monitoring Checklist

### ✅ Package Data
- [ ] All packages have valid numeric IDs
- [ ] Package data is consistent in structure
- [ ] No missing required fields

### ✅ API Endpoints
- [ ] `/api/packages` endpoint returns data
- [ ] `/api/packages/{id}` endpoints work for all packages
- [ ] No 404 errors for valid package IDs

### ✅ Data Handling
- [ ] ID types are consistent (all numbers)
- [ ] Proper error handling for missing packages
- [ ] Fallback data displays correctly

### ✅ User Experience
- [ ] Package details show in booking history
- [ ] No "Package not found" messages
- [ ] Links to package pages work correctly

## 🚨 Emergency Fixes

### If Packages Don't Load at All:
1. **Quick Fix**: Temporarily use fallback data
   - UserProfile already includes fallback package data
   - This ensures users can still see booking information

2. **Check Railway Logs**:
   - Visit Railway dashboard
   - Check deployment logs for errors
   - Restart deployment if needed

3. **Verify Environment Variables**:
   - Check Vercel environment variables
   - Ensure `VITE_API_BASE_URL` is correct
   - Redeploy frontend after changes

### If Specific Packages Don't Load:
1. **Check Package ID**:
   - Verify the package ID exists in backend data
   - Check for type mismatches (string vs number)

2. **Test Direct API Call**:
   - Visit the API endpoint directly in browser
   - Confirm the package data exists

3. **Check Browser Console**:
   - Look for specific error messages
   - Check network tab for failed requests

## 🔄 Recent Improvements

The following improvements have been made to help with "Package not found" issues:

1. **Enhanced Error Handling**:
   - Better error messages for API failures
   - More detailed logging for debugging
   - Specific error handling for different HTTP status codes

2. **Improved Fallback Data**:
   - Better fallback package data when API fails
   - More informative display when package details are unavailable

3. **Data Type Consistency**:
   - Improved ID handling in both frontend and backend
   - Better validation of package IDs

4. **Debugging Tools**:
   - Package debug tool for testing package fetching
   - Enhanced console logging throughout the application

5. **User Interface Improvements**:
   - Better handling of missing package data
   - More informative messages for users

These improvements should make it easier to diagnose and fix "Package not found" issues.

## 📞 Support Information

If you continue to experience "Package not found" issues:

1. **Provide Browser Console Output**:
   - Copy any error messages from Console tab
   - Include network request details for failed API calls

2. **Share Deployment URLs**:
   - Your Vercel frontend URL
   - Your Railway backend URL

3. **Include Steps to Reproduce**:
   - What you did before the issue occurred
   - What you expected to happen
   - What actually happened

4. **Check Server Logs**:
   - Provide any error messages from the backend server
   - Include timestamps of when the errors occurred