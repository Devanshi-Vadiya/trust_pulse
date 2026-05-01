import { memo } from 'react';
import { Button } from '@mui/material';

const AppButton = ({ children, variant = 'contained', color = 'primary', sx = {}, ...props }) => {
  // Default base styling for all buttons
  const baseSx = {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '8px',
    boxShadow: variant === 'contained' ? 'none' : undefined,
    '&:hover': {
      boxShadow: variant === 'contained' ? 'none' : undefined,
    },
    ...sx,
  };

  return (
    <Button variant={variant} color={color} sx={baseSx} disableElevation {...props}>
      {children}
    </Button>
  );
};

export default memo(AppButton);
