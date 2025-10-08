import { createRequire } from 'module';
import { create, router as jsonRouter, defaults, bodyParser } from 'json-server';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = create();
const router = jsonRouter(join(__dirname, 'db.json'));
const middlewares = defaults();

server.use(cors());
server.use(middlewares);
server.use(bodyParser);

// Custom routes for availability
server.get('/api/packages/:id/availability', (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, guests } = req.query;
  const db = router.db;
  const availability = db.get('availability').get(id).value();

  if (!availability) {
    return res.status(404).json({ error: 'Package not found' });
  }

  // Check if requested dates are available
  const requestedDates = new Set(availability.availableDates);
  const isAvailable = startDate && endDate && 
    requestedDates.has(startDate) && 
    requestedDates.has(endDate) &&
    availability.remainingSpots >= parseInt(guests);

  res.json({
    available: isAvailable,
    remainingSpots: availability.remainingSpots,
    maxGuests: availability.maxGuests
  });
});

// Custom route for dynamic pricing
server.get('/api/packages/:id/price', (req, res) => {
  const { id } = req.params;
  const { guests } = req.query;
  const db = router.db;
  const packageData = db.get('packages').find({ id: parseInt(id) }).value();

  if (!packageData) {
    return res.status(404).json({ error: 'Package not found' });
  }

  // Simulate dynamic pricing based on guests
  const basePrice = packageData.price;
  const discount = guests > 2 ? 0.1 : 0; // 10% discount for groups larger than 2
  const perPerson = Math.round(basePrice * (1 - discount));
  const total = perPerson * parseInt(guests);

  res.json({
    perPerson,
    total,
    isDiscounted: discount > 0,
    breakdown: {
      "Base Price": basePrice,
      "Group Discount": discount > 0 ? `-${discount * 100}%` : "0%",
      "Total per Person": perPerson,
      "Number of Guests": guests,
      "Final Total": total
    }
  });
});

// Custom route for available dates
server.get('/api/packages/:id/available-dates', (req, res) => {
  const { id } = req.params;
  const db = router.db;
  const availability = db.get('availability').get(id).value();

  if (!availability) {
    return res.status(404).json({ error: 'Package not found' });
  }

  res.json(availability.availableDates);
});

// Get single package by ID
server.get('/api/packages/:id', (req, res) => {
  const { id } = req.params;
  const db = router.db;
  const packageData = db.get('packages').find({ id: parseInt(id) }).value();
  
  if (!packageData) {
    res.status(404).json({ error: 'Package not found' });
    return;
  }
  
  res.json(packageData);
});

// --- Custom Profile & Booking Endpoints ---

// Register a new user
server.post('/api/register', (req, res) => {
  const { name, email, password, clerkUserId } = req.body;
  const db = router.db;
  const profiles = db.get('profiles');

  // Allow any email to register (no uniqueness check)
  const newId = profiles.value().length ? Math.max(...profiles.value().map(p => p.id)) + 1 : 1;
  const profile = { id: newId, name, email, password, clerkUserId, bookings: [] };
  profiles.push(profile).write();

  // Don't return password
  res.json({ id: profile.id, name: profile.name, email: profile.email });
});

// Login (mock, returns profile if email/password match)
server.post('/api/login', (req, res) => {
  const { email, password, clerkUserId } = req.body;
  const db = router.db;
  let profile = null;
  if (clerkUserId) {
    profile = db.get('profiles').find({ clerkUserId }).value();
    if (!profile) {
      // Auto-create profile if logging in via Clerk for the first time
      const profiles = db.get('profiles');
      const newId = profiles.value().length ? Math.max(...profiles.value().map(p => p.id)) + 1 : 1;
      profile = { id: newId, name: req.body.name || email, email, clerkUserId, bookings: [] };
      profiles.push(profile).write();
    }
  } else {
    profile = db.get('profiles').find({ email, password }).value();
  }

  if (!profile) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Don't return password
  res.json({ id: profile.id, name: profile.name, email: profile.email });
});
// Fetch profile by Clerk user id
server.get('/api/profiles/by-clerk/:clerkUserId', (req, res) => {
  const { clerkUserId } = req.params;
  const db = router.db;
  const profile = db.get('profiles').find({ clerkUserId }).value();
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  const bookings = db.get('bookings').filter({ profileId: profile.id }).value();
  const profileData = { ...profile, bookings };
  delete profileData.password;
  res.json(profileData);
});

// Book a hotel (must provide profileId)
server.post('/api/bookings', (req, res) => {
  const { profileId, clerkUserId, packageId, guests, startDate, endDate, roomType } = req.body;
  const db = router.db;
  const profiles = db.get('profiles');
  const bookings = db.get('bookings');

  let profile = null;
  if (profileId) {
    profile = profiles.find({ id: parseInt(profileId) }).value();
  }

  if (!profile && clerkUserId) {
    profile = profiles.find({ clerkUserId }).value();
    if (!profile) {
      // Auto-create a profile when booking via Clerk for the first time
      const newProfileId = profiles.value().length ? Math.max(...profiles.value().map(p => p.id)) + 1 : 1;
      const fallbackEmail = req.body.email || `${clerkUserId}@example.com`;
      profile = { id: newProfileId, name: req.body.name || fallbackEmail, email: fallbackEmail, clerkUserId, bookings: [] };
      profiles.push(profile).write();
    }
  }

  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const newId = bookings.value().length ? Math.max(...bookings.value().map(b => b.id)) + 1 : 1;
  const booking = {
    id: newId,
    profileId: profile.id,
    packageId: parseInt(packageId),
    guests: parseInt(guests),
    startDate,
    endDate,
    roomType,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  bookings.push(booking).write();
  profile.bookings.push(newId);
  profiles.find({ id: profile.id }).assign({ bookings: profile.bookings }).write();

  res.json(booking);
});

// Get profile details and bookings
server.get('/api/profiles/:id', (req, res) => {
  const { id } = req.params;
  const db = router.db;
  const profile = db.get('profiles').find({ id: parseInt(id) }).value();

  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const bookings = db.get('bookings').filter({ profileId: parseInt(id) }).value();
  const profileData = { ...profile, bookings };

  // Remove password before sending
  delete profileData.password;

  res.json(profileData);
});

// --- End Custom Profile & Booking Endpoints ---

// Use default router for other routes
server.use('/api', router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});