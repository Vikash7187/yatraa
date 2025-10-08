import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import SimpleApp from './SimpleApp.jsx';
import theme from './theme';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import GitHubPagesFallback from './components/GitHubPagesFallback.jsx';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Environment variable validation with fallbacks for GitHub Pages
if (!clerkPubKey || clerkPubKey === 'pk_test_placeholder') {
  console.warn('⚠️ Missing or invalid VITE_CLERK_PUBLISHABLE_KEY environment variable');
  console.warn('🔄 Running in demo mode - authentication features will be limited.');
  console.warn('🔑 To enable full authentication, add your Clerk publishable key:');
  console.warn('📋 1. Get your key from: https://dashboard.clerk.com/last-active?path=api-keys');
  console.warn('📋 2. Create .env file with: VITE_CLERK_PUBLISHABLE_KEY=your_actual_key_here');
  console.warn('📋 3. For GitHub Pages: Set repository secret VITE_CLERK_PUBLISHABLE_KEY');
}

// Enhanced error boundary for GitHub Pages debugging
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    console.error('🚨 ErrorBoundary - Error caught:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 React Error Boundary caught an error:', error, errorInfo);
    console.log('📍 Location:', window.location.href);
    console.log('📦 Environment:', import.meta.env.MODE);
    console.log('🔗 Base URL:', import.meta.env.BASE_URL);
    console.log('🔍 Error Stack:', error.stack);
    console.log('🔍 Component Stack:', errorInfo.componentStack);
    this.setState({ errorInfo });
    
    // Log specific error details for debugging
    if (error.message.includes('Cannot resolve module')) {
      console.error('❌ Module resolution error - check imports');
    }
    if (error.message.includes('is not defined')) {
      console.error('❌ Variable/function not defined error');
    }
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
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🏖️ Yatraa Travel</h1>
            <div style={{ background: '#f44336', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
              ⚠️ Application Error Detected
            </div>
            <p>The React application encountered an error during loading.</p>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>Error: {this.state.error?.message}</p>
            <details style={{ textAlign: 'left', marginTop: '20px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '5px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>🔍 Error Details</summary>
              <pre style={{ fontSize: '12px', overflow: 'auto', marginTop: '10px', whiteSpace: 'pre-wrap' }}>
                {this.state.error?.stack}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  background: '#4caf50',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                🔄 Reload Page
              </button>
              <button 
                onClick={() => window.location.href = '/yatraa/'} 
                style={{
                  background: '#2196f3',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                🏠 Go Home
              </button>
            </div>
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
console.log('🔑 Clerk Key Available:', !!clerkPubKey && clerkPubKey !== 'pk_test_placeholder');
console.log('🔄 Demo Mode:', !clerkPubKey || clerkPubKey === 'pk_test_placeholder');

// Add navigation debugging
window.addEventListener('popstate', (event) => {
  console.log('🧭 Navigation event:', event);
  console.log('📍 New location:', window.location.href);
});

// Add click debugging for links
document.addEventListener('click', (event) => {
  const target = event.target.closest('a');
  if (target) {
    console.log('🔗 Link clicked:', target.href);
    console.log('📍 Current location:', window.location.href);
  }
});

try {
  console.log('🎨 Creating React Root...');
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found in DOM');
  }
  
  const root = ReactDOM.createRoot(rootElement);
  
  console.log('🎨 Rendering App with Router...');
  const basename = import.meta.env.PROD ? "/yatraa" : "/";
  console.log('🗺️ Router basename:', basename);
  console.log('🏗️ Base URL from Vite:', import.meta.env.BASE_URL);
  
  // Verify all imports are available
  console.log('🔍 Checking imports...');
  console.log('App component:', typeof App);
  console.log('React component:', typeof React);
  console.log('HashRouter component:', typeof HashRouter);
  console.log('BrowserRouter component:', typeof BrowserRouter);
  console.log('ThemeProvider component:', typeof ThemeProvider);
  console.log('ClerkProvider component:', typeof ClerkProvider);
  console.log('AuthProvider component:', typeof AuthProvider);
  console.log('theme object:', typeof theme);
  
  // Use BrowserRouter for proper Clerk routing in development
  const Router = BrowserRouter;
  const routerProps = {};
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <Router {...routerProps}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {clerkPubKey && clerkPubKey !== 'pk_test_placeholder' ? (
              <ClerkProvider 
                publishableKey={clerkPubKey} 
                afterSignOutUrl="/"
                signInUrl="/login"
                signUpUrl="/register"
                allowedRedirectOrigins={[window.location.origin]}
              >
                <AuthProvider>
                  <App />
                </AuthProvider>
              </ClerkProvider>
            ) : (
              <AuthProvider>
                <App />
              </AuthProvider>
            )}
          </ThemeProvider>
        </Router>
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('✅ React app rendered successfully');
  
} catch (error) {
  console.error('🚨 Fatal error during React app initialization:', error);
  console.error('🚨 Error stack:', error.stack);
  
  // More detailed error information
  if (error.message.includes('Root element')) {
    console.error('❌ DOM Issue: Root element #root not found in index.html');
  }
  if (error.message.includes('Cannot resolve')) {
    console.error('❌ Import Issue: Check if all imported modules exist');
  }
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
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
          max-width: 700px;
          margin: 0 auto;
        ">
          <h1 style="font-size: 2.5rem; margin-bottom: 20px;">🏖️ Yatraa Travel</h1>
          <div style="background: #f44336; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            ⚠️ Fatal Application Error
          </div>
          <p>Failed to initialize the React application.</p>
          <p style="font-size: 14px; margin-top: 20px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 5px;">Error: ${error.message}</p>
          <div style="margin-top: 20px;">
            <button onclick="window.location.reload()" style="
              background: #4caf50;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              margin-right: 10px;
            ">
              🔄 Reload Page
            </button>
            <button onclick="console.log('Error details:', '${error.stack}')" style="
              background: #ff9800;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
            ">
              🔍 Show Error in Console
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
