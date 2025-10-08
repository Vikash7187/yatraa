import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Paper, Stack, TextField, Typography, Alert, Link } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import travelImage from '../../assets/travel.jpg';

const Background = ({ children }) => (
  <>
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${travelImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
      }}
    />
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1,
      }}
    />
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
      }}
    >
      {children}
    </Box>
  </>
);

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err?.response?.data?.error || err?.message || 'Invalid email or password';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 8,
        }}
      >
        <Container maxWidth="sm">
          <Paper sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom align="center">
              Welcome Back
            </Typography>
            <Typography variant="body1" gutterBottom align="center" sx={{ mb: 3, color: 'text.secondary' }}>
              Sign in to your account to continue your journey
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Stack component="form" spacing={2} onSubmit={handleSubmit}>
              <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} required fullWidth />
              <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required fullWidth />
              <Button type="submit" variant="contained" disabled={loading} fullWidth sx={{ py: 1.5 }}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Stack>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              Don't have an account? <Link component={RouterLink} to="/register">Register</Link>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Background>
  );
};

export default Login;