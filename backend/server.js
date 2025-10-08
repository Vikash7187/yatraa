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

// Express server setup
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3003;

// CORS configuration for development
const corsOptions = {
  origin: [
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
    'http://127.0.0.1:5175'
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.get('/api/packages', (req, res) => {
  res.json(packages);
});

app.get('/api/packages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pkg = packages.find(p => p.id === id);
  if (pkg) {
    res.json(pkg);
  } else {
    res.status(404).json({ error: 'Package not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for: ${corsOptions.origin.join(', ')}`);
});