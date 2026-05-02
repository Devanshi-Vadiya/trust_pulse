import { Box, Typography, IconButton, Avatar, InputBase, Paper } from '@mui/material';
import { 
  Search as SearchIcon, 
  NotificationsNone as NotificationsNoneIcon, 
  Contrast as ContrastIcon, 
  SettingsOutlined as SettingsOutlinedIcon 
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/slices/uiSlice';

const TopBar = ({ titleText, activeTab }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  
  return (
    <Box className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 w-full">
      {/* Left section - Context/Search depending on page */}
      <Box className="flex items-center gap-6">
        {titleText ? (
          <Typography variant="h6" className="font-semibold text-gray-800 dark:text-gray-100">
            {titleText}
          </Typography>
        ) : (
          <Paper
            component="form"
            elevation={0}
            className="flex items-center px-3 py-1 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full w-80 lg:w-96"
          >
            <SearchIcon className="text-gray-400 dark:text-slate-500 mr-2" fontSize="small" />
            <InputBase
              placeholder="Search product code or name..."
              className="flex-1 text-sm text-gray-700 dark:text-gray-200"
            />
          </Paper>
        )}

        {/* Global Tabs - hidden if on specific detailed views */}
        <Box className="hidden md:flex ml-4 border-b-2 border-transparent">
          {['Dashboard', 'Scans', 'Alerts'].map((tab) => (
            <button 
              key={tab}
              className={`px-4 py-5 text-sm font-medium border-b-2 -mb-[2px] transition-colors ${
                activeTab === tab 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:text-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </Box>
      </Box>

      {/* Right Section - Actions */}
      <Box className="flex items-center gap-1 sm:gap-2">
        <IconButton size="small" className="text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:bg-slate-800">
          <NotificationsNoneIcon fontSize="small" />
        </IconButton>
        
        <IconButton size="small" className="text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:bg-slate-800" onClick={() => dispatch(toggleTheme())}>
          <ContrastIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" className="text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:bg-slate-800 mr-2">
          <SettingsOutlinedIcon fontSize="small" />
        </IconButton>
        
        <Avatar 
          src={user?.avatar || "https://i.pravatar.cc/150?u=a042581f4e29026704d"} 
          alt="User Profile"
          sx={{ width: 32, height: 32 }}
          className="border border-gray-200 dark:border-slate-700 cursor-pointer"
        />
      </Box>
    </Box>
  );
};

export default TopBar;
