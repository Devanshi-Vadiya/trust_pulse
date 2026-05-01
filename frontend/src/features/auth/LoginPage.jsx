import { useState, useCallback } from 'react';
import PageSEO from '../../components/PageSEO';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Security as SecurityIcon } from '@mui/icons-material';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value })),
    []
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);
      try {
        await login(form.email, form.password);
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [form, login, navigate]
  );

  return (
    <>
      <PageSEO
        title="Sign In"
        description="Sign in to your TrustPulse AI clinical dashboard to access real-time product safety verification tools."
        path="/login"
      />
      <Box
        component="main"
        role="main"
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 420,
            backgroundColor: '#fff',
            borderRadius: '20px',
            p: { xs: 3, md: 4 },
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                backgroundColor: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SecurityIcon sx={{ color: '#1d4ed8', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: 800, fontSize: '1.125rem', color: '#111827', lineHeight: 1 }}
              >
                TrustPulse AI
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Clinical Precision Engine
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#111827', mb: 0.5 }}>
            Welcome back
          </Typography>
          <Typography sx={{ fontSize: '0.9375rem', color: '#6b7280', mb: 3 }}>
            Sign in to your clinical dashboard
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>
              Email Address
            </Typography>
            <AppInput
              fullWidth
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              sx={{ mb: 2.5 }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 0.75,
              }}
            >
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
                Password
              </Typography>
              <Typography
                sx={{ fontSize: '0.8125rem', color: '#1d4ed8', fontWeight: 500, cursor: 'pointer' }}
              >
                Forgot password?
              </Typography>
            </Box>
            <AppInput
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((v) => !v)} edge="end" size="small">
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <AppButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: '#1d4ed8',
                fontWeight: 700,
                fontSize: '1rem',
                py: 1.5,
                borderRadius: '10px',
                textTransform: 'none',
                mb: 2,
                '&:hover': { backgroundColor: '#1e40af' },
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </AppButton>
          </form>

          <Typography sx={{ textAlign: 'center', fontSize: '0.9375rem', color: '#6b7280' }}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{ color: '#1d4ed8', fontWeight: 600, textDecoration: 'none' }}
            >
              Create one
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
