// Indian Heritage Hotels Database
const packages = [
  {
    id: 1,
    name: "Taj Lake Palace Udaipur",
    type: "Palace",
    location: "Udaipur, Rajasthan",
    price: 45000,
    duration: 3,
    rating: 4.9,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mealPlan: "All Inclusive",
    description: "Experience royal luxury in this floating palace on Lake Pichola, one of India's most iconic heritage hotels",
    highlights: [
      "Floating Palace Hotel",
      "Lake Pichola Views", 
      "Royal Heritage Experience",
      "Fine Dining",
      "Luxury Spa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Royal Arrival",
        description: "Airport pickup, boat transfer to palace, welcome ceremony with royal treatment"
      },
      {
        day: 2,
        title: "Palace Exploration", 
        description: "Heritage walk, spa treatments, sunset dinner by the lake"
      },
      {
        day: 3,
        title: "Cultural Experience",
        description: "Cultural show, city tour, departure with royal memories"
      }
    ],
    inclusions: [
      "5-star palace accommodation",
      "All meals included",
      "Airport transfers",
      "Guided heritage tours",
      "Spa session",
      "Cultural show"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance", 
      "Personal expenses",
      "Additional activities"
    ],
    amenities: ["Swimming Pool", "Spa", "Fine Dining", "Lake View"],
    category: "Palace",
    rooms: ["Luxury Room", "Royal Suite", "Grand Royal Suite"],
    activities: ["Heritage Walk", "Boat Ride", "Cultural Show"]
  },
  {
    id: 2,
    name: "The Oberoi Mumbai",
    type: "Luxury Business",
    location: "Mumbai, Maharashtra", 
    price: 35000,
    duration: 4,
    rating: 4.8,
    reviews: 287,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mealPlan: "Breakfast & Dinner",
    description: "Luxury business hotel in the heart of Mumbai with stunning views of the Arabian Sea",
    highlights: [
      "Arabian Sea Views",
      "Business Center",
      "Rooftop Pool", 
      "Award-winning Restaurants",
      "Luxury Spa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Mumbai Arrival",
        description: "Airport pickup, hotel check-in, welcome drink with city views"
      },
      {
        day: 2,
        title: "City Exploration",
        description: "Mumbai city tour, Gateway of India, Marine Drive, local markets"
      },
      {
        day: 3,
        title: "Bollywood Experience", 
        description: "Film City tour, Bollywood studio visit, traditional Indian dinner"
      },
      {
        day: 4,
        title: "Relaxation & Departure",
        description: "Spa treatments, pool time, shopping, departure transfer"
      }
    ],
    inclusions: [
      "Luxury hotel accommodation",
      "Daily breakfast and dinner",
      "Airport transfers",
      "City tours",
      "Bollywood studio visit", 
      "Spa session"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ],
    amenities: ["Infinity Pool", "Business Center", "Multiple Restaurants", "Spa & Fitness"],
    category: "Business Hotel",
    rooms: ["Deluxe Room", "Executive Suite", "Presidential Suite"],
    activities: ["City Tours", "Bollywood Experience", "Fine Dining"]
  },
  {
    id: 3,
    name: "ITC Grand Chola Chennai",
    type: "Heritage Luxury",
    location: "Chennai, Tamil Nadu",
    price: 28000,
    duration: 3,
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c91a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    mealPlan: "All Inclusive",
    description: "Experience South India's royal hospitality at this heritage luxury hotel with award-winning service",
    highlights: [
      "Heritage Architecture",
      "Award-winning Restaurants",
      "Luxury Spa",
      "Swimming Pool"
    ],
    itinerary: [
      {
        day: 1,
        title: "Southern Welcome",
        description: "Airport pickup, hotel check-in, traditional South Indian welcome with filter coffee"
      },
      {
        day: 2,
        title: "Cultural Immersion",
        description: "Temple tours, traditional dance performance, authentic South Indian cuisine"
      },
      {
        day: 3,
        title: "Relaxation & Departure",
        description: "Ayurvedic spa treatment, shopping for local crafts, departure transfer"
      }
    ],
    inclusions: [
      "5-star luxury accommodation",
      "All meals included",
      "Airport transfers",
      "Temple tours",
      "Cultural performances",
      "Spa session"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Additional activities"
    ],
    amenities: ["Multiple Restaurants", "Luxury Spa", "Swimming Pool", "Conference Rooms"],
    category: "Heritage Hotel",
    rooms: ["Premium Room", "Club Room", "Grand Royal Suite"],
    activities: ["Temple Tours", "Cultural Shows", "Ayurvedic Spa"]
  },
  {
    id: 4,
    name: "The Leela Palace New Delhi",
    type: "Urban Palace",
    location: "New Delhi",
    price: 42000,
    duration: 3,
    rating: 4.8,
    reviews: 265,
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mealPlan: "Breakfast & Dinner",
    description: "Experience royal luxury in the heart of India's capital with stunning views of the Delhi skyline",
    highlights: [
      "Royal Palace Architecture",
      "Luxury Shopping",
      "Fine Dining",
      "Royal Spa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Capital Arrival",
        description: "Airport pickup, hotel check-in, welcome drink with city views"
      },
      {
        day: 2,
        title: "Heritage Exploration",
        description: "Red Fort, India Gate, Lotus Temple tours with traditional Indian lunch"
      },
      {
        day: 3,
        title: "Royal Experience",
        description: "Shopping at luxury markets, cultural show, departure transfer"
      }
    ],
    inclusions: [
      "Luxury palace accommodation",
      "Daily breakfast and dinner",
      "Airport transfers",
      "Heritage tours",
      "Cultural show",
      "Shopping assistance"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Additional activities"
    ],
    amenities: ["Royal Spa", "Multiple Restaurants", "Indoor Pool", "Art Gallery"],
    category: "Palace",
    rooms: ["Deluxe Room", "Palace Wing", "Royal Suite"],
    activities: ["Heritage Walk", "Cultural Shows", "Shopping Tours"]
  },
  {
    id: 5,
    name: "Rambagh Palace Jaipur",
    type: "Royal Heritage",
    location: "Jaipur, Rajasthan",
    price: 38000,
    duration: 3,
    rating: 4.7,
    reviews: 212,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80",
    mealPlan: "All Inclusive",
    description: "Experience the grandeur of Rajasthan at this former royal residence turned luxury heritage hotel",
    highlights: [
      "Former Royal Residence",
      "Peacock Gardens",
      "Royal Dining",
      "Heritage Tours"
    ],
    itinerary: [
      {
        day: 1,
        title: "Royal Welcome",
        description: "Airport pickup, hotel check-in, traditional Rajasthani welcome ceremony"
      },
      {
        day: 2,
        title: "Royal Rajasthan",
        description: "City palace tour, elephant ride, traditional Rajasthani dinner under the stars"
      },
      {
        day: 3,
        title: "Cultural Immersion",
        description: "Handicraft workshops, polo match viewing, departure transfer"
      }
    ],
    inclusions: [
      "Royal palace accommodation",
      "All meals included",
      "Airport transfers",
      "City palace tours",
      "Cultural experiences",
      "Traditional dinner"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Additional activities"
    ],
    amenities: ["Royal Garden", "Polo Bar", "Spa", "Indoor Pool"],
    category: "Palace",
    rooms: ["Palace Room", "Historical Suite", "Royal Suite"],
    activities: ["Heritage Walk", "Polo Match", "Afternoon Tea"]
  },
  {
    id: 6,
    name: "Kumarakom Lake Resort Kerala",
    type: "Backwater Resort",
    location: "Kumarakom, Kerala",
    price: 32000,
    duration: 4,
    rating: 4.6,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c91a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    mealPlan: "All Inclusive",
    description: "Experience the serenity of Kerala's backwaters at this luxury resort with authentic Ayurvedic treatments",
    highlights: [
      "Backwater Location",
      "Ayurvedic Spa",
      "Houseboat Cruise",
      "Traditional Cuisine"
    ],
    itinerary: [
      {
        day: 1,
        title: "God's Own Country Arrival",
        description: "Airport pickup, houseboat cruise to resort, traditional Kerala welcome"
      },
      {
        day: 2,
        title: "Ayurvedic Wellness",
        description: "Ayurvedic treatments, backwater fishing, traditional Kerala cuisine"
      },
      {
        day: 3,
        title: "Cultural Exploration",
        description: "Spice plantation tour, traditional dance performance, Ayurvedic cooking class"
      },
      {
        day: 4,
        title: "Relaxation & Departure",
        description: "Leisure time, shopping for spices, departure transfer"
      }
    ],
    inclusions: [
      "Luxury resort accommodation",
      "All meals included",
      "Airport and water transfers",
      "Houseboat cruise",
      "Ayurvedic treatments",
      "Cultural experiences"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Additional activities"
    ],
    amenities: ["Ayurvedic Spa", "Backwater View", "Multiple Restaurants", "Swimming Pool"],
    category: "Resort",
    rooms: ["Lake View Room", "Garden View Room", "Presidential Suite"],
    activities: ["Backwater Cruise", "Spa Treatments", "Cultural Programs"]
  },
  {
    id: 7,
    name: "The Taj Mahal Palace Mumbai",
    type: "Heritage Landmark",
    location: "Mumbai, Maharashtra",
    price: 48000,
    duration: 3,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1561501900-30bfffc11b6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mealPlan: "All Inclusive",
    description: "Experience colonial grandeur at this iconic sea-facing hotel that overlooks the Gateway of India",
    highlights: [
      "Historic Landmark Hotel",
      "Sea Facing Location",
      "Colonial Architecture",
      "Fine Dining",
      "Luxury Spa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Gateway Welcome",
        description: "Airport pickup, hotel check-in, welcome drink with views of the Gateway of India"
      },
      {
        day: 2,
        title: "Mumbai Heritage",
        description: "Heritage walk through Colaba, visit to Chhatrapati Shivaji Terminus, traditional Marathi dinner"
      },
      {
        day: 3,
        title: "Cultural Finale",
        description: "Shopping at Crawford Market, farewell dinner at flagship restaurant, departure transfer"
      }
    ],
    inclusions: [
      "Heritage luxury accommodation",
      "All meals included",
      "Airport transfers",
      "Heritage tours",
      "Spa session",
      "Signature dining experience"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Additional activities"
    ],
    amenities: ["Sea View Pool", "Luxury Spa", "Multiple Restaurants", "Fitness Center"],
    category: "Heritage Hotel",
    rooms: ["Heritage Room", "Harbour View Room", "Taj Club Room"],
    activities: ["Heritage Walk", "Cooking Class", "Spa Treatments"]
  },
  {
    id: 8,
    name: "Wildflower Hall Shimla",
    type: "Hill Station Retreat",
    location: "Shimla, Himachal Pradesh",
    price: 35000,
    duration: 4,
    rating: 4.7,
    reviews: 165,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mealPlan: "Breakfast & Dinner",
    description: "Experience colonial elegance in the former summer capital of British India, nestled in pine forests",
    highlights: [
      "Victorian Architecture",
      "Mountain Views",
      "Pine Forest Setting",
      "Historic Charm",
      "Adventure Activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Hill Station Arrival",
        description: "Meet and greet at Shimla railway station, hotel check-in, orientation walk"
      },
      {
        day: 2,
        title: "Colonial Heritage",
        description: "Visit to Viceregal Lodge, The Mall road walk, traditional Himachali dinner"
      },
      {
        day: 3,
        title: "Nature & Adventure",
        description: "Nature walk in pine forests, adventure activities, bonfire evening"
      },
      {
        day: 4,
        title: "Relaxation & Departure",
        description: "Leisure time, local shopping, departure transfer"
      }
    ],
    inclusions: [
      "Colonial heritage accommodation",
      "Daily breakfast and dinner",
      "Railway station transfers",
      "Heritage tours",
      "Nature walks",
      "Bonfire evening"
    ],
    exclusions: [
      "Railway tickets",
      "Travel insurance",
      "Personal expenses",
      "Optional activities"
    ],
    amenities: ["Fireplace Lounge", "Library", "Restaurant", "Garden Seating"],
    category: "Hill Station Hotel",
    rooms: ["Heritage Room", "Valley View Room", "Suite"],
    activities: ["Nature Walks", "Bird Watching", "Local Village Visit"]
  },
  {
    id: 9,
    name: "Taj Falaknuma Palace Hyderabad",
    type: "Palace Hotel",
    location: "Hyderabad, Telangana",
    price: 46000,
    duration: 3,
    rating: 4.8,
    reviews: 243,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mealPlan: "All Inclusive",
    description: "Experience Nizami royalty in this restored palace that was once the residence of the Nizam of Hyderabad",
    highlights: [
      "Restored Palace Hotel",
      "Nizami Heritage",
      "Opulent Interiors",
      "Royal Service",
      "Signature Dining"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nizami Welcome",
        description: "Airport pickup, royal procession to palace, traditional Hyderabadi welcome"
      },
      {
        day: 2,
        title: "Pearl of the Deccan",
        description: "Charminar tour, pearl market visit, Hyderabadi biryani feast"
      },
      {
        day: 3,
        title: "Royal Experience",
        description: "Jewel museum tour, traditional crafts demonstration, royal farewell dinner"
      }
    ],
    inclusions: [
      "Palace accommodation",
      "All meals included",
      "Airport transfers",
      "City tours",
      "Craft demonstrations",
      "Royal dining experience"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Additional activities"
    ],
    amenities: ["Palace Gardens", "Jewel Museum", "Multiple Restaurants", "Luxury Spa"],
    category: "Palace",
    rooms: ["Palace Room", "Durbar Hall Suite", "Falaknuma Suite"],
    activities: ["Palace Tour", "Craft Workshop", "Royal Dining"]
  },
  {
    id: 10,
    name: "Mayfair Lagoon Bhubaneswar",
    type: "Luxury Resort",
    location: "Bhubaneswar, Odisha",
    price: 29000,
    duration: 4,
    rating: 4.6,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mealPlan: "All Inclusive",
    description: "Experience luxury in Eastern India with easy access to ancient temples of Bhubaneswar and Konark",
    highlights: [
      "Luxury Lagoon Setting",
      "Temple Proximity",
      "Contemporary Comfort",
      "Regional Cuisine",
      "Wellness Spa"
    ],
    itinerary: [
      {
        day: 1,
        title: "Odisha Arrival",
        description: "Airport pickup, hotel check-in, traditional Odia welcome with cultural program"
      },
      {
        day: 2,
        title: "Temple Trail",
        description: "Visit to Lingaraj Temple, local handicraft village, Odia thali dinner"
      },
      {
        day: 3,
        title: "Konark Exploration",
        description: "Sun Temple visit, traditional dance performance, local artisan workshop"
      },
      {
        day: 4,
        title: "Relaxation & Departure",
        description: "Ayurvedic spa, local shopping, departure transfer"
      }
    ],
    inclusions: [
      "Luxury resort accommodation",
      "All meals included",
      "Airport transfers",
      "Temple visits",
      "Cultural programs",
      "Spa session"
    ],
    exclusions: [
      "Domestic flights",
      "Travel insurance",
      "Personal expenses",
      "Additional activities"
    ],
    amenities: ["Lagoon Pool", "Ayurvedic Spa", "Multiple Restaurants", "Fitness Center"],
    category: "Luxury Resort",
    rooms: ["Lagoon View Room", "Garden View Room", "Executive Suite"],
    activities: ["Temple Tours", "Craft Workshops", "Cultural Shows"]
  }
];

