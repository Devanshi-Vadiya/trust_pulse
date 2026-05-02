import { memo } from 'react';
import { Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AppCard = ({
  children,
  noPadding = false,
  sx = {},
  contentSx = {},
  className = '',
  ...props
}) => {
  const theme = useTheme();

  // Base styling for cards
  const baseSx = {
    border: theme.palette.mode === 'light' ? '1px solid #e5e7eb' : '1px solid #334155',
    borderRadius: '14px',
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e293b',
    transition: 'all 0.2s',
    ...sx,
  };

  return (
    <Card elevation={0} sx={baseSx} className={className} {...props}>
      {noPadding ? children : <CardContent sx={{ p: 2.5, ...contentSx }}>{children}</CardContent>}
    </Card>
  );
};

export default memo(AppCard);
