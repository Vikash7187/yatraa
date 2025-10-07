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

// Enhanced error boundary for GitHub Pages debugging
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 React Error Boundary caught an error:', error, errorInfo);
    console.log('📍 Location:', window.location.href);
    console.log('📦 Environment:', import.meta.env.MODE);
    console.log('🔗 Base URL:', import.meta.env.BASE_URL);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '40px',
            borderRadius: '15px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🏖️ Yatraa Travel</h1>
            <div style={{ background: '#f44336', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
              ⚠️ Application Error Detected
            </div>
            <p>The React application encountered an error during loading.</p>
            <details style={{ textAlign: 'left', marginTop: '20px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '5px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>🔍 Error Details</summary>
              <pre style={{ fontSize: '12px', overflow: 'auto', marginTop: '10px' }}>
                Error: {this.state.error?.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                background: '#4caf50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              🔄 Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Enhanced logging for GitHub Pages debugging
console.log('🚀 Yatraa App Starting...');
console.log('📍 Current URL:', window.location.href);
console.log('📦 Environment:', import.meta.env.MODE);
console.log('🔗 Base URL:', import.meta.env.BASE_URL);
console.log('🐛 Development Mode:', import.meta.env.DEV);
console.log('📦 Production Mode:', import.meta.env.PROD);
console.log('🔑 Clerk Key Available:', !!clerkPubKey);

try {
  console.log('🎨 Creating React Root...');
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  console.log('🎨 Rendering App with Router...');
  const basename = import.meta.env.PROD ? "/yatraa" : "/";
  console.log('🗺️ Router basename:', basename);
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter basename={basename}>
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
  
  console.log('✅ React app rendered successfully');
  
} catch (error) {
  console.error('🚨 Fatal error during React app initialization:', error);
  document.getElementById('root').innerHTML = `
    <div style="
      padding: 40px; 
      text-align: center; 
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
      color: white;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    ">
      <div style="
        background: rgba(255, 255, 255, 0.1);
        padding: 40px;
        border-radius: 15px;
        max-width: 600px;
        margin: 0 auto;
      ">
        <h1 style="font-size: 2.5rem; margin-bottom: 20px;">🏖️ Yatraa Travel</h1>
        <div style="background: #f44336; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          ⚠️ Fatal Application Error
        </div>
        <p>Failed to initialize the React application.</p>
        <p style="font-size: 14px; margin-top: 20px;">Error: ${error.message}</p>
        <button onclick="window.location.reload()" style="
          background: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        ">
          🔄 Reload Page
        </button>
      </div>
    </div>
  `;
}
