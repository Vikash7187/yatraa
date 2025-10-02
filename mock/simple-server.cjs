// Simple server for development - replace json-server
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Load initial data
let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));

// Save data to file
const saveData = () => {
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2));
};

// Routes

// Packages
app.get('/api/packages', (req, res) => {
  res.json(data.packages);
});

app.get('/api/packages/featured', (req, res) => {
  // Return first 6 packages as featured
  const featured = data.packages.slice(0, 6);
  res.json(featured);
});

app.get('/api/packages/:id', (req, res) => {
  const packageData = data.packages.find(p => p.id === parseInt(req.params.id));
  if (!packageData) {
    return res.status(404).json({ error: 'Package not found' });
  }
  res.json(packageData);
});

app.post('/api/packages', (req, res) => {
  const newId = Math.max(...data.packages.map(p => p.id), 0) + 1;
  const newPackage = { id: newId, ...req.body };
  data.packages.push(newPackage);
  saveData();
  res.status(201).json(newPackage);
});

// Profiles
app.get('/api/profiles/:id', (req, res) => {
  const profile = data.profiles.find(p => p.id === parseInt(req.params.id));
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  
  const bookings = data.bookings.filter(b => b.profileId === profile.id);
  res.json({ ...profile, bookings });
});

app.get('/api/profiles/by-clerk/:clerkUserId', (req, res) => {
  const { clerkUserId } = req.params;
  let profile = data.profiles.find(p => p.clerkUserId === clerkUserId);
  
  if (!profile) {
    // Auto-create profile for new Clerk users
    const newId = Math.max(...data.profiles.map(p => p.id), 0) + 1;
    profile = {
      id: newId,
      name: 'New User',
      email: `user${newId}@example.com`,
      clerkUserId,
      bookings: []
    };
    data.profiles.push(profile);
    saveData();
  }
  
  const bookings = data.bookings.filter(b => b.profileId === profile.id);
  res.json({ ...profile, bookings });
});

// Bookings
app.get('/api/bookings', (req, res) => {
  const { profileId } = req.query;
  if (profileId) {
    const bookings = data.bookings.filter(b => b.profileId === parseInt(profileId));
    return res.json(bookings);
  }
  res.json(data.bookings);
});

app.post('/api/bookings', (req, res) => {
  const { profileId, clerkUserId, packageId, guests, startDate, endDate, roomType } = req.body;
  
  let profile = null;
  if (profileId) {
    profile = data.profiles.find(p => p.id === parseInt(profileId));
  }
  
  if (!profile && clerkUserId) {
    profile = data.profiles.find(p => p.clerkUserId === clerkUserId);
    if (!profile) {
      // Auto-create profile
      const newId = Math.max(...data.profiles.map(p => p.id), 0) + 1;
      profile = {
        id: newId,
        name: req.body.firstName + ' ' + req.body.lastName || 'New User',
        email: req.body.email || `user${newId}@example.com`,
        clerkUserId,
        bookings: []
      };
      data.profiles.push(profile);
    }
  }
  
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  
  const newBookingId = Math.max(...data.bookings.map(b => b.id), 0) + 1;
  const booking = {
    id: newBookingId,
    profileId: profile.id,
    packageId: parseInt(packageId),
    guests: parseInt(guests),
    startDate,
    endDate,
    roomType: roomType || 'Standard Room',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  
  data.bookings.push(booking);
  saveData();
  res.status(201).json(booking);
});

// Price calculation endpoint
app.get('/api/packages/:id/price', (req, res) => {
  const { id } = req.params;
  const { guests } = req.query;
  const packageData = data.packages.find(p => p.id === parseInt(id));
  
  if (!packageData) {
    return res.status(404).json({ error: 'Package not found' });
  }
  
  const basePrice = packageData.price;
  const discount = guests > 2 ? 0.1 : 0;
  const perPerson = Math.round(basePrice * (1 - discount));
  const total = perPerson * parseInt(guests);
  
  res.json({
    perPerson,
    total,
    isDiscounted: discount > 0,
    breakdown: {
      'Base Price': basePrice,
      'Group Discount': discount > 0 ? `-${discount * 100}%` : '0%',
      'Total per Person': perPerson,
      'Number of Guests': guests,
      'Final Total': total
    }
  });
});

// Availability check endpoint
app.get('/api/packages/:id/availability', (req, res) => {
  res.json({
    available: true,
    remainingSpots: 5,
    maxGuests: 10
  });
});

// Available dates endpoint
app.get('/api/packages/:id/available-dates', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});