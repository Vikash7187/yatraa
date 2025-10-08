import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Destinations from './components/Destinations/Destinations';
import Packages from './components/Packages/Packages';
import PackageDetail from './components/Packages/PackageDetail';
import Bookings from './components/Bookings/Bookings';
import BookingForm from './components/Booking/BookingForm';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ClerkAuthWrapper from './components/Auth/ClerkAuthWrapper';
import UserProfile from './components/Profile/UserProfile';
import AddPackage from './components/Profile/AddPackage';
import ClerkConfigError from './components/ErrorBoundary/ClerkConfigError';
import PackageErrorBoundary from './components/ErrorBoundary/PackageErrorBoundary';
import ConfigMissing from './components/ErrorBoundary/ConfigMissing';
import AuthDebug from './components/Auth/AuthDebug';
import ClerkTest from './components/Auth/ClerkTest';
import ApiTest from './components/Auth/ApiTest';
import AuthDebugProfile from './components/Auth/AuthDebugProfile';
import TestApi from './components/TestApi'; // Add this import
import { useAuth } from './context/AuthContext';
import { SignIn, SignUp } from '@clerk/clerk-react';
import './App.css';

function App() {
  // Debug information for GitHub Pages
  console.log('App rendering...');
  console.log('Environment:', import.meta.env.MODE);
  console.log('Base URL:', import.meta.env.BASE_URL);
  
  // Authentication System Configuration
  // Set useClerkAuth to true to use Clerk authentication
  // Set useClerkAuth to false to use custom authentication with backend
  const useClerkAuth = true;
  const hasValidClerkKey = useClerkAuth && import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
                          import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder';
  
  console.log('Using Clerk Auth:', useClerkAuth);
  console.log('Clerk Key from ENV:', import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  console.log('Clerk Key Length:', import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.length);
  console.log('Clerk Key starts with pk_:', import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.startsWith('pk_'));
  console.log('Environment DEV:', import.meta.env.DEV);
  console.log('Environment PROD:', import.meta.env.PROD);
  console.log('Clerk available:', hasValidClerkKey);
  console.log('Current location:', window.location.pathname);
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={
          <PackageErrorBoundary>
            <PackageDetail />
          </PackageErrorBoundary>
        } />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/add-package" element={<AddPackage />} />
        <Route 
          path="/login" 
          element={hasValidClerkKey ? (
            <Box sx={{ pt: 8, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <SignIn 
                signUpUrl="/register"
                afterSignInUrl="/"
                redirectUrl="/"
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
                    card: 'shadow-lg border border-gray-200'
                  }
                }}
              />
            </Box>
          ) : (
            <Box sx={{ pt: 8, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Login />
            </Box>
          )} 
        />
        <Route 
          path="/register" 
          element={hasValidClerkKey ? (
            <Box sx={{ pt: 8, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <SignUp 
                signInUrl="/login"
                afterSignUpUrl="/"
                redirectUrl="/"
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
                    card: 'shadow-lg border border-gray-200'
                  }
                }}
              />
            </Box>
          ) : (
            <Box sx={{ pt: 8, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Register />
            </Box>
          )} 
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth-debug" element={<AuthDebug />} />
        <Route path="/clerk-test" element={<ClerkTest />} />
        <Route path="/api-test" element={<ApiTest />} />
        <Route path="/auth-debug-profile" element={<AuthDebugProfile />} />
        <Route path="/test-api" element={<TestApi />} /> {/* Add this route */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;