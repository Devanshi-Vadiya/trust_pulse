import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Security as SecurityIcon, 
  GridView as DashboardIcon, 
  History as HistoryIcon, 
  Assessment as AssessmentIcon, 
  Verified as VerifiedIcon, 
  Settings as SettingsIcon, 
  HelpOutlined as HelpOutlineIcon, 
  PrivacyTip as PrivacyTipIcon, 
  Logout as LogoutIcon 
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { text: 'Home Overview', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Safety History', icon: <HistoryIcon />, path: '/history' },
  { text: 'Risk Reports', icon: <AssessmentIcon />, path: '/reports' },
  { text: 'Verified Products', icon: <VerifiedIcon />, path: '/products' },
  { text: 'Platform Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box className="w-64 h-screen flex flex-col border-r border-gray-200 bg-white flex-shrink-0 relative overflow-y-auto overflow-x-hidden">
      {/* Header Logo */}
      <Box className="p-6 flex items-center gap-3">
        <Box className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white">
          <SecurityIcon fontSize="small" />
        </Box>
        <Box>
          <Typography className="font-bold text-gray-900 leading-tight">TrustPulse AI</Typography>
          <Typography variant="caption" className="text-gray-500 hidden xl:block">Clinical Precision Engine</Typography>
        </Box>
      </Box>

      {/* Main Navigation */}
      <Box className="flex-1 px-3 py-2">
        <List>
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            
            return (
              <ListItem key={item.text} disablePadding className="mb-1">
                <ListItemButton 
                  onClick={() => navigate(item.path)}
                  selected={isActive}
                  className={`rounded-xl transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-primary-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#eff6ff', // blue-50
                      color: '#1d4ed8', // blue-700
                      '&:hover': {
                         backgroundColor: '#dbeafe', // blue-100
                      }
                    }
                  }}
                >
                  <ListItemIcon className={`min-w-[40px] ${isActive ? 'text-primary-700' : 'text-gray-400'}`}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontSize: '0.875rem', 
                      fontWeight: isActive ? 600 : 500
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer Navigation */}
      <Box className="p-4 mt-auto">
        <Box className="px-2 mb-4">
          <Button 
            variant="contained" 
            fullWidth 
            className="bg-primary-600 hover:bg-primary-700 shadow-none py-2"
          >
            Upgrade to Pro
          </Button>
        </Box>
        
        <Divider className="mb-2" />
        
        <List dense>
          <ListItem disablePadding>
            <ListItemButton className="rounded-lg text-gray-500">
              <ListItemIcon className="min-w-[36px] text-gray-400">
                <HelpOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Help Center" primaryTypographyProps={{ fontSize: '0.8125rem' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className="rounded-lg text-gray-500">
              <ListItemIcon className="min-w-[36px] text-gray-400">
                <PrivacyTipIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Privacy" primaryTypographyProps={{ fontSize: '0.8125rem' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} className="rounded-lg text-red-600 mt-2">
              <ListItemIcon className="min-w-[36px] text-red-500">
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Sign Out" primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
