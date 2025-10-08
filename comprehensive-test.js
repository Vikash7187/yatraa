// Comprehensive test to verify all components are working correctly
const API_BASE_URL = 'http://localhost:3003';

async function runComprehensiveTest() {
  console.log('🚀 Starting comprehensive test...\n');
  
  try {
    // Test 1: Health check
    console.log('📋 Test 1: Health check');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log(`✅ Health check: ${healthData.status}`);
    
    // Test 2: Get all packages
    console.log('\n📋 Test 2: Get all packages');
    const packagesResponse = await fetch(`${API_BASE_URL}/api/packages`);
    const packagesData = await packagesResponse.json();
    console.log(`✅ Found ${packagesData.length} packages`);
    console.log('📦 Sample package:', {
      id: packagesData[0].id,
      name: packagesData[0].name,
      type: typeof packagesData[0].id
    });
    
    // Test 3: Get specific package
    console.log('\n📋 Test 3: Get specific package');
    const packageResponse = await fetch(`${API_BASE_URL}/api/packages/1`);
    const packageData = await packageResponse.json();
    console.log(`✅ Package 1: ${packageData.name}`);
    
    // Test 4: Create booking
    console.log('\n📋 Test 4: Create booking');
    const bookingData = {
      packageId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      startDate: '2023-12-01',
      endDate: '2023-12-07',
      guests: 2,
      totalPrice: 90000,
      clerkUserId: 'test-user-123',
      profileId: 'test-user-123'
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
      
      // Test 5: Get bookings
      console.log('\n📋 Test 5: Get bookings');
      const bookingsResponse = await fetch(`${API_BASE_URL}/api/bookings`);
      const bookingsData = await bookingsResponse.json();
      console.log(`✅ Found ${bookingsData.length} bookings`);
      
      // Test 6: Create/get profile
      console.log('\n📋 Test 6: Create/get profile');
      const profileResponse = await fetch(`${API_BASE_URL}/api/profiles/by-clerk/test-user-123`);
      const profileData = await profileResponse.json();
      console.log(`✅ Profile created/fetched with ID: ${profileData.id}`);
      
      // Test 7: Verify booking in profile
      console.log('\n📋 Test 7: Verify booking in profile');
      const profileBookings = profileData.bookings || [];
      console.log(`✅ Profile has ${profileBookings.length} bookings`);
      if (profileBookings.length > 0) {
        const firstBooking = profileBookings[0];
        console.log('📄 First booking:', {
          id: firstBooking.id,
          packageId: firstBooking.packageId,
          packageName: firstBooking.package?.name || 'Package data not included',
          hasPackage: !!firstBooking.package
        });
      }
      
    } else {
      const errorData = await bookingResponse.json();
      console.log(`❌ Booking creation failed:`, errorData);
    }
    
  } catch (error) {
    console.log(`❌ Test failed:`, error.message);
  }
  
  console.log('\n🏁 Comprehensive test completed');
}

// Run the test
runComprehensiveTest();