# 📋 Booking and Package Troubleshooting Guide

## 🔍 Common Issues and Solutions

### 1. "Package not found" Error

#### Symptoms:
- "Package not found" message appears in user profile
- Package details don't display in booking history
- Fallback package information is shown

#### Solutions:
1. **Check Package IDs**:
   - Verify that bookings contain valid package IDs
   - Ensure package IDs match those in the database
   - Check that all package IDs are numeric

2. **Test API Endpoints**:
   - Visit `/api/packages/{id}` directly in browser
   - Use curl or Postman to test package endpoints
   - Check backend server logs for errors

3. **Verify Backend Server**:
   - Ensure the backend server is running
   - Check that all required endpoints are implemented
   - Verify CORS settings allow requests from frontend

### 2. Date Selection Issues

#### Symptoms:
- Start and end dates cannot be selected in booking form
- Date pickers don't respond to clicks
- Available dates not loading properly
- Validation errors for date fields

#### Solutions:
1. **Check Available Dates API**:
   - Verify `/api/available-dates` endpoint is working
   - Ensure dates are returned in correct format (YYYY-MM-DD)
   - Check that the endpoint accepts packageId parameter

2. **Verify Date Picker Components**:
   - Ensure date pickers are properly initialized
   - Check that onChange handlers are correctly implemented
   - Verify date formatting is consistent

3. **Check Network Connectivity**:
   - Look for network errors in browser console
   - Verify API requests are completing successfully
   - Check for CORS issues

## 🛠️ Debugging Tools

### 1. Package Debug Tool
- Visit `/package-debug` to test package fetching
- Enter package IDs to verify they can be retrieved
- Check for specific error messages

### 2. Date Debug Tool
- Visit `/date-debug` to test date selection
- Verify available dates are loading correctly
- Test date picker functionality

### 3. Browser Developer Tools
1. Open Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed API requests
4. Look for 404 or 500 status codes

### 4. Backend Server Logs
1. Check terminal where backend server is running
2. Look for error messages when endpoints are called
3. Verify that requests are being received and processed

### 5. Manual API Testing
```bash
# Test specific package endpoint
curl https://yatraa-production.up.railway.app/api/packages/1

# Test available dates endpoint
curl "https://yatraa-production.up.railway.app/api/available-dates?packageId=1"

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

### 3. Test Available Dates Endpoint
1. Visit `https://yatraa-production.up.railway.app/api/available-dates?packageId=1`
2. Confirm you see a JSON array of dates in YYYY-MM-DD format

### 4. Test Booking Flow
1. Navigate to a package details page
2. Click "Book Now"
3. Verify date pickers load and function correctly
4. Select start and end dates
5. Complete booking form
6. Submit booking
7. Navigate to profile
8. Verify booking appears with package details

### 5. Use Debug Tools
1. Visit `/package-debug` to test package fetching
2. Visit `/date-debug` to test date selection
3. Check for consistent results

## 📊 Monitoring Checklist

### ✅ Package Data
- [ ] All packages have valid numeric IDs
- [ ] Package data is consistent in structure
- [ ] No missing required fields

### ✅ Date Selection
- [ ] Available dates endpoint returns data
- [ ] Dates are in correct format (YYYY-MM-DD)
- [ ] Date pickers function correctly
- [ ] Date validation works properly

### ✅ API Endpoints
- [ ] `/api/packages` endpoint returns data
- [ ] `/api/packages/{id}` endpoints work for all packages
- [ ] `/api/available-dates` endpoint works
- [ ] No 404 errors for valid endpoints

### ✅ Data Handling
- [ ] ID types are consistent (all numbers)
- [ ] Proper error handling for missing packages
- [ ] Fallback data displays correctly

### ✅ User Experience
- [ ] Package details show in booking history
- [ ] No "Package not found" messages
- [ ] Date pickers work correctly
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

### If Date Selection Doesn't Work:
1. **Use Default Dates**:
   - The system now generates default dates if API fails
   - This ensures users can still select dates

2. **Check Date Format**:
   - Ensure all dates are in YYYY-MM-DD format
   - Verify date formatting consistency

3. **Test Direct API Call**:
   - Visit the available dates endpoint directly
   - Confirm dates are being returned correctly

## 🔄 Recent Improvements

The following improvements have been made to help with booking and package issues:

1. **Enhanced Error Handling**:
   - Better error messages for API failures
   - More detailed logging for debugging
   - Specific error handling for different HTTP status codes

2. **Improved Fallback Data**:
   - Better fallback package data when API fails
   - More informative display when package details are unavailable
   - Enhanced booking information display

3. **Data Type Consistency**:
   - Improved ID handling in both frontend and backend
   - Better validation of package IDs
   - Consistent date formatting

4. **Debugging Tools**:
   - Package debug tool for testing package fetching
   - Date debug tool for testing date selection
   - Enhanced console logging throughout the application

5. **User Interface Improvements**:
   - Better handling of missing package data
   - More informative messages for users
   - Improved date picker functionality

6. **Backend Improvements**:
   - Enhanced package endpoint with better error information
   - Improved available dates endpoint
   - Better logging and error handling

These improvements should make it easier to diagnose and fix booking and package issues.

## 📞 Support Information

If you continue to experience issues:

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