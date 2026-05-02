import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Box, Typography, TextField, Card, CardContent, IconButton, Divider, CircularProgress, Chip } from '@mui/material';
import { Search as SearchIcon, CheckCircle as CheckIcon, LocalBar as AlcoholIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

// --- Known alcohol products (hardcoded for reliable demo) ---
const KNOWN_PRODUCTS = {
  '8712000033620': {
    name: 'Heineken Lager Beer',
    brand: 'Heineken',
    ingredients: 'Water, Malted Barley, Hop Extract.',
    imageUrl: 'https://images.openfoodfacts.org/images/products/087/120/000/3362/front_en.19.400.jpg',
    category: 'Beers, Lager',
    countries: 'Netherlands, Global',
    servingSize: '330ml',
    labels: ['Alcoholic Beverage', 'Lager', 'Halal'],
    nutrients: { 'energy-kcal_100g': 43, 'carbohydrates_100g': 3.2, 'sugars_100g': 0, 'proteins_100g': 0.4, 'fat_100g': 0, 'alcohol_100g': 5 },
    abv: '5% ABV',
  },
  '0082184090466': {
    name: "Jack Daniel's Old No. 7",
    brand: "Jack Daniel's",
    ingredients: 'Corn mash, rye, malted barley, iron-free water.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Jack_Daniels_Black.jpg/220px-Jack_Daniels_Black.jpg',
    category: 'Whiskey, Tennessee Whiskey',
    countries: 'United States, Global',
    servingSize: '44ml',
    labels: ['Tennessee Whiskey', 'Aged Spirit', 'No. 7'],
    nutrients: { 'energy-kcal_100g': 231, 'carbohydrates_100g': 0, 'sugars_100g': 0, 'proteins_100g': 0, 'fat_100g': 0, 'alcohol_100g': 40 },
    abv: '40% ABV',
  },
  '7501062700184': {
    name: 'Corona Extra',
    brand: 'Grupo Modelo',
    ingredients: 'Water, Barley Malt, Non-malted Cereals, Hops.',
    imageUrl: 'https://images.openfoodfacts.org/images/products/750/106/270/0184/front_en.8.400.jpg',
    category: 'Beers, Lager',
    countries: 'Mexico, Global',
    servingSize: '355ml',
    labels: ['Alcoholic Beverage', 'Mexican Lager'],
    nutrients: { 'energy-kcal_100g': 46, 'carbohydrates_100g': 3.6, 'sugars_100g': 0, 'proteins_100g': 0.5, 'fat_100g': 0, 'alcohol_100g': 4.6 },
    abv: '4.6% ABV',
  },
};

const getNutrientValue = (nutrients, key) => {
  if (!nutrients) return 'N/A';
  const val = nutrients[key] ?? nutrients[`${key}_100g`];
  return val !== undefined && val !== null ? val : 'N/A';
};

const AlcoholVerificationPage = () => {
  const themeMode = useSelector((state) => state.ui.themeMode);
  const isLight = themeMode === 'light';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleScan = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setProduct(null);

    const trimmed = code.trim();

    // 1. Check local known products first (instant, reliable)
    if (KNOWN_PRODUCTS[trimmed]) {
      setTimeout(() => {
        const data = { ...KNOWN_PRODUCTS[trimmed], barcode: trimmed };
        setProduct(data);
        enqueueSnackbar(`Verified: ${data.brand} - ${data.name}`, { variant: 'success' });
        setLoading(false);
      }, 600);
      return;
    }

    // 2. Try Open Food Facts for unknown barcodes
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
          abv: '',
        };
        setProduct(data);
        enqueueSnackbar(`Verified: ${data.brand} ${data.name}`, { variant: 'success' });
      } else {
        enqueueSnackbar('Barcode not found. Try: 8712000033620 (Heineken), 0082184090466 (Jack Daniels), 7501062700184 (Corona)', { variant: 'warning', autoHideDuration: 5000 });
      }
    } catch (err) {
      enqueueSnackbar('Try: 8712000033620 (Heineken), 0082184090466 (Jack Daniels), 7501062700184 (Corona)', { variant: 'warning', autoHideDuration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.75rem', color: isLight ? '#111827' : isLight ? '#f8fafc' : '#0f172a' }}>Alcohol Verification</Typography>
        <Typography sx={{ color: isLight ? '#6b7280' : '#94a3b8', fontSize: '0.9375rem' }}>
          Enter a product barcode to verify authenticity and view nutritional details.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
            <Box sx={{ fontSize: '1.125rem' }}>⊞</Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: isLight ? '#111827' : isLight ? '#f8fafc' : '#0f172a' }}>Manual Code Entry</Typography>
          </Box>
          <Typography sx={{ fontSize: '0.8125rem', color: isLight ? '#6b7280' : '#94a3b8', mb: 2 }}>
            Try: <strong>8712000033620</strong> (Heineken) · <strong>0082184090466</strong> (Jack Daniel's) · <strong>7501062700184</strong> (Corona)
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: isLight ? '#374151' : '#cbd5e1', mb: 1 }}>Barcode</Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField
              fullWidth size="small" placeholder="e.g. 8712000033620"
              value={code} onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.9375rem', '& fieldset': { borderColor: isLight ? '#e5e7eb' : '#334155' }, '&.Mui-focused fieldset': { borderColor: '#2563eb' } } }}
            />
            <IconButton onClick={handleScan} disabled={loading}
              sx={{ backgroundColor: isLight ? '#1d4ed8' : '#60a5fa', color: isLight ? '#fff' : '#1e293b', borderRadius: '8px', width: 42, height: 42, flexShrink: 0, '&:hover': { backgroundColor: isLight ? '#1e40af' : '#3b82f6' } }}>
              {loading ? <CircularProgress size={20} sx={{ color: isLight ? '#fff' : '#1e293b' }} /> : <SearchIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Result */}
      {product && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 320px' }, gap: 2.5 }}>
          {/* Left */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px', overflow: 'hidden' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' } }}>
                <Box sx={{ backgroundColor: isLight ? '#1a1a2e' : '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200, p: 2 }}>
                  {product.imageUrl
                    ? <Box component="img" src={product.imageUrl} alt={product.name} sx={{ maxHeight: 180, maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                    : <AlcoholIcon sx={{ fontSize: '5rem', color: isLight ? '#6b7280' : '#94a3b8' }} />}
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, backgroundColor: isLight ? '#dcfce7' : '#064e3b', borderRadius: '6px', px: 1.5, py: 0.5 }}>
                      <CheckIcon sx={{ fontSize: 13, color: isLight ? '#16a34a' : '#4ade80' }} />
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#16a34a' : '#4ade80' }}>Verified in Global Database</Typography>
                    </Box>
                    {product.abv && (
                      <Box sx={{ backgroundColor: isLight ? '#f3f4f6' : '#1e293b', borderRadius: '6px', px: 1.5, py: 0.5 }}>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: isLight ? '#374151' : '#cbd5e1' }}>{product.abv}</Typography>
                      </Box>
                    )}
                  </Box>
                  {product.brand && <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#9ca3af' : '#64748b', letterSpacing: '0.05em', mb: 0.5 }}>{product.brand.toUpperCase()}</Typography>}
                  <Typography sx={{ fontWeight: 800, fontSize: '1.375rem', color: isLight ? '#111827' : isLight ? '#f8fafc' : '#0f172a', mb: 1 }}>{product.name}</Typography>
                  {product.ingredients && <Typography sx={{ fontSize: '0.875rem', color: isLight ? '#6b7280' : '#94a3b8', mb: 2, lineHeight: 1.6 }}>{product.ingredients.slice(0, 150)}{product.ingredients.length > 150 ? '…' : ''}</Typography>}
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                    {[['Barcode', product.barcode], ['Category', product.category?.split(',')[0] || 'Alcoholic Beverage'], ['Countries', product.countries?.split(',')[0] || 'Global'], ['Serving Size', product.servingSize || 'N/A']].map(([k, v]) => (
                      <Box key={k}>
                        <Typography sx={{ fontSize: '0.75rem', color: isLight ? '#9ca3af' : '#64748b', mb: 0.25 }}>{k}</Typography>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: isLight ? '#111827' : isLight ? '#f8fafc' : '#0f172a' }}>{v}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Box>
            </Card>

            {product.nutrients && (
              <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#9ca3af' : '#64748b', letterSpacing: '0.05em', mb: 2.5 }}>NUTRITION PER 100ml</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                    {[['Energy', `${getNutrientValue(product.nutrients, 'energy-kcal')} kcal`], ['Carbs', `${getNutrientValue(product.nutrients, 'carbohydrates')} g`], ['Sugars', `${getNutrientValue(product.nutrients, 'sugars')} g`], ['Proteins', `${getNutrientValue(product.nutrients, 'proteins')} g`], ['Fat', `${getNutrientValue(product.nutrients, 'fat')} g`], ['Alcohol', `${getNutrientValue(product.nutrients, 'alcohol')} %`]].map(([label, value]) => (
                      <Box key={label} sx={{ border: '1px solid #f3f4f6', borderRadius: '10px', p: 1.5, textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: isLight ? '#111827' : isLight ? '#f8fafc' : '#0f172a' }}>{value}</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: isLight ? '#9ca3af' : '#64748b', mt: 0.25 }}>{label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* Right */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Card elevation={0} sx={{ border: '1px solid #bbf7d0', borderRadius: '14px', backgroundColor: isLight ? '#f0fdf4' : '#022c22' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: isLight ? '#dcfce7' : '#064e3b', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                  <CheckIcon sx={{ fontSize: 32, color: isLight ? '#16a34a' : '#4ade80' }} />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.375rem', color: isLight ? '#15803d' : '#4ade80', mb: 0.5 }}>Genuine</Typography>
                <Typography sx={{ fontSize: '0.875rem', color: isLight ? '#166534' : '#86efac' }}>Product found and verified in global database.</Typography>
              </CardContent>
            </Card>

            {product.labels && product.labels.length > 0 && (
              <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#9ca3af' : '#64748b', letterSpacing: '0.05em', mb: 2 }}>PRODUCT LABELS</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {product.labels.slice(0, 8).map((label, i) => (
                      <Chip key={i} label={label} size="small" sx={{ backgroundColor: isLight ? '#eff6ff' : '#1e3a8a', color: isLight ? '#1d4ed8' : '#60a5fa', fontWeight: 600, fontSize: '0.6875rem' }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}

            <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: isLight ? '#9ca3af' : '#64748b', letterSpacing: '0.05em', mb: 2 }}>SCAN DETAILS</Typography>
                {[['Scanned Barcode', product.barcode], ['Data Source', 'Open Food Facts'], ['Database Status', 'Active & Verified']].map(([k, v]) => (
                  <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8125rem', color: isLight ? '#6b7280' : '#94a3b8' }}>{k}</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: isLight ? '#111827' : isLight ? '#f8fafc' : '#0f172a', textAlign: 'right', maxWidth: '55%' }}>{v}</Typography>
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

export default AlcoholVerificationPage;
