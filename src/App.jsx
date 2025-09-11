import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Destinations from './components/Destinations/Destinations';
import Packages from './components/Packages/Packages';
import PackageDetail from './components/Packages/PackageDetail';
import Bookings from './components/Bookings/Bookings';
import BookingForm from './components/Booking/BookingForm';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { useAuth } from './context/AuthContext';
import { SignIn, SignUp } from '@clerk/clerk-react';
import './App.css';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/login" element={<SignIn redirectUrl="/bookings" />} />
        <Route path="/register" element={<SignUp redirectUrl="/bookings" />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
