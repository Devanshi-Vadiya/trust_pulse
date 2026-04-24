import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = () => {
  return (
    <Box className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />
      <Box className="flex-1 flex flex-col h-full bg-slate-50 relative min-w-0">
        {/* Pass activeTab and title dynamically in absolute nested routes if preferred, 
            for now just use standard properties */}
        <TopBar activeTab="Dashboard" />
        
        {/* Content area */}
        <Box className="flex-1 overflow-auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
