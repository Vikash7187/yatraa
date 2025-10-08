# 📋 Persistent "Package not found" Troubleshooting Guide

## 🔍 Deep Dive Analysis

If you're still seeing "Package not found" after previous fixes, there are likely deeper issues with data consistency or API communication. Let's systematically identify and resolve them.

## 🧪 Diagnostic Steps

### 1. Verify Backend Server is Running
```bash
# Check if backend is accessible
curl http://localhost:3003/health

# Should return: {"status":"OK","timestamp":"...","service":"Yatraa API"}
```

### 2. Test Package Endpoints Directly
```bash
# Get all packages
curl http://localhost:3003/api/packages

# Get specific package
curl http://localhost:3003/api/packages/1

# Check response format - should include id, name, location, price, etc.
```

### 3. Test Booking Creation
```bash
# Create a test booking
curl -X POST http://localhost:3003/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "startDate": "2023-12-01",
    "endDate": "2023-12-07",
    "guests": 2,
    "totalPrice": 90000
  }'

# Check the response for package validation
```

### 4. Test Profile Endpoints
```bash
# Get profile by Clerk ID
curl http://localhost:3003/api/profiles/by-clerk/test-user-123

# Check if bookings include package information
```

## 🔎 Common Root Causes

### 1. Data Type Mismatches
**Problem**: Package IDs stored as strings instead of numbers
**Solution**: 
- Ensure all package IDs are numbers in the database
- Convert IDs properly when comparing
- Validate data types in both frontend and backend

### 2. Inconsistent Package References
**Problem**: Booking stores packageId that doesn't match any package
**Solution**:
- Validate packageId exists before creating booking
- Return error if package not found during booking creation
- Log available package IDs for debugging

### 3. CORS or Network Issues
**Problem**: API requests fail silently
**Solution**:
- Check browser console for CORS errors
- Verify backend allows requests from frontend domain
- Test API endpoints directly

## 🛠️ Advanced Debugging

### 1. Enable Detailed Logging
Add this to your backend server.js:
```javascript
// Add detailed logging for package lookups
app.get('/api/packages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('=== PACKAGE LOOKUP DEBUG ===');
  console.log('Requested ID:', id, 'type:', typeof id);
  console.log('Available packages:', packages.map(p => ({id: p.id, type: typeof p.id})));
  
  const pkg = packages.find(p => {
    const packageId = typeof p.id === 'string' ? parseInt(p.id) : p.id;
    console.log(`Comparing ${packageId} (${typeof packageId}) with ${id} (${typeof id})`);
    return packageId === id;
  });
  
  if (pkg) {
    console.log('✅ Package found:', pkg.name);
    res.json(pkg);
  } else {
    console.log('❌ Package not found');
    res.status(404).json({ 
      error: `Package with ID ${id} not found`,
      availableIds: packages.map(p => p.id)
    });
  }
});
```

### 2. Check Browser Network Tab
1. Open Developer Tools (F12)
2. Go to Network tab
3. Try to book a package
4. Look for failed requests to:
   - `/api/packages/{id}`
   - `/api/bookings`
   - `/api/profiles/*`

### 3. Verify Environment Variables
Check that your frontend has the correct API URL:
```bash
# In your .env file
VITE_API_BASE_URL=http://localhost:3003
```

## 🚨 Emergency Workarounds

### 1. Hardcode Package Data (Temporary)
In UserProfile.jsx, temporarily hardcode package data:
```javascript
// Temporary fix - replace with actual package data
const fallbackPackages = {
  1: {
    id: 1,
    name: "Taj Lake Palace Udaipur",
    location: "Udaipur, Rajasthan",
    price: 45000,
    duration: 3,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  2: {
    id: 2,
    name: "The Oberoi Mumbai",
    location: "Mumbai, Maharashtra",
    price: 35000,
    duration: 4,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
  // Add more as needed
};

// In fetchUserProfile function
const packageData = bookingDetails[booking.id] || fallbackPackages[booking.packageId];
```

### 2. Skip Package Validation (NOT RECOMMENDED FOR PRODUCTION)
In backend server.js, temporarily remove package validation:
```javascript
// ONLY FOR TESTING - Remove package validation
app.post('/api/bookings', (req, res) => {
  try {
    const bookingData = req.body;
    console.log('📥 Received booking request:', bookingData);
    
    // Create booking without package validation (FOR TESTING ONLY)
    const newBooking = {
      id: nextBookingId++,
      ...bookingData,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    
    bookings.push(newBooking);
    console.log(`✅ Booking created successfully with ID: ${newBooking.id}`);
    
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});
```

## 📊 Verification Checklist

### ✅ Backend Status
- [ ] Server running on correct port (3003)
- [ ] All endpoints accessible
- [ ] Package validation working
- [ ] Booking creation successful
- [ ] Profile endpoints include booking data

### ✅ Frontend Status
- [ ] API_BASE_URL correctly set
- [ ] Package service functions working
- [ ] Booking form submits correctly
- [ ] Profile displays booking data
- [ ] No JavaScript errors

### ✅ Data Consistency
- [ ] All package IDs are numbers
- [ ] Booking packageIds match package IDs
- [ ] No missing required fields
- [ ] Date formats consistent (YYYY-MM-DD)

### ✅ Network Connectivity
- [ ] No CORS errors
- [ ] API requests completing
- [ ] No 404 or 500 errors
- [ ] Response data as expected

## 📞 If Issues Persist

1. **Run the test script**:
   ```bash
   node test-backend-booking.js
   ```

2. **Check server logs** for detailed error messages

3. **Share the following information**:
   - Browser console output
   - Network tab screenshots
   - Server log output
   - Exact steps to reproduce

4. **Try a clean restart**:
   - Stop both frontend and backend servers
   - Clear browser cache
   - Restart backend server
   - Restart frontend server
   - Try booking again

This comprehensive approach should identify and resolve the persistent "Package not found" issue.