// Import required modules
const { format } = require('date-fns');

// In-memory storage for bookings and profiles (in a real app, you would use a database)
let bookings = [];
let profiles = [];
let nextBookingId = 1;
let nextProfileId = 1;

// Express server setup
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

// More permissive CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177',
      'http://localhost:5178',
      'http://localhost:5179',
      'http://localhost:5180',
      'http://localhost:5181',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:5175',
      // Vercel deployment domains
      'https://yatraa.vercel.app',
      'https://yatraa-git-main.vikash7187.vercel.app',
      'https://yatraa-lilac.vercel.app',
      // Allow any vercel.app domain (for flexibility)
      'https://*.vercel.app',
      // Render deployment domains
      'https://*.onrender.com',
      // Add your specific Vercel domain here once you have it
    ];
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        // Handle wildcard patterns
        const regex = new RegExp(allowedOrigin.replace('*', '.*'));
        return regex.test(origin);
      }
      return origin === allowedOrigin;
    });
    
    // Allow all origins in development, be more restrictive in production
    if (isAllowed || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Yatraa API'
  });
});

// API routes
app.get('/api/packages', (req, res) => {
  res.json(packages);
});

app.get('/api/packages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`🔍 Request for package with ID: ${id} (type: ${typeof id})`);
  
  // Validate ID parameter
  if (isNaN(id)) {
    console.log(`❌ Invalid ID parameter: ${req.params.id}`);
    return res.status(400).json({ error: 'Invalid package ID provided' });
  }
  
  // Find package by ID (handle both string and number IDs)
  const pkg = packages.find(p => {
    const packageId = typeof p.id === 'string' ? parseInt(p.id) : p.id;
    return packageId === id;
  });
  
  if (pkg) {
    console.log(`✅ Found package with ID ${id}:`, pkg.name);
    res.json(pkg);
  } else {
    console.log(`❌ Package with ID ${id} not found. Available IDs:`, packages.map(p => p.id));
    res.status(404).json({ 
      error: `Package with ID ${id} not found`,
      availableIds: packages.map(p => p.id)
    });
  }
});

