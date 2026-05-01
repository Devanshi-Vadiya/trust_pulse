import { memo } from 'react';
import { TextField } from '@mui/material';

const AppInput = ({
  variant = 'outlined',
  size = 'small',
  fullWidth = true,
  sx = {},
  ...props
}) => {
  // Base styling for text fields to ensure consistent borders and focus states
  const baseSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '& fieldset': { borderColor: '#e5e7eb' },
      '&:hover fieldset': { borderColor: '#d1d5db' },
      '&.Mui-focused fieldset': { borderColor: '#2563eb' },
    },
    ...sx,
  };

  return <TextField variant={variant} size={size} fullWidth={fullWidth} sx={baseSx} {...props} />;
};

export default memo(AppInput);
