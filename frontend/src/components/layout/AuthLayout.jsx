import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box className="min-h-screen bg-gray-50 flex">
      {/* We can add a split layout here later if needed, matching the design. 
          For now, just centering the child components like Login/Signup cards. */}
      <Box className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
