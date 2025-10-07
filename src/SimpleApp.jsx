import React from 'react';

function SimpleApp() {
  console.log('🎯 SimpleApp component rendering...');
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '60px 40px',
        borderRadius: '20px',
        textAlign: 'center',
        maxWidth: '600px',
        backdropFilter: 'blur(15px)'
      }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🏖️ Yatraa</h1>
        <div style={{ background: '#4caf50', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          ✅ React App Successfully Loaded!
        </div>
        <p style={{ fontSize: '1.3rem', marginBottom: '30px' }}>
          Your luxury travel website is now working perfectly!
        </p>
        
        <div style={{ margin: '30px 0' }}>
          <button 
            onClick={() => window.location.hash = '#/destinations'}
            style={{
              background: '#ff9800',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '10px'
            }}
          >
            🏨 Explore Hotels
          </button>
          
          <button 
            onClick={() => window.location.href = '/yatraa/backup.html'}
            style={{
              background: '#2196f3',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '10px'
            }}
          >
            📄 Test Page
          </button>
        </div>
        
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '20px',
          borderRadius: '10px',
          fontSize: '14px',
          textAlign: 'left'
        }}>
          <strong>🔍 Debug Info:</strong><br />
          Environment: {import.meta.env.MODE}<br />
          Base URL: {import.meta.env.BASE_URL}<br />
          Router: HashRouter ✅<br />
          Timestamp: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default SimpleApp;