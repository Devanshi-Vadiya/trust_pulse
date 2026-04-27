import { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Avatar } from '@mui/material';
import { QrCodeScanner as QrCodeScannerIcon, Search as SearchIcon, CheckCircle as CheckCircleIcon, Warning as WarningIcon, Cancel as CancelIcon, HelpOutlined as HelpIcon, ZoomOutMap as ExpandIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const recentScans = [
  { id: 1, name: 'DermaProtect Daily Lotion', upc: '08523940211', status: 'CLINICALLY SAFE', statusColor: '#16a34a', statusBg: '#dcfce7', icon: '🧴', statusIcon: 'check' },
  { id: 2, name: 'VitaGlow Complex', upc: '49201183302', status: 'MODERATE RISK', statusColor: '#b45309', statusBg: '#fef9c3', icon: '💊', statusIcon: 'warn' },
  { id: 3, name: 'Industrial Surface Prep', upc: '11099482733', status: 'HAZARDOUS', statusColor: '#dc2626', statusBg: '#fee2e2', icon: '🧪', statusIcon: 'cancel' },
  { id: 4, name: 'Unknown Product', upc: 'Manual Entry: 994032', status: 'NOT FOUND', statusColor: '#6b7280', statusBg: '#f3f4f6', icon: '📦', statusIcon: 'help' },
];

const StatusIcon = ({ type }) => {
  const props = { sx: { fontSize: 13 } };
  if (type === 'check') return <CheckCircleIcon {...props} sx={{ ...props.sx, color: '#16a34a' }} />;
  if (type === 'warn') return <WarningIcon {...props} sx={{ ...props.sx, color: '#b45309' }} />;
  if (type === 'cancel') return <CancelIcon {...props} sx={{ ...props.sx, color: '#dc2626' }} />;
  return <HelpIcon {...props} sx={{ ...props.sx, color: '#6b7280' }} />;
};

const ScanProductPage = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const handleVerify = () => { if (code.trim()) navigate('/product/sample'); };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1.75rem', color: '#111827', mb: 0.5 }}>Product Analysis</Typography>
          <Typography sx={{ color: '#6b7280', fontSize: '0.9375rem' }}>Initiate real-time scan or manual entry for clinical safety verification.</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: '20px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16a34a' }} />
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#16a34a' }}>API Active</Typography>
        </Box>
      </Box>

      {/* Grid layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 300px' }, gap: 3 }}>
        {/* Left */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Scanner */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px', overflow: 'hidden' }}>
            <Box sx={{ px: 2.5, py: 1.75, borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <QrCodeScannerIcon sx={{ fontSize: 18, color: '#374151' }} />
                <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: '#111827' }}>Live Scanner View</Typography>
              </Box>
              <ExpandIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
            </Box>
            <Box sx={{ position: 'relative', backgroundColor: '#4b5563', height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '5rem' }}>📷</Typography>
              {/* Frame */}
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 220, height: 160, border: '2px solid #3b82f6', borderRadius: '4px' }}>
                <Box sx={{ position: 'absolute', top: -2, left: -2, width: 18, height: 18, borderTop: '3px solid #60a5fa', borderLeft: '3px solid #60a5fa' }} />
                <Box sx={{ position: 'absolute', top: -2, right: -2, width: 18, height: 18, borderTop: '3px solid #60a5fa', borderRight: '3px solid #60a5fa' }} />
                <Box sx={{ position: 'absolute', bottom: -2, left: -2, width: 18, height: 18, borderBottom: '3px solid #60a5fa', borderLeft: '3px solid #60a5fa' }} />
                <Box sx={{ position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderBottom: '3px solid #60a5fa', borderRight: '3px solid #60a5fa' }} />
              </Box>
              {/* Hint */}
              <Box sx={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '20px', px: 2.5, py: 0.875, display: 'flex', alignItems: 'center', gap: 1 }}>
                <QrCodeScannerIcon sx={{ fontSize: 13, color: '#93c5fd' }} />
                <Typography sx={{ color: '#d1d5db', fontSize: '0.8125rem' }}>Position barcode within frame...</Typography>
              </Box>
            </Box>
          </Card>

          {/* Manual entry */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <QrCodeScannerIcon sx={{ fontSize: 16, color: '#374151' }} />
                <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: '#111827' }}>Manual Code Entry</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth size="small" placeholder="Enter 12-14 digit product code..."
                  value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: '#e5e7eb' }, '&.Mui-focused fieldset': { borderColor: '#2563eb' } } }}
                />
                <Button variant="contained" startIcon={<SearchIcon />} onClick={handleVerify}
                  sx={{ backgroundColor: '#1d4ed8', textTransform: 'none', fontWeight: 600, borderRadius: '8px', px: 3, whiteSpace: 'nowrap', '&:hover': { backgroundColor: '#1e40af' } }}>
                  Verify Code
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right - Recent Scans */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', color: '#111827' }}>Recent Scans</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#1d4ed8', fontWeight: 600, cursor: 'pointer' }}>View All</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {recentScans.map((scan) => (
              <Card key={scan.id} elevation={0} onClick={() => navigate('/product/sample')}
                sx={{ border: '1px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: '#bfdbfe', boxShadow: '0 2px 8px rgba(29,78,216,0.08)' } }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 44, height: 44, borderRadius: '10px', backgroundColor: '#f3f4f6', fontSize: '1.25rem' }}>{scan.icon}</Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827', mb: 0.25 }} noWrap>{scan.name}</Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af', mb: 0.75 }} noWrap>UPC: {scan.upc}</Typography>
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, backgroundColor: scan.statusBg, borderRadius: '4px', px: 1, py: 0.25 }}>
                        <StatusIcon type={scan.statusIcon} />
                        <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, color: scan.statusColor }}>{scan.status}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScanProductPage;
