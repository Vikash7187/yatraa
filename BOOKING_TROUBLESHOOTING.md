# 📋 Booking Troubleshooting Guide

## 🔍 Common Booking Issues and Solutions

### 1. "Failed to create booking. Please try again."

#### Symptoms:
- Error message appears when submitting booking form
- Booking is not created in the system
- User is not redirected to confirmation page

#### Solutions:
1. **Check Backend Server**:
   - Ensure the backend server is running
   - Verify the `/api/bookings` endpoint is accessible
   - Check server logs for errors

2. **Verify Required Fields**:
   - Ensure all required fields are filled in the booking form
   - Check browser console for validation errors

3. **Check Network Connectivity**:
   - Look for network errors in browser's Network tab
   - Verify API requests are completing successfully

### 2. "Invalid booking data" Error

#### Symptoms:
- Specific error message about invalid data
- Form fields may be highlighted in red

#### Solutions:
1. **Check Form Validation**:
   - Ensure all required fields are filled
   - Verify email format is correct
   - Check date selections are valid

2. **Verify Data Types**:
   - Ensure numeric fields contain numbers
   - Check date formats are correct (YYYY-MM-DD)

### 3. "Unauthorized" or "Please log in" Error

#### Symptoms:
- Redirected to login page during booking
- Error message about authentication

#### Solutions:
1. **Verify User Authentication**:
   - Ensure user is logged in before booking
   - Check Clerk authentication is working
   - Verify user session is active

### 4. "Package not found" Error

#### Symptoms:
- Error when trying to book a specific package
- Package details don't load

#### Solutions:
1. **Check Package ID**:
   - Verify the package ID exists in the database
   - Ensure package ID is correctly passed to booking form

## 🛠️ Debugging Tools

### 1. Browser Developer Tools
1. Open Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed API requests
4. Check Elements tab to verify form structure

### 2. Backend Server Logs
1. Check terminal where backend server is running
2. Look for error messages or warnings
3. Verify API endpoints are being called

### 3. Manual API Testing
```bash
# Test health endpoint
curl https://yatraa-production.up.railway.app/health

# Test booking creation (replace with actual data)
curl -X POST https://yatraa-production.up.railway.app/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "startDate": "2023-12-01",
    "endDate": "2023-12-07",
    "guests": 2
  }'
```

## 🧪 Step-by-Step Testing

### 1. Verify Backend Health
1. Visit `https://yatraa-production.up.railway.app/health`
2. Confirm you see: `{"status":"OK","timestamp":"...","service":"Yatraa API"}`

### 2. Test Booking Endpoint
1. Use the curl command above to test booking creation
2. Confirm you receive a successful response

### 3. Test Frontend Booking Flow
1. Visit your Vercel deployment
2. Log in to your account
3. Navigate to a package details page
4. Click "Book Now"
5. Fill out the booking form
6. Submit the form
7. Verify you're redirected to the profile page with success message

## 📊 Monitoring Checklist

### ✅ Backend Status
- [ ] Railway deployment is active
- [ ] Backend server is running on port 3003
- [ ] Health check endpoint responds correctly
- [ ] Booking endpoint is implemented
- [ ] Profile endpoints are implemented
- [ ] CORS is configured for Vercel domain

### ✅ Frontend Status
- [ ] Vercel deployment is successful
- [ ] Environment variables are set correctly
- [ ] Booking form validates input correctly
- [ ] Booking submission works
- [ ] Success redirection works

### ✅ Network Connectivity
- [ ] No CORS errors in browser console
- [ ] API requests complete successfully
- [ ] No 404 or 500 errors

## 🚨 Emergency Fixes

### If Bookings Don't Work at All:
1. **Quick Fix**: Temporarily disable booking requirements
   - Modify booking service to allow unauthenticated bookings
   - This should only be used for testing

2. **Check Railway Logs**:
   - Visit Railway dashboard
   - Check deployment logs for errors
   - Restart deployment if needed

3. **Verify Environment Variables**:
   - Check Vercel environment variables
   - Ensure `VITE_API_BASE_URL` is correct
   - Redeploy frontend after changes

### If Specific Booking Errors Occur:
1. **Check Server Logs**:
   - Look for specific error messages in backend logs
   - Identify which part of the booking process is failing

2. **Test Direct API Call**:
   - Use curl or Postman to test the booking endpoint directly
   - Confirm the backend can process bookings

3. **Check Browser Console**:
   - Look for specific error messages
   - Check network tab for failed requests

## 🔄 Recent Improvements

The following improvements have been made to help with booking functionality:

1. **Enhanced Error Handling**:
   - Better error messages for API failures
   - More detailed logging for debugging
   - Specific error handling for different HTTP status codes

2. **Backend Implementation**:
   - Added booking endpoints to backend server
   - Added profile endpoints to backend server
   - Implemented in-memory storage for bookings and profiles

3. **Improved Validation**:
   - Better form validation in booking form
   - More detailed error messages for users

4. **Debugging Tools**:
   - Enhanced console logging throughout the booking process
   - Better error reporting in all services

These improvements should make it easier to diagnose and fix booking issues.

## 📞 Support Information

If you continue to experience booking issues:

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