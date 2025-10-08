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

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err?.response?.data?.error || err?.message || 'Registration failed';
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
              Create Account
            </Typography>
            <Typography variant="body1" gutterBottom align="center" sx={{ mb: 3, color: 'text.secondary' }}>
              Join us to discover amazing travel experiences
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Stack component="form" spacing={2} onSubmit={handleSubmit}>
              <TextField name="name" label="Full Name" value={form.name} onChange={handleChange} required fullWidth />
              <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} required fullWidth />
              <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required fullWidth />
              <Button type="submit" variant="contained" disabled={loading} fullWidth sx={{ py: 1.5 }}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Stack>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              Already have an account? <Link component={RouterLink} to="/login">Sign In</Link>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Background>
  );
};

export default Register;