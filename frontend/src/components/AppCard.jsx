import { memo } from 'react';
import { Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';

const AppCard = ({
  children,
  noPadding = false,
  sx = {},
  contentSx = {},
  className = '',
  ...props
}) => {
  const themeMode = useSelector((state) => state.ui.themeMode);

  // Base styling for cards
  const baseSx = {
    border: themeMode === 'light' ? '1px solid #e5e7eb' : '1px solid #334155',
    borderRadius: '14px',
    backgroundColor: themeMode === 'light' ? '#ffffff' : '#1e293b',
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
