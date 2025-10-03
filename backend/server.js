const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Enhanced CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:4173', 
    'http://localhost:3000',
    'https://yatraa-travel.netlify.app',
    'https://*.netlify.app',
    /\.netlify\.app$/,
    /\.vercel\.app$/
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check for Railway
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Yatraa API is running successfully!',
    timestamp: new Date().toISOString()
  });
});

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
  }
  // Add other packages as needed
];

const bookings = [];
const users = [];

// API Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Yatraa API is running' });
});

app.get('/api/packages', (req, res) => {
  res.json(packages);
});

app.get('/api/packages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const package = packages.find(pkg => pkg.id === id);
  
  if (!package) {
    return res.status(404).json({ error: 'Package not found' });
  }
  
  res.json(package);
});

app.post('/api/bookings', (req, res) => {
  const booking = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };
  
  bookings.push(booking);
  res.status(201).json(booking);
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.post('/api/check-availability', (req, res) => {
  const { packageId, startDate, endDate, guests } = req.body;
  
  // Simple availability check (always available for demo)
  const available = Math.random() > 0.1; // 90% availability
  
  res.json({
    available,
    packageId,
    startDate,
    endDate,
    guests,
    price: available ? packages.find(p => p.id === packageId)?.price : null
  });
});

app.get('/api/available-dates/:packageId', (req, res) => {
  const packageId = parseInt(req.params.packageId);
  
  // Generate next 30 days as available dates
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  res.json(dates);
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Yatraa API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/`);
  console.log(`📦 Packages API: http://localhost:${PORT}/api/packages`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});