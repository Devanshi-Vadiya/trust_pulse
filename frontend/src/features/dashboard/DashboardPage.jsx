import { Box, Typography, Button, Card, CardContent, Chip, LinearProgress } from '@mui/material';
import { 
  QrCodeScanner as QrCodeScannerIcon, 
  WaterDrop as WaterIcon,
  LocalDrink as DrinkIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const SugarGauge = ({ value }) => {
  const pct = Math.min(value / 100, 1);
  const r = 45, cx = 60, cy = 60;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={120} height={120} viewBox="0 0 120 120">
        {/* Background circle segments */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={10} strokeDasharray="5 2" />
        {/* Progress circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#92400e" strokeWidth={10}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }} />
      </svg>
      <Box sx={{ position: 'absolute', textAlign: 'center' }}>
        <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: '#111827', lineHeight: 1 }}>{value}g</Typography>
        <Typography sx={{ fontSize: '0.75rem', color: '#6b7280' }}>Consumed</Typography>
      </Box>
    </Box>
  );
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Devanshi';

  return (
    <Box className="p-8 lg:p-12 space-y-10 animate-fade-in bg-white min-h-full font-sans">
      
      {/* Header Section */}
      <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <Box>
          <Typography variant="h3" className="font-bold text-gray-900 tracking-tight mb-2">
            Hi {firstName}!
          </Typography>
          <Typography className="text-gray-500 text-lg font-medium">
            Here is your daily clinical safety digest.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<QrCodeScannerIcon />}
          onClick={() => navigate('/scan')}
          className="bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 rounded-xl py-3 px-8 font-bold normal-case text-lg"
        >
          Scan Product
        </Button>
      </Box>

      {/* Feature Cards Grid */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Sugar Tracker Card */}
        <Card elevation={0} className="rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-8 flex flex-col items-center">
            <Box className="w-full flex justify-between items-start mb-6">
              <Box className="flex items-center gap-3">
                <Box className="text-amber-700">💧</Box>
                <Typography className="font-bold text-2xl text-gray-900 leading-tight">
                  Sugar<br />Tracker
                </Typography>
              </Box>
              <Chip 
                label="Warning" 
                size="small" 
                className="bg-amber-700 text-white font-bold rounded-lg px-2" 
              />
            </Box>

            <Box className="my-6">
              <SugarGauge value={60} />
            </Box>

            <Typography className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
              Daily recommended limit is 50g. You are currently tracking above average.
            </Typography>

            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<AddIcon />}
              onClick={() => navigate('/sugar-tracker')}
              className="border-gray-300 text-gray-700 font-bold py-2.5 rounded-xl normal-case hover:bg-gray-50"
            >
              Log Item
            </Button>
          </CardContent>
        </Card>

        {/* Alcohol Status Card */}
        <Card elevation={0} className="rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-8 flex flex-col items-center">
            <Box className="w-full flex justify-between items-start mb-6">
              <Box className="flex items-center gap-3">
                <DrinkIcon className="text-blue-700" />
                <Typography className="font-bold text-2xl text-gray-900 leading-tight">
                  Alcohol Status
                </Typography>
              </Box>
              <Chip 
                label="Clear" 
                size="small" 
                className="bg-blue-100 text-blue-700 font-bold rounded-lg px-2" 
              />
            </Box>

            <Box className="my-10 w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center">
              <CheckCircleIcon className="text-blue-600 text-5xl" />
            </Box>

            <Typography className="font-bold text-gray-900 text-center text-lg mb-2">
              All clear for today.
            </Typography>
            <Typography className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
              No conflicting medications or recent alerts detected in your profile.
            </Typography>

            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<SearchIcon />}
              onClick={() => navigate('/alcohol-verification')}
              className="border-gray-300 text-gray-700 font-bold py-2.5 rounded-xl normal-case hover:bg-gray-50"
            >
              Verify Beverage
            </Button>
          </CardContent>
        </Card>

        {/* Water Purity Card */}
        <Card elevation={0} className="rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-8">
            <Box className="flex items-center gap-3 mb-8">
              <WaterIcon className="text-blue-500" />
              <Typography className="font-bold text-2xl text-gray-900 leading-tight">
                Water Purity
              </Typography>
            </Box>

            <Box className="mb-6">
              <Box className="flex items-baseline gap-1 mb-1">
                <Typography className="font-black text-5xl text-gray-900">98</Typography>
                <Typography className="text-gray-400 font-bold text-xl">/ 100</Typography>
              </Box>
              <Box className="flex items-center gap-1 text-blue-600">
                <TrendingUpIcon fontSize="small" />
                <Typography className="font-bold text-sm uppercase tracking-wider">Excellent Quality</Typography>
              </Box>
            </Box>

            <Box className="mb-10">
              <LinearProgress 
                variant="determinate" 
                value={98} 
                className="h-2 rounded-full bg-gray-100"
                sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#1d4ed8' } }}
              />
            </Box>

            <Typography className="text-gray-500 text-sm mb-8 leading-relaxed">
              Recent scan at Home location indicates optimal mineral balance and low contaminants.
            </Typography>

            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<DrinkIcon />}
              onClick={() => navigate('/water-verification')}
              className="border-gray-300 text-gray-700 font-bold py-2.5 rounded-xl normal-case hover:bg-gray-50"
            >
              Test Source
            </Button>
          </CardContent>
        </Card>

      </Box>
    </Box>
  );
};

export default DashboardPage;
