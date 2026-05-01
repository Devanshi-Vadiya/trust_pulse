import { Component } from 'react';
import { Box, Typography } from '@mui/material';
import {
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import AppButton from './AppButton';
import AppCard from './AppCard';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            backgroundColor: '#0f172a',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <AppCard
            elevation={0}
            sx={{ maxWidth: 500, width: '100%', textAlign: 'center', p: { xs: 2, md: 4 } }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WarningIcon sx={{ fontSize: 32, color: '#dc2626' }} />
              </Box>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>
              Something went wrong
            </Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '0.9375rem', mb: 4 }}>
              A critical error occurred while rendering this page. Our team has been notified.
            </Typography>

            <Box
              sx={{
                backgroundColor: '#1e293b',
                p: 2,
                borderRadius: '8px',
                mb: 4,
                textAlign: 'left',
                overflowX: 'auto',
              }}
            >
              <Typography sx={{ color: '#ef4444', fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                {this.state.error?.toString()}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <AppButton
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={this.handleReset}
                sx={{
                  borderColor: '#334155',
                  color: '#f8fafc',
                  '&:hover': { borderColor: '#475569', backgroundColor: '#334155' },
                }}
              >
                Try Again
              </AppButton>
              <AppButton
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={this.handleGoHome}
                sx={{ backgroundColor: '#1d4ed8', '&:hover': { backgroundColor: '#1e40af' } }}
              >
                Go to Dashboard
              </AppButton>
            </Box>
          </AppCard>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
