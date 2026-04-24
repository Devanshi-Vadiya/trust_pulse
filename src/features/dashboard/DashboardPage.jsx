import { Box, Typography, Grid, Card, CardContent, IconButton, Button, Avatar, Chip, LinearProgress } from '@mui/material';
import { 
  QrCodeScanner as QrCodeScannerIcon, 
  WarningAmber as WarningIcon, 
  CheckCircleOutlined as SafeIcon, 
  TrendingUp as TrendingUpIcon,
  Science as ScienceIcon,
  LocalDining as FoodIcon,
  Medication as MedsIcon,
  ArrowForwardIos as ArrowForwardIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const statCards = [
  { title: 'Total Scans', value: '12,483', change: '+14.5%', trend: 'up', icon: <QrCodeScannerIcon fontSize="medium" />, color: 'blue' },
  { title: 'Safe Products', value: '9,842', change: '+8.2%', trend: 'up', icon: <SafeIcon fontSize="medium" />, color: 'green' },
  { title: 'Risks Detected', value: '1,204', change: '-3.1%', trend: 'down', icon: <WarningIcon fontSize="medium" />, color: 'orange' },
  { title: 'Trust Score', value: '94.2%', change: '+1.2%', trend: 'up', icon: <TrendingUpIcon fontSize="medium" />, color: 'purple' },
];

const recentScans = [
  { id: 'SCN-8482', product: 'Oatly Barista Edition', category: 'Beverage', risk: 'Low', time: '2 mins ago', icon: <FoodIcon /> },
  { id: 'SCN-8481', product: 'Advil Liqui-Gels', category: 'Pharmaceutical', risk: 'Low', time: '15 mins ago', icon: <MedsIcon /> },
  { id: 'SCN-8480', product: 'Unknown Supplement', category: 'Health', risk: 'High', time: '1 hour ago', icon: <ScienceIcon /> },
  { id: 'SCN-8479', product: 'Kind Bar Peanut Butter', category: 'Snack', risk: 'Medium', time: '3 hours ago', icon: <FoodIcon /> },
];

const DashboardPage = () => {
  return (
    <Box className="flex flex-col p-6 lg:p-8 space-y-8 pb-20 animate-fade-in font-sans">
      
      {/* Header Section */}
      <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Box>
          <Typography variant="h4" className="font-bold text-gray-900 tracking-tight mb-1">
            Platform Dashboard
          </Typography>
          <Typography className="text-gray-500 font-medium">
            Welcome back, Admin. Here is today's ecosystem overview.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<QrCodeScannerIcon />}
          className="bg-primary-600 hover:bg-primary-700 shadow-md shadow-primary-500/30 rounded-xl py-2.5 px-6 font-semibold normal-case"
        >
          New Scan
        </Button>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={3}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card className="rounded-2xl border-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_20px_-6px_rgba(6,81,237,0.15)] transition-all duration-300 relative overflow-hidden group">
              <Box className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500`} />
              <CardContent className="p-6">
                <Box className="flex justify-between items-start mb-4">
                  <Box className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600 shadow-inner`}>
                    {stat.icon}
                  </Box>
                  <Chip 
                    label={stat.change} 
                    size="small" 
                    className={`font-bold ${stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`} 
                  />
                </Box>
                <Typography className="text-gray-500 font-medium text-sm mb-1">{stat.title}</Typography>
                <Typography variant="h4" className="font-bold text-gray-900">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Left Column: Charts / Analytics */}
        <Grid item xs={12} lg={8}>
          <Card className="rounded-2xl border-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] h-full flex flex-col">
            <CardContent className="p-6 flex-1">
              <Box className="flex justify-between items-center mb-6">
                <Box>
                  <Typography variant="h6" className="font-bold text-gray-900">Scan Activity</Typography>
                  <Typography variant="body2" className="text-gray-500">Volume across past 7 days</Typography>
                </Box>
                <IconButton size="small"><MoreVertIcon /></IconButton>
              </Box>
              
              {/* Fake Chart CSS Bars */}
              <Box className="h-64 flex items-end gap-2 sm:gap-4 mt-8 pb-4 relative">
                {/* Y-axis lines */}
                <Box className="absolute inset-0 flex flex-col justify-between pt-2 pb-6 border-b border-gray-100 z-0">
                  {[...Array(4)].map((_, i) => (
                    <Box key={i} className="w-full border-t border-dashed border-gray-200/60" />
                  ))}
                </Box>
                
                {/* Bars */}
                {[40, 70, 45, 90, 65, 80, 100].map((height, i) => (
                  <Box key={i} className="flex-1 flex flex-col justify-end items-center z-10 group cursor-pointer">
                    <Box 
                      className="w-full bg-blue-100 rounded-t-sm group-hover:bg-blue-200 transition-colors relative"
                      sx={{ height: `${height}%` }}
                    >
                      <Box 
                        className="absolute bottom-0 w-full bg-primary-600 rounded-t-sm shadow-sm transition-all duration-500 group-hover:bg-primary-500"
                        sx={{ height: `${height * 0.7}%` }}
                      />
                    </Box>
                    <Typography variant="caption" className="text-gray-400 mt-2 font-medium">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Recent Activity Feed */}
        <Grid item xs={12} lg={4}>
          <Card className="rounded-2xl border-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] h-full">
            <CardContent className="p-6">
              <Box className="flex justify-between items-center mb-6">
                <Typography variant="h6" className="font-bold text-gray-900">Real-time Feed</Typography>
                <Button size="small" className="text-primary-600 normal-case font-medium">View All</Button>
              </Box>

              <Box className="space-y-6">
                {recentScans.map((scan, i) => (
                  <Box key={i} className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                    <Avatar className={`bg-${scan.risk === 'Low' ? 'green' : scan.risk === 'Medium' ? 'orange' : 'red'}-50 text-${scan.risk === 'Low' ? 'green' : scan.risk === 'Medium' ? 'orange' : 'red'}-600 rounded-xl`}>
                      {scan.icon}
                    </Avatar>
                    <Box className="flex-1 min-w-0">
                      <Typography className="font-semibold text-gray-900 truncate">
                        {scan.product}
                      </Typography>
                      <Box className="flex items-center gap-2 mt-0.5">
                        <Typography variant="caption" className="text-gray-500">{scan.category}</Typography>
                        <Box className="w-1 h-1 rounded-full bg-gray-300" />
                        <Typography variant="caption" className="text-gray-500">{scan.time}</Typography>
                      </Box>
                    </Box>
                    <IconButton size="small" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowForwardIcon fontSize="inherit" className="text-gray-400" />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Box className="mt-8 pt-6 border-t border-gray-100">
                <Typography variant="subtitle2" className="font-bold text-gray-900 mb-4">System Status</Typography>
                <Box className="space-y-4">
                  <Box>
                    <Box className="flex justify-between mb-1">
                      <Typography variant="caption" className="font-medium text-gray-600">Database Sync</Typography>
                      <Typography variant="caption" className="text-gray-900 font-bold">98%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={98} className="rounded-full h-1.5 bg-gray-100" sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#10b981' } }} />
                  </Box>
                  <Box>
                    <Box className="flex justify-between mb-1">
                      <Typography variant="caption" className="font-medium text-gray-600">API Usage</Typography>
                      <Typography variant="caption" className="text-gray-900 font-bold">45%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={45} className="rounded-full h-1.5 bg-gray-100" sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#3b82f6' } }} />
                  </Box>
                </Box>
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
