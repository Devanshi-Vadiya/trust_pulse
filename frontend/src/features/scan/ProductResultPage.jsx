import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CardContent, Chip, LinearProgress } from '@mui/material';
import { CheckCircle, Warning, Cancel, ArrowBack } from '@mui/icons-material';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';

const productData = {
  name: 'DermaProtect Daily Lotion',
  brand: 'SkinGuard Labs',
  upc: '08523940211',
  category: 'Topical Skincare',
  overallRisk: 'LOW',
  safetyScore: 92,
  ingredients: [
    { name: 'Water (Aqua)', status: 'safe', note: 'Primary solvent, non-reactive' },
    { name: 'Glycerin', status: 'safe', note: 'Humectant, dermatologically approved' },
    { name: 'Phenoxyethanol', status: 'watch', note: 'Preservative – safe at <1% concentration' },
    { name: 'Fragrance (Parfum)', status: 'warn', note: 'Potential allergen for sensitive skin' },
  ],
  claims: [
    { text: 'Dermatologist Tested', verified: true },
    { text: 'Hypoallergenic', verified: true },
    { text: 'Paraben-Free', verified: true },
    { text: 'FDA Registered Facility', verified: false },
  ],
};

const statusConfig = {
  safe: {
    color: '#16a34a',
    bg: '#dcfce7',
    label: 'SAFE',
    icon: <CheckCircle sx={{ fontSize: 14 }} />,
  },
  watch: {
    color: '#b45309',
    bg: '#fef9c3',
    label: 'CAUTION',
    icon: <Warning sx={{ fontSize: 14 }} />,
  },
  warn: { color: '#dc2626', bg: '#fee2e2', label: 'ALERT', icon: <Cancel sx={{ fontSize: 14 }} /> },
};

const ProductResultPage = () => {
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state.ui.themeMode);
  const isLight = themeMode === 'light';
  const t = (light, dark) => (isLight ? light : dark);

  const scoreColor =
    productData.safetyScore >= 80
      ? '#16a34a'
      : productData.safetyScore >= 50
        ? '#b45309'
        : '#dc2626';

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif', maxWidth: 900, mx: 'auto' }}>
      {/* Back */}
      <AppButton
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{
          color: t('#6b7280', '#94a3b8'),
          textTransform: 'none',
          mb: 2,
          '&:hover': { backgroundColor: t('#f3f4f6', '#1e293b') },
        }}
      >
        Back to Scan
      </AppButton>

      {/* Header card */}
      <AppCard elevation={0} sx={{ mb: 2.5 }}>
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '14px',
                  backgroundColor: t('#f3f4f6', '#334155'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}
              >
                🧴
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: 700, fontSize: '1.25rem', color: t('#111827', '#f8fafc') }}
                >
                  {productData.name}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: t('#6b7280', '#94a3b8') }}>
                  {productData.brand} · UPC: {productData.upc}
                </Typography>
                <Typography
                  sx={{ fontSize: '0.8125rem', color: t('#9ca3af', '#64748b'), mt: 0.25 }}
                >
                  {productData.category}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{ fontSize: '3rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}
              >
                {productData.safetyScore}
              </Typography>
              <Typography
                sx={{ fontSize: '0.75rem', color: t('#9ca3af', '#64748b'), fontWeight: 600 }}
              >
                SAFETY SCORE
              </Typography>
              <LinearProgress
                variant="determinate"
                value={productData.safetyScore}
                sx={{
                  mt: 0.75,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: t('#f3f4f6', '#334155'),
                  '& .MuiLinearProgress-bar': { backgroundColor: scoreColor, borderRadius: 3 },
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </AppCard>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
        {/* Ingredient Analysis */}
        <AppCard elevation={0}>
          <CardContent sx={{ p: 3 }}>
            <Typography
              sx={{ fontWeight: 700, fontSize: '1.0625rem', color: t('#111827', '#f8fafc'), mb: 2 }}
            >
              Ingredient Analysis
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {productData.ingredients.map((ing, i) => {
                const cfg = statusConfig[ing.status];
                return (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: '10px',
                      backgroundColor: t('#f9fafb', '#1e293b'),
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        backgroundColor: cfg.bg,
                        px: 1,
                        py: 0.25,
                        borderRadius: '6px',
                        flexShrink: 0,
                        mt: 0.25,
                        color: cfg.color,
                      }}
                    >
                      {cfg.icon}
                      <Typography sx={{ fontSize: '0.625rem', fontWeight: 700, color: cfg.color }}>
                        {cfg.label}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          color: t('#111827', '#f8fafc'),
                        }}
                      >
                        {ing.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: t('#6b7280', '#94a3b8') }}>
                        {ing.note}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </AppCard>

        {/* Claims Verification */}
        <AppCard elevation={0}>
          <CardContent sx={{ p: 3 }}>
            <Typography
              sx={{ fontWeight: 700, fontSize: '1.0625rem', color: t('#111827', '#f8fafc'), mb: 2 }}
            >
              Claims Verification
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {productData.claims.map((claim, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: '10px',
                    backgroundColor: t('#f9fafb', '#1e293b'),
                  }}
                >
                  <Typography
                    sx={{ fontSize: '0.9375rem', color: t('#374151', '#cbd5e1'), fontWeight: 500 }}
                  >
                    {claim.text}
                  </Typography>
                  {claim.verified ? (
                    <CheckCircle sx={{ color: '#16a34a', fontSize: 20 }} />
                  ) : (
                    <Cancel sx={{ color: '#dc2626', fontSize: 20 }} />
                  )}
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: '10px',
                backgroundColor: t('#f0fdf4', 'rgba(22,163,74,0.1)'),
                border: t('1px solid #bbf7d0', '1px solid rgba(22,163,74,0.3)'),
              }}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#16a34a', mb: 0.5 }}
              >
                ✓ Overall Assessment
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: t('#374151', '#cbd5e1') }}>
                This product is clinically safe for general consumer use. Minor allergen risk noted
                from fragrance compounds.
              </Typography>
            </Box>
          </CardContent>
        </AppCard>
      </Box>
    </Box>
  );
};

export default ProductResultPage;
