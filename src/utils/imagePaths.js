// Utility function to get correct image paths for different environments
export const getImagePath = (imagePath) => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // In production (GitHub Pages), use the base path
  if (import.meta.env.PROD) {
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  }
  
  // In development, use root path
  return `/${cleanPath}`;
};

// Common image paths
export const IMAGES = {
  travel: 'images/travel.jpg',
  // Destinations
  bali: 'images/destinations/bali.jpg',
  santorini: 'images/destinations/santorini.jpg',
  maldives: 'images/destinations/maldives.jpg',
  udaipur: 'images/destinations/udaipur-lake-palace.jpg',
  agra: 'images/destinations/agra-amarvilas.jpg',
  kerala: 'images/destinations/kerala-leela.jpg',
  jaipur: 'images/destinations/jaipur-rambagh.jpg',
  mumbai: 'images/destinations/mumbai-taj.jpg',
  jodhpur: 'images/destinations/jodhpur-umaid.jpg',
  goa: 'images/destinations/goa-taj.jpg',
  ranthambore: 'images/destinations/ranthambore-oberoi.jpg',
  swissAlps: 'images/destinations/swiss-alps.jpg',
  // Packages
  tajLakePalace: 'images/packages/taj-lake-palace.jpg',
  santoriniGrace: 'images/packages/santorini-grace.jpg',
  burjAlArab: 'images/packages/burj-al-arab.jpg',
  amalfiRetreat: 'images/packages/amalfi-retreat.jpg',
  rambaghPalace: 'images/packages/rambagh-palace.jpg',
  maldivesVilla: 'images/packages/maldives-villa.jpg',
  // Background images
  newsletterBg: 'images/newsletter-bg.jpg',
  patternBg: 'images/pattern-bg.png',
  // Testimonials
  guest1: 'images/testimonials/guest1.jpg',
  guest2: 'images/testimonials/guest2.jpg',
  guest3: 'images/testimonials/guest3.jpg',
  guest4: 'images/testimonials/guest4.jpg',
  // Add more images as needed
};