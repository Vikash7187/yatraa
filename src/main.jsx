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
import GitHubPagesFallback from './components/GitHubPagesFallback.jsx';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Environment variable validation with fallbacks for GitHub Pages
if (!clerkPubKey) {
  console.warn('⚠️ Missing VITE_CLERK_PUBLISHABLE_KEY environment variable');
  console.warn('Running in demo mode - authentication features will be limited.');
  if (import.meta.env.DEV) {
    console.warn('Please add your Clerk publishable key to the environment variables:');
    console.warn('VITE_CLERK_PUBLISHABLE_KEY=your_actual_key_here');
    console.warn('Get your key from: https://dashboard.clerk.com/');
  }
}

// Error boundary for GitHub Pages
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <GitHubPagesFallback />;
    }
    return this.props.children;
  }
}

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter basename={import.meta.env.PROD ? "/yatraa" : "/"}>
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
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render React app:', error);
  // Fallback rendering
  document.getElementById('root').innerHTML = `
    <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
      <h1 style="color: #d32f2f;">⚠️ Application Error</h1>
      <p>Failed to load the React application. Please check the browser console for details.</p>
      <p style="color: #666; font-size: 14px;">Error: ${error.message}</p>
    </div>
  `;
}
