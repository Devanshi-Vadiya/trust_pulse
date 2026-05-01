import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import AppButton from '../../components/AppButton';
import PageSEO from '../../components/PageSEO';

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageSEO
        title="Welcome"
        description="TrustPulse AI — Real-time clinical product safety verification. Verify sugar, alcohol, and water purity instantly."
        path="/"
      />
      <Box
        component="main"
        role="main"
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
          p: 3,
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '20px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            mb: 3,
            backdropFilter: 'blur(10px)',
          }}
        >
          🛡️
        </Box>

        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '3rem' },
            color: '#fff',
            lineHeight: 1.1,
            mb: 1.5,
          }}
        >
          TrustPulse AI
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            color: 'rgba(255,255,255,0.7)',
            mb: 1,
            fontWeight: 500,
          }}
        >
          Clinical Precision Engine
        </Typography>

        <Typography
          sx={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', mb: 6, maxWidth: 480 }}
        >
          Real-time product safety verification powered by advanced clinical intelligence.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <AppButton
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              backgroundColor: '#fff',
              color: '#1d4ed8',
              fontWeight: 700,
              fontSize: '1rem',
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#f0f9ff' },
            }}
          >
            Get Started
          </AppButton>
          <AppButton
            variant="outlined"
            onClick={() => navigate('/signup')}
            sx={{
              borderColor: 'rgba(255,255,255,0.4)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              textTransform: 'none',
              '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Create Account
          </AppButton>
        </Box>

        <Typography sx={{ mt: 6, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
          Trusted by clinical safety professionals worldwide
        </Typography>
      </Box>
    </>
  );
};

export default SplashPage;
