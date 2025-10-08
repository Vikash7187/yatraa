// Simple script to test backend booking functionality
const API_BASE_URL = 'http://localhost:3003';

async function testBackend() {
  console.log('🔍 Testing backend booking functionality...');
  
  try {
    // Test 1: Get all packages
    console.log('\n📋 Test 1: Getting all packages...');
    const packagesResponse = await fetch(`${API_BASE_URL}/api/packages`);
    const packages = await packagesResponse.json();
    console.log(`✅ Got ${packages.length} packages`);
    console.log('📦 Sample package:', packages[0]);
    
    // Test 2: Get specific package
    console.log('\n📋 Test 2: Getting specific package...');
    const packageResponse = await fetch(`${API_BASE_URL}/api/packages/1`);
    const packageData = await packageResponse.json();
    console.log(`✅ Got package: ${packageData.name}`);
    
    // Test 3: Create a booking
    console.log('\n📋 Test 3: Creating a booking...');
    const bookingData = {
      packageId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      startDate: '2023-12-01',
      endDate: '2023-12-07',
      guests: 2,
      totalPrice: 90000
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
      console.log('📄 Booking details:', booking);
      
      // Test 4: Get bookings
      console.log('\n📋 Test 4: Getting bookings...');
      const bookingsResponse = await fetch(`${API_BASE_URL}/api/bookings`);
      const bookings = await bookingsResponse.json();
      console.log(`✅ Got ${bookings.length} bookings`);
      
      // Test 5: Create profile and get bookings
      console.log('\n📋 Test 5: Creating profile and getting bookings...');
      const profileData = {
        clerkUserId: 'test-user-123',
        name: 'John Doe',
        email: 'john.doe@example.com'
      };
      
      const profileResponse = await fetch(`${API_BASE_URL}/api/profiles/by-clerk/test-user-123`);
      const profile = await profileResponse.json();
      console.log(`✅ Profile created/fetched with ID: ${profile.id}`);
      console.log('👤 Profile details:', profile);
      
    } else {
      const error = await bookingResponse.json();
      console.log(`❌ Booking creation failed:`, error);
    }
    
  } catch (error) {
    console.log(`❌ Test failed:`, error.message);
  }
  
  console.log('\n🏁 Backend testing completed');
}

// Run the test
testBackend();