import React from 'react';

// Minimal fallback component for GitHub Pages
const GitHubPagesFallback = () => {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#1976d2', marginBottom: '20px' }}>
          🏖️ Yatraa - Travel & Tourism
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          Welcome to Yatraa! Your gateway to luxury travel experiences.
        </p>
        <div style={{ marginBottom: '30px' }}>
          <img 
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Travel Destination"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <p style={{ color: '#888', fontSize: '14px' }}>
          🚧 Full application loading... Please wait or check browser console for details.
        </p>
      </div>
    </div>
  );
};

export default GitHubPagesFallback;