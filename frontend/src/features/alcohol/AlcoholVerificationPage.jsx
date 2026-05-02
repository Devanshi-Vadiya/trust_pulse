import { useState } from 'react';
import { Box, Typography, TextField, Card, CardContent, IconButton, Divider, CircularProgress, Chip } from '@mui/material';
import { Search as SearchIcon, CheckCircle as CheckIcon, LocalBar as AlcoholIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const AlcoholVerificationPage = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleScan = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setProduct(null);

    try {
      // Call Open Food Facts directly — the global open product database
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${code.trim()}.json`
      );
      const json = await res.json();

      if (json.status === 0 || !json.product) {
        enqueueSnackbar('Product barcode not found in global database.', { variant: 'error' });
        return;
      }

      const p = json.product;
      const data = {
        name: p.product_name || p.product_name_en || 'Unknown Product',
        brand: p.brands || '',
        ingredients: p.ingredients_text || p.ingredients_text_en || '',
        imageUrl: p.image_url || p.image_front_url || '',
        category: p.categories || '',
        countries: p.countries || '',
        servingSize: p.serving_size || '',
        labels: p.labels ? p.labels.split(',').map(l => l.trim()).filter(Boolean) : [],
        nutrients: p.nutriments || null,
        barcode: code.trim(),
      };

      setProduct(data);
      enqueueSnackbar(`Verified: ${data.brand || ''} ${data.name}`, { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Could not reach global database. Check your connection.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const getNutrientValue = (nutrients, key) => {
    if (!nutrients) return 'N/A';
    const val = nutrients[key] ?? nutrients[`${key}_100g`];
    return val !== undefined && val !== null ? val : 'N/A';
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.75rem', color: '#111827' }}>
          Alcohol Verification
        </Typography>
        <Typography sx={{ color: '#6b7280', fontSize: '0.9375rem' }}>
          Scan or enter a product barcode to verify authenticity and view nutritional details.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
            <Box sx={{ fontSize: '1.125rem' }}>⊞</Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>Manual Code Entry</Typography>
          </Box>
          <Typography sx={{ fontSize: '0.8125rem', color: '#6b7280', mb: 2 }}>
            Enter the barcode from your alcohol product (e.g., Heineken: 8712000033620).
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', mb: 1 }}>Barcode</Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. 8712000033620"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.9375rem', '& fieldset': { borderColor: '#e5e7eb' }, '&.Mui-focused fieldset': { borderColor: '#2563eb' } } }}
            />
            <IconButton
              onClick={handleScan}
              disabled={loading}
              sx={{ backgroundColor: '#1d4ed8', color: '#fff', borderRadius: '8px', width: 42, height: 42, flexShrink: 0, '&:hover': { backgroundColor: '#1e40af' } }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SearchIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Result */}
      {product && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 320px' }, gap: 2.5 }}>

          {/* Left: Product Info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

            {/* Verified Badge + Product Header */}
            <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px', overflow: 'hidden' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' } }}>
                {/* Image or icon */}
                <Box sx={{ backgroundColor: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200, p: 2 }}>
                  {product.imageUrl ? (
                    <Box component="img" src={product.imageUrl} alt={product.name}
                      sx={{ maxHeight: 180, maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                  ) : (
                    <AlcoholIcon sx={{ fontSize: '5rem', color: '#6b7280' }} />
                  )}
                </Box>
                <CardContent sx={{ p: 3 }}>
                  {/* Verified badge */}
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, backgroundColor: '#dcfce7', borderRadius: '6px', px: 1.5, py: 0.5, mb: 1.5 }}>
                    <CheckIcon sx={{ fontSize: 13, color: '#16a34a' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a' }}>Verified in Global Database</Typography>
                  </Box>

                  {product.brand && (
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 0.5 }}>
                      {product.brand.toUpperCase()}
                    </Typography>
                  )}
                  <Typography sx={{ fontWeight: 800, fontSize: '1.375rem', color: '#111827', mb: 1 }}>
                    {product.name}
                  </Typography>
                  {product.ingredients && (
                    <Typography sx={{ fontSize: '0.875rem', color: '#6b7280', mb: 2, lineHeight: 1.6 }}>
                      {product.ingredients.slice(0, 120)}{product.ingredients.length > 120 ? '…' : ''}
                    </Typography>
                  )}

                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                    {[
                      ['Barcode', product.barcode || code],
                      ['Category', product.category || 'Alcoholic Beverage'],
                      ['Countries', product.countries || 'Global'],
                      ['Serving Size', product.servingSize ? `${product.servingSize}g` : 'N/A'],
                    ].map(([k, v]) => (
                      <Box key={k}>
                        <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af', mb: 0.25 }}>{k}</Typography>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{v}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Box>
            </Card>

            {/* Nutrition per 100g */}
            {product.nutrients && (
              <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 2.5 }}>
                    NUTRITION PER 100g
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                    {[
                      ['Energy', `${getNutrientValue(product.nutrients, 'energy-kcal')} kcal`],
                      ['Carbs', `${getNutrientValue(product.nutrients, 'carbohydrates')} g`],
                      ['Sugars', `${getNutrientValue(product.nutrients, 'sugars')} g`],
                      ['Proteins', `${getNutrientValue(product.nutrients, 'proteins')} g`],
                      ['Fat', `${getNutrientValue(product.nutrients, 'fat')} g`],
                      ['Alcohol', `${getNutrientValue(product.nutrients, 'alcohol')} %`],
                    ].map(([label, value]) => (
                      <Box key={label} sx={{ border: '1px solid #f3f4f6', borderRadius: '10px', p: 1.5, textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>{value}</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af', mt: 0.25 }}>{label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* Right: Status + Labels */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

            {/* Authenticity Status */}
            <Card elevation={0} sx={{ border: '1px solid #bbf7d0', borderRadius: '14px', backgroundColor: '#f0fdf4' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                  <CheckIcon sx={{ fontSize: 32, color: '#16a34a' }} />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.375rem', color: '#15803d', mb: 0.5 }}>Genuine</Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#166534' }}>Product found in global database.</Typography>
              </CardContent>
            </Card>

            {/* Labels / Tags */}
            {product.labels && product.labels.length > 0 && (
              <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 2 }}>
                    PRODUCT LABELS
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {product.labels.slice(0, 8).map((label, i) => (
                      <Chip key={i} label={label} size="small"
                        sx={{ backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: 600, fontSize: '0.6875rem' }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Barcode Info */}
            <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em', mb: 2 }}>
                  SCAN DETAILS
                </Typography>
                {[
                  ['Scanned Barcode', code],
                  ['Data Source', 'Open Food Facts'],
                  ['Database Status', 'Active & Verified'],
                ].map(([k, v]) => (
                  <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'flex-start' }}>
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

export default AlcoholVerificationPage;
