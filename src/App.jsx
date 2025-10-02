import { Routes, Route } from 'react-router-dom';
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
import UserProfile from './components/Profile/UserProfile';
import AddPackage from './components/Profile/AddPackage';
import ClerkConfigError from './components/ErrorBoundary/ClerkConfigError';
import PackageErrorBoundary from './components/ErrorBoundary/PackageErrorBoundary';
import { useAuth } from './context/AuthContext';
import { SignIn, SignUp } from '@clerk/clerk-react';
import './App.css';

function App() {
  const { user } = useAuth();
  const hasClerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
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
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/add-package" element={<AddPackage />} />
        <Route 
          path="/login" 
          element={hasClerkKey ? <SignIn redirectUrl="/" /> : <ClerkConfigError />} 
        />
        <Route 
          path="/register" 
          element={hasClerkKey ? <SignUp redirectUrl="/" /> : <ClerkConfigError />} 
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
