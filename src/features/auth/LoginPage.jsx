import { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, CircularProgress, Link } from '@mui/material';
import { Visibility, VisibilityOff, Security as SecurityIcon, AlternateEmail as EmailIcon, LockOutlined as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const success = await login(values.email, values.password);
      
      if (success) {
        enqueueSnackbar('Login successful', { variant: 'success' });
        navigate('/dashboard');
      } else {
        enqueueSnackbar(error || 'Invalid credentials', { variant: 'error' });
      }
    },
  });

  return (
    <Box className="min-h-screen flex w-full bg-slate-50 font-sans">
      {/* Left Decoration Panel - TrustPulse Branding */}
      <Box className="hidden lg:flex lg:w-1/2 relative bg-primary-700 overflow-hidden flex-col justify-center items-center text-white">
        {/* Dynamic Background Elements */}
        <Box className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <Box className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <Box className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
        
        {/* Glassmorphism content card */}
        <Box className="relative z-10 w-full max-w-md backdrop-blur-sm bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl">
          <Box className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-6 shadow-inner backdrop-blur-md">
            <SecurityIcon fontSize="large" className="text-white" />
          </Box>
          <Typography variant="h3" className="font-bold mb-4 tracking-tight">
            TrustPulse AI
          </Typography>
          <Typography variant="h6" className="font-normal text-blue-100 opacity-90 leading-relaxed mb-8">
            The next generation clinical precision engine. Ensuring safety, compliance, and verified intelligence across modern platforms.
          </Typography>
          
          {/* Feature Ticks */}
          <Box className="space-y-4">
            {['Enterprise Grade Security', 'Real-time Risk Reports', 'Automated Verification Workflows'].map((text, i) => (
              <Box key={i} className="flex items-center space-x-3 text-blue-50">
                <Box className="w-5 h-5 rounded-full bg-blue-400/30 flex items-center justify-center border border-blue-300/30">
                  <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Box>
                <Typography className="text-sm font-medium tracking-wide">{text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right Login Panel */}
      <Box className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <Box className="w-full max-w-md">
          {/* Mobile Logo */}
          <Box className="lg:hidden flex items-center gap-3 mb-8">
            <Box className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
              <SecurityIcon fontSize="small" />
            </Box>
            <Typography className="font-bold text-xl text-gray-900 tracking-tight">TrustPulse</Typography>
          </Box>

          <Box className="mb-10 text-center lg:text-left">
            <Typography variant="h4" className="font-bold text-gray-900 mb-2 tracking-tight">
              Welcome back
            </Typography>
            <Typography className="text-gray-500 font-medium">
              Enter your credentials to access your dashboard.
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <Box className="space-y-1">
              <Typography className="text-sm font-semibold text-gray-700 ml-1">Work Email</Typography>
              <TextField
                fullWidth
                name="email"
                variant="outlined"
                placeholder="admin@trustpulse.ai"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className="text-gray-400" fontSize="small" />
                    </InputAdornment>
                  ),
                  className: 'bg-gray-50/50 hover:bg-gray-50 focus-within:bg-white transition-colors duration-200 rounded-xl border-gray-200 text-gray-800'
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#e5e7eb' },
                    '&:hover fieldset': { borderColor: '#d1d5db' },
                    '&.Mui-focused fieldset': { borderColor: '#2563eb', borderWidth: '2px' },
                  }
                }}
              />
            </Box>

            <Box className="space-y-1">
              <Box className="flex justify-between items-center ml-1">
                <Typography className="text-sm font-semibold text-gray-700">Password</Typography>
                <Link href="#" underline="none" className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Forgot password?
                </Link>
              </Box>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className="text-gray-400" fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        className="text-gray-400 hover:text-gray-600"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  className: 'bg-gray-50/50 hover:bg-gray-50 focus-within:bg-white transition-colors duration-200 rounded-xl border-gray-200 text-gray-800'
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#e5e7eb' },
                    '&:hover fieldset': { borderColor: '#d1d5db' },
                    '&.Mui-focused fieldset': { borderColor: '#2563eb', borderWidth: '2px' },
                  }
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={formik.isSubmitting}
              className={`py-3.5 rounded-xl font-semibold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:bg-primary-700 transition-all duration-200 text-[15px] ${formik.isSubmitting ? 'bg-primary-400' : 'bg-primary-600'}`}
              sx={{ textTransform: 'none' }}
            >
              {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Log In Securely'}
            </Button>

            <Box className="mt-8 text-center">
              <Typography className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <Link 
                  href="/signup" 
                  onClick={(e) => { e.preventDefault(); navigate('/signup'); }} 
                  underline="none" 
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
