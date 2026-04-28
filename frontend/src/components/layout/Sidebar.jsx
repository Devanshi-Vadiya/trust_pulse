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
  { text: 'Safety History', icon: <HistoryIcon />, path: '/sugar-tracker' },
  { text: 'Risk Reports', icon: <AssessmentIcon />, path: '/report' },
  { text: 'Verified Products', icon: <VerifiedIcon />, path: '/scan' },
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
    <Box className="w-64 h-screen flex flex-col border-r border-gray-100 bg-white flex-shrink-0 relative">
      {/* Header Logo */}
      <Box className="p-8 flex items-center gap-3">
        <Box className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
          <SecurityIcon fontSize="medium" />
        </Box>
        <Box>
          <Typography className="font-bold text-gray-900 text-lg leading-tight">TrustPulse AI</Typography>
          <Typography variant="caption" className="text-gray-400 font-medium">Clinical Precision Engine</Typography>
        </Box>
      </Box>

      {/* Main Navigation */}
      <Box className="flex-1 px-4 py-2">
        <List className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  onClick={() => navigate(item.path)}
                  selected={isActive}
                  sx={{
                    borderRadius: '12px',
                    mb: 0.5,
                    py: 1.5,
                    color: isActive ? '#1d4ed8' : '#6b7280',
                    backgroundColor: isActive ? '#eff6ff !important' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                    },
                    '&.Mui-selected': {
                      '& .MuiListItemIcon-root': {
                        color: '#1d4ed8',
                      },
                      '& .MuiListItemText-primary': {
                        fontWeight: 700,
                        color: '#111827',
                      }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: isActive ? '#1d4ed8' : '#9ca3af' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontSize: '0.9375rem', 
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
      <Box className="p-6">
        <Box className="p-5 rounded-2xl bg-gray-50 mb-6">
          <Typography className="text-gray-900 font-bold text-sm mb-3">Get advanced clinical insights.</Typography>
          <Button 
            variant="contained" 
            fullWidth 
            className="bg-primary-600 hover:bg-primary-700 shadow-md shadow-primary-500/20 rounded-xl py-2.5 font-bold normal-case text-sm"
          >
            Upgrade to Pro
          </Button>
        </Box>
        
        <Divider className="mb-4 opacity-50" />
        
        <List dense disablePadding>
          <ListItem disablePadding>
            <ListItemButton className="rounded-lg text-gray-500 py-2">
              <ListItemIcon className="min-w-[36px] text-gray-400">
                <HelpOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Help Center" primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className="rounded-lg text-gray-500 py-2">
              <ListItemIcon className="min-w-[36px] text-gray-400">
                <PrivacyTipIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Privacy" primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} className="rounded-lg text-gray-500 py-2 mt-1">
              <ListItemIcon className="min-w-[36px] text-gray-400">
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
