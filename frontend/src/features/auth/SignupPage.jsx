import { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, CircularProgress, Link } from '@mui/material';
import { 
  Visibility, VisibilityOff, 
  Security as SecurityIcon, 
  AlternateEmail as EmailIcon, 
  LockOutlined as LockIcon,
  PersonOutlined as PersonIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name is too short')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain one lowercase letter')
    .matches(/[A-Z]/, 'Must contain one uppercase letter')
    .matches(/[0-9]/, 'Must contain one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const { signup, error } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const success = await signup(values.email, values.password, values.fullName);
      
      if (success) {
        enqueueSnackbar('Account created successfully', { variant: 'success' });
        navigate('/dashboard');
      } else {
        enqueueSnackbar(error || 'Failed to create account', { variant: 'error' });
      }
    },
  });

  return (
    <Box className="min-h-screen flex w-full bg-slate-50 font-sans">
      {/* Left Decoration Panel */}
      <Box className="hidden lg:flex lg:w-1/2 relative bg-primary-700 overflow-hidden flex-col justify-center items-center text-white">
        <Box className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <Box className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <Box className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
        
        <Box className="relative z-10 w-full max-w-md backdrop-blur-sm bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl">
          <Box className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-6 shadow-inner backdrop-blur-md">
            <SecurityIcon fontSize="large" className="text-white" />
          </Box>
          <Typography variant="h3" className="font-bold mb-4 tracking-tight">
            Join TrustPulse
          </Typography>
          <Typography variant="h6" className="font-normal text-blue-100 opacity-90 leading-relaxed mb-8">
            Create an account to start tracking metabolic risks and verifying consumable safety in real-time.
          </Typography>
        </Box>
      </Box>

      {/* Right Form Panel */}
      <Box className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white relative overflow-y-auto">
        <Box className="w-full max-w-md my-8">
          <Box className="mb-8">
            <Typography variant="h4" className="font-bold text-gray-900 mb-2 tracking-tight">
              Create Account
            </Typography>
            <Typography className="text-gray-500 font-medium">
              Join the clinical precision platform today.
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Full Name */}
            <Box className="space-y-1">
              <Typography className="text-sm font-semibold text-gray-700 ml-1">Full Name</Typography>
              <TextField
                fullWidth
                name="fullName"
                variant="outlined"
                placeholder="John Doe"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon className="text-gray-400" fontSize="small" />
                    </InputAdornment>
                  ),
                  className: 'bg-gray-50/50 rounded-xl border-gray-200'
                }}
              />
            </Box>

            {/* Email */}
            <Box className="space-y-1">
              <Typography className="text-sm font-semibold text-gray-700 ml-1">Email Address</Typography>
              <TextField
                fullWidth
                name="email"
                variant="outlined"
                placeholder="john@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className="text-gray-400" fontSize="small" />
                    </InputAdornment>
                  ),
                  className: 'bg-gray-50/50 rounded-xl border-gray-200'
                }}
              />
            </Box>

            {/* Password */}
            <Box className="space-y-1">
              <Typography className="text-sm font-semibold text-gray-700 ml-1">Password</Typography>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className="text-gray-400" fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  className: 'bg-gray-50/50 rounded-xl border-gray-200'
                }}
              />
            </Box>

            {/* Confirm Password */}
            <Box className="space-y-1">
              <Typography className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</Typography>
              <TextField
                fullWidth
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                placeholder="••••••••"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className="text-gray-400" fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} size="small">
                        {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  className: 'bg-gray-50/50 rounded-xl border-gray-200'
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={formik.isSubmitting}
              className={`py-3.5 rounded-xl font-semibold shadow-lg shadow-primary-500/30 transition-all ${formik.isSubmitting ? 'bg-primary-400' : 'bg-primary-600'}`}
              sx={{ textTransform: 'none', mt: 2 }}
            >
              {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>

            <Box className="mt-6 text-center">
              <Typography className="text-gray-500 text-sm">
                Already have an account?{' '}
                <Link href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} underline="none" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                  Log In
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
