import { useState, useCallback } from 'react';
import PageSEO from '../../components/PageSEO';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Security as SecurityIcon } from '@mui/icons-material';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { useAuth } from '../../hooks/useAuth';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
        await signup(form.name, form.email, form.password);
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [form, signup, navigate]
  );

  return (
    <>
      <PageSEO
        title="Create Account"
        description="Create your free TrustPulse AI account and start verifying product safety in real-time with clinical intelligence."
        path="/signup"
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
                sx={{ fontWeight: 800, fontSize: '1.125rem', color: 'text.primary', lineHeight: 1 }}
              >
                TrustPulse AI
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                Clinical Precision Engine
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: '1.5rem', color: 'text.primary', mb: 0.5 }}>
            Create your account
          </Typography>
          <Typography sx={{ fontSize: '0.9375rem', color: 'text.secondary', mb: 3 }}>
            Start verifying product safety today
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary', mb: 0.75 }}>
              Full Name
            </Typography>
            <AppInput
              fullWidth
              name="name"
              placeholder="Dr. Sarah Jenkins"
              value={form.name}
              onChange={handleChange}
              required
              sx={{ mb: 2.5 }}
            />

            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary', mb: 0.75 }}>
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

            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary', mb: 0.75 }}>
              Password
            </Typography>
            <AppInput
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
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
              {loading ? 'Creating account...' : 'Create Account'}
            </AppButton>
          </form>

          <Typography sx={{ textAlign: 'center', fontSize: '0.9375rem', color: 'text.secondary' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1d4ed8', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SignupPage;