// Booking endpoints
app.post('/api/bookings', (req, res) => {
  try {
    const bookingData = req.body;
    console.log('📥 Received booking request:', bookingData);
    
    // Validate required fields
    if (!bookingData.packageId || !bookingData.firstName || !bookingData.lastName || !bookingData.email) {
      return res.status(400).json({ 
        error: 'Missing required fields: packageId, firstName, lastName, and email are required' 
      });
    }
    
    // Validate package exists
    const packageId = parseInt(bookingData.packageId);
    console.log(`🔍 Validating package ID: ${packageId} (type: ${typeof packageId})`);
    
    if (isNaN(packageId)) {
      return res.status(400).json({ 
        error: `Invalid package ID: ${bookingData.packageId}` 
      });
    }
    
    const pkg = packages.find(p => {
      const pId = typeof p.id === 'string' ? parseInt(p.id) : p.id;
      return pId === packageId;
    });
    
    if (!pkg) {
      console.log(`❌ Package with ID ${packageId} not found. Available IDs:`, packages.map(p => p.id));
      return res.status(400).json({ 
        error: `Package with ID ${packageId} not found`,
        availableIds: packages.map(p => p.id)
      });
    }
    
    console.log(`✅ Package validation passed for ID: ${packageId}`);
    
    // Create booking with proper profile association
    const newBooking = {
      id: nextBookingId++,
      ...bookingData,
      packageId: packageId, // Ensure packageId is stored as number
      profileId: bookingData.profileId || bookingData.clerkUserId, // Associate with profile
      clerkUserId: bookingData.clerkUserId, // Ensure clerkUserId is set
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

app.get('/api/bookings', (req, res) => {
  try {
    const { profileId } = req.query;
    console.log(`📥 Request for bookings with profileId: ${profileId}`);
    
    let userBookings = bookings;
    if (profileId) {
      userBookings = bookings.filter(booking => 
        booking.profileId == profileId || booking.clerkUserId == profileId
      );
    }
    
    console.log(`✅ Found ${userBookings.length} bookings`);
    res.json(userBookings);
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.get('/api/bookings/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`📥 Request for booking with ID: ${id}`);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }
    
    const booking = bookings.find(b => b.id === id);
    if (!booking) {
      return res.status(404).json({ error: `Booking with ID ${id} not found` });
    }
    
    console.log(`✅ Found booking with ID: ${id}`);
    res.json(booking);
  } catch (error) {
    console.error('❌ Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Profile endpoints
app.get('/api/profiles/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`📥 Request for profile with ID: ${id}`);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid profile ID' });
    }
    
    const profile = profiles.find(p => p.id === id);
    if (!profile) {
      return res.status(404).json({ error: `Profile with ID ${id} not found` });
    }
    
    // Add bookings to profile data with package information
    const userBookings = bookings.filter(booking => 
      booking.profileId == profile.id || booking.clerkUserId == profile.clerkUserId || booking.profileId == profile.clerkUserId
    ).map(booking => {
      // Add package information to booking
      const packageId = typeof booking.packageId === 'string' ? parseInt(booking.packageId) : booking.packageId;
      const pkg = packages.find(p => {
        const pId = typeof p.id === 'string' ? parseInt(p.id) : p.id;
        return pId === packageId;
      });
      
      return {
        ...booking,
        package: pkg || {
          id: packageId,
          name: `Package #${packageId}`,
          location: 'Location not available',
          price: 0,
          duration: 0,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        }
      };
    });
    
    const profileWithBookings = {
      ...profile,
      bookings: userBookings
    };
    
    console.log(`✅ Found profile with ID: ${id}`, {
      bookingCount: userBookings.length,
      hasPackageData: userBookings.some(b => b.package && b.package.name !== `Package #${b.packageId}`)
    });
    res.json(profileWithBookings);
  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.get('/api/profiles/by-clerk/:clerkUserId', (req, res) => {
  try {
    const { clerkUserId } = req.params;
    console.log(`📥 Request for profile with Clerk ID: ${clerkUserId}`);
    
    let profile = profiles.find(p => p.clerkUserId === clerkUserId);
    
    // If profile doesn't exist, create it
    if (!profile) {
      console.log(`🆕 Creating new profile for Clerk user: ${clerkUserId}`);
      profile = {
        id: nextProfileId++,
        clerkUserId: clerkUserId,
        name: `User ${nextProfileId}`,
        email: `${clerkUserId}@example.com`,
        createdAt: new Date().toISOString()
      };
      profiles.push(profile);
    }
    
    // Add bookings to profile data with package information
    const userBookings = bookings.filter(booking => 
      booking.profileId == profile.id || booking.clerkUserId == profile.clerkUserId || booking.profileId == profile.clerkUserId
    ).map(booking => {
      // Add package information to booking
      const packageId = typeof booking.packageId === 'string' ? parseInt(booking.packageId) : booking.packageId;
      const pkg = packages.find(p => {
        const pId = typeof p.id === 'string' ? parseInt(p.id) : p.id;
        return pId === packageId;
      });
      
      return {
        ...booking,
        package: pkg || {
          id: packageId,
          name: `Package #${packageId}`,
          location: 'Location not available',
          price: 0,
          duration: 0,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506862ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        }
      };
    });
    
    const profileWithBookings = {
      ...profile,
      bookings: userBookings
    };
    
    console.log(`✅ Found/created profile for Clerk ID: ${clerkUserId}`, {
      bookingCount: userBookings.length,
      hasPackageData: userBookings.some(b => b.package && b.package.name !== `Package #${b.packageId}`)
    });
    res.json(profileWithBookings);
  } catch (error) {
    console.error('❌ Error fetching profile by Clerk ID:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.post('/api/profiles', (req, res) => {
  try {
    const profileData = req.body;
    console.log('📥 Creating new profile:', profileData);
    
    // Check if profile already exists
    const existingProfile = profiles.find(p => p.clerkUserId === profileData.clerkUserId);
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists for this Clerk user' });
    }
    
    const newProfile = {
      id: nextProfileId++,
      ...profileData,
      createdAt: new Date().toISOString()
    };
    
    profiles.push(newProfile);
    console.log(`✅ Profile created with ID: ${newProfile.id}`);
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('❌ Error creating profile:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

app.put('/api/profiles/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const profileData = req.body;
    console.log(`📥 Updating profile ${id} with data:`, profileData);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid profile ID' });
    }
    
    const profileIndex = profiles.findIndex(p => p.id === id);
    if (profileIndex === -1) {
      return res.status(404).json({ error: `Profile with ID ${id} not found` });
    }
    
    profiles[profileIndex] = {
      ...profiles[profileIndex],
      ...profileData,
      updatedAt: new Date().toISOString()
    };
    
    console.log(`✅ Profile ${id} updated`);
    res.json(profiles[profileIndex]);
  } catch (error) {
    console.error('❌ Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Check availability endpoint
app.post('/api/check-availability', (req, res) => {
  try {
    const { packageId, startDate, endDate, guests } = req.body;
    console.log(`📥 Availability check for package ${packageId}: ${startDate} to ${endDate} for ${guests} guests`);
    
    // In a real app, you would check against actual availability data
    // For now, we'll return default availability
    const availability = {
      available: true,
      remainingSpots: 5,
      maxGuests: 10
    };
    
    console.log(`✅ Availability check completed:`, availability);
    res.json(availability);
  } catch (error) {
    console.error('❌ Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
});

// Available dates endpoint
app.get('/api/available-dates', (req, res) => {
  try {
    const { packageId, month, year } = req.query;
    console.log(`📥 Request for available dates for package ${packageId}: ${month}/${year}`);
    
    // In a real app, you would return actual available dates
    // For now, we'll generate some sample dates
    const dates = [];
    const today = new Date();
    const targetMonth = month ? parseInt(month) - 1 : today.getMonth();
    const targetYear = year ? parseInt(year) : today.getFullYear();
    
    // Generate sample dates for the month (valid for next 90 days)
    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 0);
    
    // Also include dates for next month to ensure continuity
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(format(date, 'yyyy-MM-dd'));
    }
    
    console.log(`✅ Generated ${dates.length} available dates`);
    res.json(dates);
  } catch (error) {
    console.error('❌ Error fetching available dates:', error);
    // Return default dates if there's an error
    const defaultDates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      defaultDates.push(format(date, 'yyyy-MM-dd'));
    }
    res.json(defaultDates);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Yatraa API server running on port ${PORT}`);
  console.log(`🏥 Health check endpoint: http://localhost:${PORT}/health`);
  console.log(`📦 Packages endpoint: http://localhost:${PORT}/api/packages`);
  console.log(`📝 Bookings endpoint: http://localhost:${PORT}/api/bookings`);
  console.log(`🔍 Check availability endpoint: http://localhost:${PORT}/api/check-availability`);
  console.log(`📅 Available dates endpoint: http://localhost:${PORT}/api/available-dates`);
  console.log(`🔗 CORS enabled for origins: ${corsOptions.origin ? corsOptions.origin.toString() : 'All origins allowed'}`);
});
