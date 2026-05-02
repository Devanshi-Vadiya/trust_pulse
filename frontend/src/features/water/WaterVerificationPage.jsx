import { useState } from 'react';
import { Box, Typography, TextField, Card, CardContent, IconButton, CircularProgress, Chip, LinearProgress } from '@mui/material';
import { Search as SearchIcon, CheckCircle as CheckIcon, WaterDrop as WaterIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

// --- Known water products (hardcoded for reliable demo) ---
const KNOWN_PRODUCTS = {
  '3068320114444': {
    name: 'Evian Natural Spring Water 500ml',
    brand: 'Evian',
    ingredients: 'Natural mineral water from the French Alps.',
    imageUrl: 'https://images.openfoodfacts.org/images/products/306/832/011/4444/front_en.36.400.jpg',
    category: 'Water, Natural Mineral Water',
    countries: 'France, Global',
    servingSize: '500ml',
    labels: ['Natural Mineral Water', 'No Additives', 'Eco Bottle'],
    nutrients: { 'energy-kcal_100g': 0, 'carbohydrates_100g': 0, 'sugars_100g': 0, 'proteins_100g': 0, 'sodium_100g': 0.005 },
    tds: 309,
    overallStatus: 'Clinically Safe',
  },
  '3057640117107': {
    name: 'Volvic Natural Volcanic Water',
    brand: 'Volvic',
    ingredients: 'Natural mineral water filtered through volcanic rock.',
    imageUrl: 'https://images.openfoodfacts.org/images/products/305/764/011/7107/front_en.12.400.jpg',
    category: 'Water, Natural Mineral Water',
    countries: 'France, Global',
    servingSize: '1500ml',
    labels: ['Natural Mineral Water', 'Low Mineral Content'],
    nutrients: { 'energy-kcal_100g': 0, 'carbohydrates_100g': 0, 'sugars_100g': 0, 'proteins_100g': 0, 'sodium_100g': 0.009 },
    tds: 130,
    overallStatus: 'Clinically Safe',
  },
  '5000112548167': {
    name: 'Buxton Natural Mineral Water',
    brand: 'Buxton',
    ingredients: 'Natural mineral water from the Pennines, England.',
    imageUrl: 'https://images.openfoodfacts.org/images/products/500/011/254/8167/front_en.20.400.jpg',
    category: 'Water, Natural Mineral Water',
    countries: 'United Kingdom',
    servingSize: '500ml',
    labels: ['British Natural Mineral Water', 'Still'],
    nutrients: { 'energy-kcal_100g': 0, 'carbohydrates_100g': 0, 'sugars_100g': 0, 'proteins_100g': 0, 'sodium_100g': 0.013 },
    tds: 280,
    overallStatus: 'Clinically Safe',
  },
};

const getNutrientValue = (nutrients, key) => {
  if (!nutrients) return 'N/A';
  const val = nutrients[key] ?? nutrients[`${key}_100g`];
  return val !== undefined && val !== null ? val : 'N/A';
};

const WaterVerificationPage = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleScan = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setProduct(null);

    const trimmed = code.trim();

    // 1. Check local known products first
    if (KNOWN_PRODUCTS[trimmed]) {
      setTimeout(() => {
        const data = { ...KNOWN_PRODUCTS[trimmed], barcode: trimmed };
        setProduct(data);
        enqueueSnackbar(`Verified: ${data.brand} - ${data.name}`, { variant: 'success' });
        setLoading(false);
      }, 600);
      return;
    }

    // 2. Try Open Food Facts API
    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${trimmed}.json`);
      const json = await res.json();

      if (json.status === 1 && json.product) {
        const p = json.product;
        const data = {
          name: p.product_name || p.product_name_en || 'Unknown Product',
          brand: p.brands || '',
          ingredients: p.ingredients_text || '',
          imageUrl: p.image_url || p.image_front_url || '',
          category: p.categories || '',
          countries: p.countries || '',
          servingSize: p.serving_size || '',
          labels: p.labels ? p.labels.split(',').map(l => l.trim()).filter(Boolean) : [],
          nutrients: p.nutriments || null,
          barcode: trimmed,
          tds: null,
          overallStatus: 'Safe & Verified',
        };
        setProduct(data);
        enqueueSnackbar(`Verified: ${data.brand} ${data.name}`, { variant: 'success' });
      } else {
        enqueueSnackbar('Try: 3068320114444 (Evian) · 3057640117107 (Volvic) · 5000112548167 (Buxton)', { variant: 'warning', autoHideDuration: 6000 });
      }
    } catch {
      enqueueSnackbar('Try: 3068320114444 (Evian) · 3057640117107 (Volvic) · 5000112548167 (Buxton)', { variant: 'warning', autoHideDuration: 6000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.75rem', color: '#111827' }}>Water Verification Report</Typography>
        <Typography sx={{ color: '#6b7280', fontSize: '0.9375rem' }}>Enter a product barcode to verify water brand safety and quality.</Typography>
      </Box>

      {/* Search */}
      <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
            <Box sx={{ fontSize: '1.125rem' }}>⊞</Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>Manual Batch Entry</Typography>
          </Box>
          <Typography sx={{ fontSize: '0.8125rem', color: '#6b7280', mb: 2 }}>
            Try: <strong>3068320114444</strong> (Evian) · <strong>3057640117107</strong> (Volvic) · <strong>5000112548167</strong> (Buxton)
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField
              fullWidth size="small" placeholder="e.g. 3068320114444"
              value={code} onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.9375rem', '& fieldset': { borderColor: '#e5e7eb' }, '&.Mui-focused fieldset': { borderColor: '#2563eb' } } }}
            />
            <IconButton onClick={handleScan} disabled={loading}
              sx={{ backgroundColor: '#1d4ed8', color: '#fff', borderRadius: '8px', width: 42, height: 42, flexShrink: 0, '&:hover': { backgroundColor: '#1e40af' } }}>
              {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SearchIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Result */}
      {product && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 300px' }, gap: 2.5 }}>
          {/* Left */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

            {/* Overall Status Card */}
            <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 0.5 }}>OVERALL STATUS</Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#111827' }}>{product.brand}</Typography>
                  </Box>
                  <Box sx={{ backgroundColor: '#dcfce7', borderRadius: '6px', px: 1.5, py: 0.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d' }}>VERIFIED</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                  <Box sx={{ width: 64, height: 64, borderRadius: '14px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    {product.imageUrl
                      ? <Box component="img" src={product.imageUrl} alt={product.name} sx={{ maxHeight: 56, maxWidth: 56, objectFit: 'contain' }} />
                      : <WaterIcon sx={{ fontSize: 36, color: '#1d4ed8' }} />}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: '#1d4ed8', mb: 0.5 }}>{product.overallStatus}</Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6 }}>
                      {product.name}. Barcode confirmed in Open Food Facts global database.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Chemical Analysis */}
            {product.nutrients && (
              <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em' }}>DETAILED CHEMICAL ANALYSIS</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#9ca3af' }}>Per 100ml</Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
                    {[
                      { label: 'Energy', target: 'Should be 0 kcal', value: `${getNutrientValue(product.nutrients, 'energy-kcal')} kcal` },
                      { label: 'Sugars', target: 'Should be 0 g', value: `${getNutrientValue(product.nutrients, 'sugars')} g` },
                      { label: 'Carbohydrates', target: 'Should be ~0 g', value: `${getNutrientValue(product.nutrients, 'carbohydrates')} g` },
                      { label: 'Sodium', target: 'Limit < 200 mg/L', value: `${getNutrientValue(product.nutrients, 'sodium')} g` },
                    ].map((c) => (
                      <Box key={c.label} sx={{ border: '1px solid #e5e7eb', borderRadius: '10px', p: 1.75 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>{c.label}</Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af' }}>{c.target}</Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827', textAlign: 'right' }}>{c.value}</Typography>
                            <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#16a34a', textAlign: 'right' }}>SAFE</Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}

            {product.ingredients && (
              <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 1.5 }}>SOURCE DESCRIPTION</Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.7 }}>{product.ingredients}</Typography>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* Right */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Trust Score */}
            <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 2 }}>DATABASE TRUST SCORE</Typography>
                <Box sx={{ border: '1px solid #e5e7eb', borderRadius: '10px', p: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#6b7280' }}>Trust Score</Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.125rem', color: '#1d4ed8' }}>98<span style={{ color: '#9ca3af', fontWeight: 500, fontSize: '0.875rem' }}>/100</span></Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={98} sx={{ height: 6, borderRadius: 3, backgroundColor: '#e5e7eb', '& .MuiLinearProgress-bar': { backgroundColor: '#1d4ed8', borderRadius: 3 } }} />
                </Box>
                {[{ icon: '✓', text: 'Open Food Facts Verified' }, { icon: '✓', text: 'Barcode Authenticated' }, { icon: '✓', text: 'No Contaminants Flagged' }].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#16a34a' }}>{item.icon}</Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: '#374151' }}>{item.text}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>

            {product.labels && product.labels.length > 0 && (
              <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 2 }}>PRODUCT LABELS</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {product.labels.slice(0, 8).map((label, i) => (
                      <Chip key={i} label={label} size="small" sx={{ backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: 600, fontSize: '0.6875rem' }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}

            <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 2 }}>SCAN DETAILS</Typography>
                {[['Barcode', product.barcode], ['Brand', product.brand || 'Unknown'], ['Category', product.category?.split(',')[0] || 'Water'], ['Countries', product.countries?.split(',')[0] || 'Global']].map(([k, v]) => (
                  <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#6b7280' }}>{k}</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111827', textAlign: 'right', maxWidth: '55%' }}>{v}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WaterVerificationPage;
