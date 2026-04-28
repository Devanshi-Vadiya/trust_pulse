import { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton, Divider } from '@mui/material';
import { Search as SearchIcon, Download as DownloadIcon, CheckCircle as CheckIcon, Cancel as CancelIcon, Warning as WarnIcon } from '@mui/icons-material';

const custodyHistory = [
  { date: 'Today, 14:32 UTC', type: 'Consumer Scan', location: 'Berlin, DE', actor: 'Mobile App User', status: 'Cloned Scan', statusType: 'cloned' },
  { date: 'Today, 09:15 UTC', type: 'Consumer Scan', location: 'Paris, FR', actor: 'Web Portal', status: 'Cloned Scan', statusType: 'cloned' },
  { date: 'Oct 28, 08:00 UTC', type: 'Retail Received', location: 'Lyon, FR', actor: 'Boutique Vins', status: 'Verified', statusType: 'verified' },
  { date: 'Oct 25, 11:20 UTC', type: 'Customs Cleared', location: 'Calais, FR', actor: 'FR Customs Auth', status: 'Verified', statusType: 'verified' },
  { date: 'Oct 15, 16:45 UTC', type: 'Origin Encoded', location: 'Inverness, UK', actor: 'Distillery System', status: 'Genesis', statusType: 'genesis' },
];

const AlcoholVerificationPage = () => {
  const [code, setCode] = useState('AX-7729-B1');

  const statusStyles = {
    cloned: { bg: '#fee2e2', color: '#dc2626', label: 'Cloned Scan', icon: <WarnIcon sx={{ fontSize: 12 }} /> },
    verified: { bg: '#f0fdf4', color: '#16a34a', label: 'Verified', icon: <CheckIcon sx={{ fontSize: 12 }} /> },
    genesis: { bg: '#eff6ff', color: '#1d4ed8', label: 'Genesis', icon: <CheckIcon sx={{ fontSize: 12 }} /> },
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1.75rem', color: '#111827' }}>Verification Report</Typography>
          <Typography sx={{ color: '#6b7280', fontSize: '0.9375rem' }}>Analysis of Unique Identification Code #AX-7729-B1</Typography>
        </Box>
        <Button variant="outlined" startIcon={<DownloadIcon />}
          sx={{ borderColor: '#e5e7eb', color: '#374151', textTransform: 'none', fontWeight: 600, borderRadius: '8px', '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' } }}>
          Export PDF
        </Button>
      </Box>

      {/* Main grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '360px 1fr' }, gap: 3 }}>
        {/* Left */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Manual Code Entry */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
                <Box sx={{ fontSize: '1.125rem' }}>⊞</Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>Manual Code Entry</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.8125rem', color: '#6b7280', mb: 2 }}>Enter a 10-digit alphanumeric security code to run a fresh verification scan.</Typography>
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', mb: 1 }}>Security Code</Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <TextField fullWidth size="small" value={code} onChange={(e) => setCode(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.9375rem', '& fieldset': { borderColor: '#e5e7eb' }, '&.Mui-focused fieldset': { borderColor: '#2563eb' } } }} />
                <IconButton sx={{ backgroundColor: '#1d4ed8', color: '#fff', borderRadius: '8px', width: 42, height: 42, flexShrink: 0, '&:hover': { backgroundColor: '#1e40af' } }}>
                  <SearchIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>

          {/* Suspicious status */}
          <Card elevation={0} sx={{ border: '1px solid #fecaca', borderRadius: '14px', backgroundColor: '#fff' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                <CancelIcon sx={{ fontSize: 32, color: '#dc2626' }} />
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.375rem', color: '#dc2626', mb: 0.5 }}>Suspicious</Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#dc2626', mb: 2.5 }}>Multiple scans detected.</Typography>
              <Box sx={{ backgroundColor: '#fff5f5', border: '1px solid #fecaca', borderRadius: '10px', p: 2, textAlign: 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <WarnIcon sx={{ fontSize: 18, color: '#dc2626', flexShrink: 0, mt: 0.25 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: '#dc2626', mb: 0.5 }}>Duplicate Scan Warning</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#374151', lineHeight: 1.6 }}>
                      This genuine code has been scanned <strong>4 times</strong> across 3 different geographical locations within 48 hours. High probability of label cloning.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Product card */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px', overflow: 'hidden' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '280px 1fr' } }}>
              <Box sx={{ backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220, p: 2 }}>
                <Typography sx={{ fontSize: '6rem' }}>🥃</Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, backgroundColor: '#dbeafe', borderRadius: '6px', px: 1.5, py: 0.5 }}>
                    <CheckIcon sx={{ fontSize: 13, color: '#1d4ed8' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#1d4ed8' }}>Code Matches Product</Typography>
                  </Box>
                  <Box sx={{ backgroundColor: '#f3f4f6', borderRadius: '6px', px: 1.5, py: 0.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151' }}>750ml / 43% ABV</Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 0.5 }}>HIGHLAND RESERVE</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: '1.375rem', color: '#111827', mb: 1 }}>18 Year Single Malt</Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#6b7280', mb: 2.5, lineHeight: 1.6 }}>Authentic expression matured in Oloroso sherry casks. Registered for distribution within the…</Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                  {[['Batch Number', 'HR-2023-B882'], ['Production Date', 'Oct 14, 2023'], ['Distillery Location', 'Inverness, Scotland'], ['Intended Market', 'France']].map(([k, v]) => (
                    <Box key={k}>
                      <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af', mb: 0.25 }}>{k}</Typography>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{v}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Box>
          </Card>

          {/* Chain of custody */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Box sx={{ fontSize: '1.125rem' }}>⊞</Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: '#111827' }}>Chain of Custody & Scan History</Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 1, pb: 1.5, mb: 1, borderBottom: '1px solid #f3f4f6' }}>
                {['DATE & TIME', 'EVENT TYPE', 'LOCATION', 'ACTOR', 'STATUS'].map(h => (
                  <Typography key={h} sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em' }}>{h}</Typography>
                ))}
              </Box>
              {custodyHistory.map((row, i) => {
                const s = statusStyles[row.statusType];
                return (
                  <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 1, alignItems: 'center', py: 1.75, borderBottom: i < custodyHistory.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#374151' }}>{row.date}</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#374151' }}>{row.type}</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#374151' }}>{row.location}</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#374151' }}>{row.actor}</Typography>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, backgroundColor: s.bg, borderRadius: '6px', px: 1, py: 0.25, width: 'fit-content' }}>
                      <Box sx={{ color: s.color }}>{s.icon}</Box>
                      <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, color: s.color }}>{s.label}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AlcoholVerificationPage;
