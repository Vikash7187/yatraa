import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import theme from './theme';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { ClerkProvider } from '@clerk/clerk-react';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Environment variable validation
if (!clerkPubKey) {
  console.error('❌ Missing VITE_CLERK_PUBLISHABLE_KEY environment variable');
  console.error('Please add your Clerk publishable key to the .env file:');
  console.error('VITE_CLERK_PUBLISHABLE_KEY=your_actual_key_here');
  console.error('Get your key from: https://dashboard.clerk.com/');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ClerkProvider 
          publishableKey={clerkPubKey || 'pk_test_placeholder'} 
          afterSignOutUrl="/"
        >
          <AuthProvider>
            <App />
          </AuthProvider>
        </ClerkProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
