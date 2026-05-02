import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import apiClient from '../../services/api';
import PageSEO from '../../components/PageSEO';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppCard from '../../components/AppCard';
import { Box, Typography, CardContent, LinearProgress } , useTheme } from '@mui/material';
import { Search as SearchIcon, CheckCircle, Warning, WaterDrop } from '@mui/icons-material';

const parameters = [
  { name: 'pH Level', value: 7.2, unit: '', safe: '6.5–8.5', status: 'safe', score: 85 },
  {
    name: 'TDS (Total Dissolved Solids)',
    value: 210,
    unit: 'ppm',
    safe: '< 500 ppm',
    status: 'safe',
    score: 78,
  },
  { name: 'Chlorine', value: 0.6, unit: 'mg/L', safe: '< 4 mg/L', status: 'safe', score: 90 },
  { name: 'Lead', value: 0.008, unit: 'mg/L', safe: '< 0.01 mg/L', status: 'watch', score: 60 },
  { name: 'Nitrates', value: 42, unit: 'mg/L', safe: '< 50 mg/L', status: 'watch', score: 55 },
];

const statusConfig = {
  safe: {
    color: '#16a34a',
    bg: '#dcfce7',
    label: 'SAFE',
    icon: <CheckCircle sx={{ fontSize: 13 }} />,
  },
  watch: {
    color: '#b45309',
    bg: '#fef9c3',
    label: 'CAUTION',
    icon: <Warning sx={{ fontSize: 13 }} />,
  },
};

const WaterVerificationPage = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { enqueueSnackbar } = useSnackbar();
  const t = (light, dark) => (isLight ? light : dark);

  const handleScan = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setScanned(false);
    
    try {
      // Utilizing the Open Food Facts global API route
      const response = await apiClient.post('/sugar/scan', { barcode: query.trim() });
      const data = response.data.data;
      
      enqueueSnackbar(`Recognized: ${data.brand || 'Unknown'} - ${data.name}`, { variant: 'success' });
      setScanned(true);
    } catch (err) {
      enqueueSnackbar('Water brand/barcode not found in global database.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const overallScore = 76;

  return (
    <>
      <PageSEO
        title="Water Purity Analysis"
        description="Verify drinking water safety including pH levels, TDS, chlorine, lead, and nitrate content against WHO and EPA standards."
        path="/water"
      />
      <Box
        component="main"
        role="main"
        sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{ fontWeight: 700, fontSize: '1.75rem', color: t('#111827', '#f8fafc'), mb: 0.5 }}
          >
            Water Purity Analysis
          </Typography>
          <Typography sx={{ color: t('#6b7280', '#94a3b8'), fontSize: '0.9375rem' }}>
            Verify drinking water safety against WHO and EPA standards.
          </Typography>
        </Box>

        <AppCard elevation={0} sx={{ mb: 2.5 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <WaterDrop sx={{ color: '#0ea5e9', fontSize: 20 }} />
              <Typography
                sx={{ fontWeight: 600, fontSize: '1rem', color: t('#111827', '#f8fafc') }}
              >
                Enter Water Source / Batch ID
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <AppInput
                fullWidth
                size="small"
                placeholder="e.g. Aquafina Lot #24B, Municipal Supply Zone 3..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              />
              <AppButton
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleScan}
                sx={{
                  backgroundColor: '#0ea5e9',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 3,
                  whiteSpace: 'nowrap',
                  '&:hover': { backgroundColor: '#0284c7' },
                }}
              >
                Analyze
              </AppButton>
            </Box>
            {loading && (
              <LinearProgress
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  '& .MuiLinearProgress-bar': { backgroundColor: '#0ea5e9' },
                }}
              />
            )}
          </CardContent>
        </AppCard>

        {scanned && (
          <>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 2,
                mb: 2.5,
              }}
            >
              {[
                { label: 'Safety Score', value: `${overallScore}/100`, color: '#0ea5e9' },
                {
                  label: 'Parameters Tested',
                  value: `${parameters.length}`,
                  color: t('#111827', '#f8fafc'),
                },
                {
                  label: 'Alerts',
                  value: `${parameters.filter((p) => p.status === 'watch').length} Caution`,
                  color: '#b45309',
                },
              ].map(({ label, value, color }) => (
                <AppCard key={label} elevation={0}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography
                      sx={{ fontSize: '0.8125rem', color: t('#9ca3af', '#64748b'), mb: 0.5 }}
                    >
                      {label}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.5rem', color }}>
                      {value}
                    </Typography>
                  </CardContent>
                </AppCard>
              ))}
            </Box>

            <AppCard elevation={0}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.0625rem',
                    color: t('#111827', '#f8fafc'),
                    mb: 2,
                  }}
                >
                  Parameter Breakdown
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {parameters.map((p) => {
                    const cfg = statusConfig[p.status];
                    return (
                      <Box key={p.name}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 0.75,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                backgroundColor: cfg.bg,
                                px: 1,
                                py: 0.25,
                                borderRadius: '6px',
                                color: cfg.color,
                              }}
                            >
                              {cfg.icon}
                              <Typography
                                sx={{ fontSize: '0.625rem', fontWeight: 700, color: cfg.color }}
                              >
                                {cfg.label}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: '0.9375rem',
                                color: t('#111827', '#f8fafc'),
                              }}
                            >
                              {p.name}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: '0.9375rem',
                                color: t('#111827', '#f8fafc'),
                              }}
                            >
                              {p.value} {p.unit}
                            </Typography>
                            <Typography
                              sx={{ fontSize: '0.75rem', color: t('#9ca3af', '#64748b') }}
                            >
                              Safe: {p.safe}
                            </Typography>
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={p.score}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: t('#f3f4f6', '#334155'),
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: cfg.color,
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </AppCard>
          </>
        )}
      </Box>
    </>
  );
};

export default WaterVerificationPage;
