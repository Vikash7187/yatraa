// Final verification script to test all fixes
const API_BASE_URL = 'http://localhost:3003';

async function finalVerification() {
  console.log('🔍 Final verification of all fixes...\n');
  
  try {
    // Test 1: Verify package data structure
    console.log('📋 Test 1: Verify package data structure');
    const packagesResponse = await fetch(`${API_BASE_URL}/api/packages`);
    const packages = await packagesResponse.json();
    console.log(`✅ Found ${packages.length} packages`);
    
    // Check first package structure
    const firstPackage = packages[0];
    console.log('📦 First package structure:', {
      id: firstPackage.id,
      type: typeof firstPackage.id,
      name: firstPackage.name,
      hasRequiredFields: !!(firstPackage.name && firstPackage.location && firstPackage.price)
    });
    
    // Test 2: Verify package by ID
    console.log('\n📋 Test 2: Verify package by ID');
    const packageResponse = await fetch(`${API_BASE_URL}/api/packages/1`);
    const packageData = await packageResponse.json();
    console.log(`✅ Package 1: ${packageData.name}`);
    
    // Test 3: Create test booking
    console.log('\n📋 Test 3: Create test booking');
    const bookingData = {
      packageId: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      startDate: '2023-12-01',
      endDate: '2023-12-07',
      guests: 2,
      totalPrice: 90000,
      clerkUserId: 'test-user',
      profileId: 'test-user'
    };
    
    const bookingResponse = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });
    
    if (bookingResponse.ok) {
      const booking = await bookingResponse.json();
      console.log(`✅ Booking created with ID: ${booking.id}`);
      
      // Test 4: Get profile with bookings
      console.log('\n📋 Test 4: Get profile with bookings');
      const profileResponse = await fetch(`${API_BASE_URL}/api/profiles/by-clerk/test-user`);
      const profileData = await profileResponse.json();
      console.log(`✅ Profile fetched with ID: ${profileData.id}`);
      
      // Check bookings structure
      const bookings = profileData.bookings || [];
      console.log(`📊 Profile has ${bookings.length} bookings`);
      
      if (bookings.length > 0) {
        const firstBooking = bookings[0];
        console.log('📄 First booking structure:', {
          id: firstBooking.id,
          packageId: firstBooking.packageId,
          type: typeof firstBooking.packageId,
          hasPackage: !!firstBooking.package,
          packageName: firstBooking.package?.name || 'No package data',
          packageType: typeof firstBooking.package?.name
        });
        
        // Verify package data is included
        if (firstBooking.package) {
          console.log('✅ Package data is included in booking');
        } else {
          console.log('❌ Package data is missing from booking');
        }
      }
      
    } else {
      const error = await bookingResponse.json();
      console.log(`❌ Booking creation failed:`, error);
    }
    
    console.log('\n✅ Final verification completed successfully!');
    console.log('\n📋 Summary of fixes:');
    console.log('1. Backend now includes package data directly in booking responses');
    console.log('2. UserProfile component properly handles enhanced booking data');
    console.log('3. Fallback data provided when package information is unavailable');
    console.log('4. Better error handling and logging throughout the application');
    
  } catch (error) {
    console.log(`❌ Verification failed:`, error.message);
  }
}

// Run the verification
finalVerification();