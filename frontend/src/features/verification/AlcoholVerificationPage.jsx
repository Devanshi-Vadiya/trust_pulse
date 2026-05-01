import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PageSEO from '../../components/PageSEO';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppCard from '../../components/AppCard';
import { Box, Typography, CardContent, LinearProgress } from '@mui/material';
import { Search as SearchIcon, CheckCircle, Warning, LocalBar } from '@mui/icons-material';

const standards = [
  {
    name: 'Ethanol Content',
    value: '5.2%',
    safe: '< 14% ABV (standard)',
    status: 'safe',
    score: 88,
  },
  {
    name: 'Methanol Trace',
    value: '0.001%',
    safe: '< 0.1% (WHO limit)',
    status: 'safe',
    score: 95,
  },
  { name: 'Sulphite Levels', value: '180 ppm', safe: '< 200 ppm', status: 'watch', score: 58 },
  { name: 'Heavy Metals', value: 'ND', safe: 'Not Detected', status: 'safe', score: 100 },
  {
    name: 'Added Colorants',
    value: 'Detected',
    safe: 'Must be declared',
    status: 'watch',
    score: 50,
  },
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

const AlcoholVerificationPage = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const themeMode = useSelector((state) => state.ui.themeMode);
  const isLight = themeMode === 'light';
  const t = (light, dark) => (isLight ? light : dark);

  const handleScan = useCallback(() => {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScanned(true);
    }, 1500);
  }, [query]);

  return (
    <>
      <PageSEO
        title="Alcohol Safety Verification"
        description="Verify alcohol product purity, ethanol content, and regulatory compliance against WHO and global safety standards."
        path="/alcohol"
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
            Alcohol Safety Verification
          </Typography>
          <Typography sx={{ color: t('#6b7280', '#94a3b8'), fontSize: '0.9375rem' }}>
            Verify alcohol content and purity against global regulatory standards.
          </Typography>
        </Box>

        <AppCard elevation={0} sx={{ mb: 2.5 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <LocalBar sx={{ color: '#7c3aed', fontSize: 20 }} />
              <Typography
                sx={{ fontWeight: 600, fontSize: '1rem', color: t('#111827', '#f8fafc') }}
              >
                Enter Product Name or Batch Code
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <AppInput
                fullWidth
                size="small"
                placeholder="e.g. Johnnie Walker Black Label Batch #JW22..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              />
              <AppButton
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleScan}
                sx={{
                  backgroundColor: '#7c3aed',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 3,
                  whiteSpace: 'nowrap',
                  '&:hover': { backgroundColor: '#6d28d9' },
                }}
              >
                Verify
              </AppButton>
            </Box>
            {loading && (
              <LinearProgress
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  '& .MuiLinearProgress-bar': { backgroundColor: '#7c3aed' },
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
                { label: 'Purity Score', value: '82/100', color: '#7c3aed' },
                {
                  label: 'Standards Checked',
                  value: `${standards.length}`,
                  color: t('#111827', '#f8fafc'),
                },
                {
                  label: 'Cautions',
                  value: `${standards.filter((s) => s.status === 'watch').length} Items`,
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
                  Regulatory Standards Check
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {standards.map((s) => {
                    const cfg = statusConfig[s.status];
                    return (
                      <Box key={s.name}>
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
                              {s.name}
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
                              {s.value}
                            </Typography>
                            <Typography
                              sx={{ fontSize: '0.75rem', color: t('#9ca3af', '#64748b') }}
                            >
                              Limit: {s.safe}
                            </Typography>
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={s.score}
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

export default AlcoholVerificationPage;
