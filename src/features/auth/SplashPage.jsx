import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Security as SecurityIcon, 
  AssuredWorkload as AssuredWorkloadIcon, 
  Analytics as AnalyticsIcon, 
  VerifiedUser as VerifiedUserIcon 
} from '@mui/icons-material';

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      className="min-h-screen flex items-center justify-center p-4"
      sx={{
        background: 'linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)',
      }}
    >
      <Paper 
        elevation={0}
        className="max-w-md w-full p-10 text-center rounded-2xl border border-blue-100 bg-white/80 backdrop-blur-sm shadow-xl"
      >
        <Box className="w-20 h-20 bg-primary-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
          <SecurityIcon className="text-white !text-4xl" />
        </Box>
        
        <Typography variant="h4" className="font-bold text-gray-900 mb-2">
          TrustPulse AI
        </Typography>
        <Typography variant="subtitle1" className="text-primary-600 font-medium mb-6">
          Clinical Precision Engine
        </Typography>
        
        <Typography variant="body1" className="text-gray-600 mb-10 text-lg">
          Empowering consumer safety through data-driven transparency and real-time risk assessment.
        </Typography>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          size="large"
          className="py-3 shadow-md bg-primary-600 hover:bg-primary-700 font-medium text-lg"
          onClick={() => navigate('/login')}
          disableElevation
        >
          Get Started &rarr;
        </Button>

        <Box className="mt-10 flex justify-center gap-6 text-gray-400">
          <VerifiedUserIcon fontSize="small" />
          <AnalyticsIcon fontSize="small" />
          <AssuredWorkloadIcon fontSize="small" />
        </Box>
      </Paper>
    </Box>
  );
};

export default SplashPage;
