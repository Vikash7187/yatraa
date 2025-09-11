import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Paper, Stack, TextField, Typography, Alert, Link } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

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
      navigate('/bookings');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
            <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required />
            <Button type="submit" variant="contained" disabled={loading}>Login</Button>
          </Stack>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link component={RouterLink} to="/register">Register</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;


