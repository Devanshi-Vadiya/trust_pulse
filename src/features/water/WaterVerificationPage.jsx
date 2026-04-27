import { Box, Typography, Button, Card, CardContent, Divider, LinearProgress } from '@mui/material';
import { Share as ShareIcon, Download as DownloadIcon, CheckCircle as CheckIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TDSGauge = ({ value }) => {
  const pct = Math.min(value / 500, 1);
  const r = 55, cx = 70, cy = 70;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={14} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1d4ed8" strokeWidth={14}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '70px 70px' }} />
      </svg>
      <Box sx={{ position: 'absolute', textAlign: 'center' }}>
        <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#111827', lineHeight: 1 }}>{value}</Typography>
        <Typography sx={{ fontSize: '0.6875rem', color: '#6b7280', mt: 0.25 }}>TDS (ppm)</Typography>
      </Box>
    </Box>
  );
};

const chems = [
  { label: 'pH Level', target: 'Target: 6.5 – 8.5', value: '7.2', status: 'OPTIMAL', statusColor: '#16a34a' },
  { label: 'Lead (Pb)', target: 'Limit: < 0.01 mg/L', value: 'ND', status: 'SAFE', statusColor: '#16a34a' },
  { label: 'Arsenic (As)', target: 'Limit: < 0.01 mg/L', value: 'ND', status: 'SAFE', statusColor: '#16a34a' },
  { label: 'Fluoride (F)', target: 'Limit: < 1.5 mg/L', value: '0.4 mg/L', status: 'OPTIMAL', statusColor: '#16a34a' },
];

const WaterVerificationPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}>
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography sx={{ fontSize: '0.875rem', color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#374151' } }} onClick={() => navigate('/products')}>Verified Products</Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#9ca3af' }}>›</Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500 }}>Batch Analysis</Typography>
      </Box>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.75rem', color: '#111827' }}>Water Verification Report</Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<ShareIcon />}
            sx={{ borderColor: '#e5e7eb', color: '#374151', textTransform: 'none', fontWeight: 600, borderRadius: '8px', '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' } }}>
            Share
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />}
            sx={{ backgroundColor: '#1d4ed8', textTransform: 'none', fontWeight: 600, borderRadius: '8px', '&:hover': { backgroundColor: '#1e40af' } }}>
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Main grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 280px' }, gap: 2.5 }}>
        {/* Left */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Overall Status */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 0.5 }}>OVERALL STATUS</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#111827' }}>Batch #W-2023-89A</Typography>
                </Box>
                <Box sx={{ backgroundColor: '#f3f4f6', borderRadius: '6px', px: 1.5, py: 0.5 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em' }}>FINALIZED</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                <Box sx={{ width: 64, height: 64, borderRadius: '14px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckIcon sx={{ fontSize: 36, color: '#1d4ed8' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#1d4ed8', mb: 0.5 }}>Clinically Safe</Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6 }}>
                    This water batch meets all international safety parameters (WHO, EPA). No harmful contaminants detected above threshold limits.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Chemical Analysis */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em' }}>DETAILED CHEMICAL ANALYSIS</Typography>
                <Typography sx={{ fontSize: '0.8125rem', color: '#9ca3af' }}>Scan Time: 08:42 AM UTC</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <TDSGauge value={112} />
                  <Typography sx={{ fontSize: '0.8125rem', color: '#6b7280', textAlign: 'center' }}>Optimal Range: 50 – 150 ppm</Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, flex: 1 }}>
                  {chems.map((c) => (
                    <Box key={c.label} sx={{ border: '1px solid #e5e7eb', borderRadius: '10px', p: 1.75 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>{c.label}</Typography>
                          <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af' }}>{c.target}</Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', textAlign: 'right' }}>{c.value}</Typography>
                          <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, color: c.statusColor, textAlign: 'right' }}>{c.status}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Supplier */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 2 }}>SUPPLIER INTELLIGENCE</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '8px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>📊</Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827' }}>AquaPure Solutions Ltd.</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af' }}>ID: SPL-992-B</Typography>
                </Box>
              </Box>
              <Box sx={{ border: '1px solid #e5e7eb', borderRadius: '10px', p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ fontSize: '0.875rem', color: '#6b7280' }}>Trust Score</Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.125rem', color: '#1d4ed8' }}>98<span style={{ color: '#9ca3af', fontWeight: 500, fontSize: '0.875rem' }}>/100</span></Typography>
                </Box>
                <LinearProgress variant="determinate" value={98}
                  sx={{ height: 6, borderRadius: 3, backgroundColor: '#e5e7eb', '& .MuiLinearProgress-bar': { backgroundColor: '#1d4ed8', borderRadius: 3 } }} />
              </Box>
              {[{ icon: '✓', text: 'ISO 9001 Certified' }, { icon: '✓', text: '5-Year Clean Record' }, { icon: '📍', text: 'Facility: Zurich, CH' }].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography sx={{ fontSize: '0.875rem', color: '#16a34a' }}>{item.icon}</Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: '#374151' }}>{item.text}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Certificate */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 2 }}>OFFICIAL CERTIFICATE</Typography>
              {/* Document preview */}
              <Box sx={{ border: '1px solid #e5e7eb', borderRadius: '8px', p: 2, mb: 2, backgroundColor: '#fafafa' }}>
                {[40, 80, 60, 50, 80, 40].map((w, i) => (
                  <Box key={i} sx={{ height: 8, backgroundColor: '#e5e7eb', borderRadius: 2, mb: 1, width: `${w}%` }} />
                ))}
                <Box sx={{ height: 40, backgroundColor: '#e5e7eb', borderRadius: 4, my: 1.5 }} />
                {[80, 60].map((w, i) => (
                  <Box key={i} sx={{ height: 8, backgroundColor: '#e5e7eb', borderRadius: 2, mb: 1, width: `${w}%` }} />
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>Cert_W2023_89A.pdf</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af' }}>1.2 MB • Digitally Signed</Typography>
                </Box>
                <Box sx={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <DownloadIcon sx={{ fontSize: 18, color: '#1d4ed8' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default WaterVerificationPage;
