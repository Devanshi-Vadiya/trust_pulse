

import { Box, Typography, Button, Card, CardContent, Chip, Divider, LinearProgress } from '@mui/material';
import { ArrowBack as ArrowBackIcon, CheckCircle as CheckCircleIcon, TrackChanges as TrackIcon, Download as DownloadIcon, ReportProblem as ReportIcon, TrendingUp as TrendingUpIcon, SearchOff as SearchOffIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const DonutChart = () => {
  const segments = [
    { pct: 65, color: '#1d4ed8', label: 'Active Compounds', detail: 'L-Theanine, Ashwagandha Extract' },
    { pct: 25, color: '#b45309', label: 'Excipients & Fillers', detail: 'Cellulose, Magnesium Stearate' },
    { pct: 10, color: '#e5e7eb', label: 'Sugar / Additives', detail: 'Trace amounts detected' },
  ];
  const r = 60, cx = 80, cy = 80, stroke = 18;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const arcs = segments.map((s) => {
    const dash = (s.pct / 100) * circ;
    const arc = { ...s, dasharray: `${dash} ${circ - dash}`, dashoffset: -offset };
    offset += dash;
    return arc;
  });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <svg width={160} height={160} viewBox="0 0 160 160">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
          {arcs.map((arc, i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={arc.color} strokeWidth={stroke}
              strokeDasharray={arc.dasharray}
              strokeDashoffset={arc.dashoffset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '80px 80px' }}
            />
          ))}
        </svg>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'text.primary' }}>ACTIVE</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: 'text.primary' }}>65%</Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        {arcs.map((arc, i) => (
          <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: arc.color, mt: 0.5, flexShrink: 0 }} />
              <Box>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary' }}>{arc.label}</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{arc.detail}</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.9375rem', fontWeight: 700, color: 'text.primary', ml: 2 }}>{arc.pct}%</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const ProductResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNotFound = location.state?.notFound || false;
  const searchedCode = location.state?.searchedCode || 'Unknown';
  const mfgDetails = [
    { label: 'Facility Registration', value: 'FDA Reg #104992811 ✓' },
    { label: 'Production Date', value: 'October 12, 2023' },
    { label: 'Expiration Date', value: 'October 2025 (24 Months)' },
    { label: 'Origin Facility', value: 'BioKinetics Plant Alpha\n144 Innovation Drive, San Diego, CA 92121' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}>
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, cursor: 'pointer' }} onClick={() => navigate('/scan')}>
        <ArrowBackIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>Back to Search</Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>/</Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.primary', fontWeight: 500 }}>Nutrition & Supplements</Typography>
      </Box>

      {/* Main grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 280px' }, gap: 3 }}>
        {/* Left column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {isNotFound ? (
            <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent sx={{ p: 6, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                  <SearchOffIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: 'text.primary', mb: 1 }}>Product Not Found</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 400, mx: 'auto', lineHeight: 1.6 }}>
                  We couldn't find any clinical data for the barcode <Typography component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>"{searchedCode}"</Typography>. It may be unverified or not exist in our global ledger.
                </Typography>
                <Button variant="contained" onClick={() => navigate('/scan')}
                  sx={{ backgroundColor: '#1d4ed8', textTransform: 'none', fontWeight: 600, borderRadius: '8px', px: 4, py: 1.2, '&:hover': { backgroundColor: '#1e40af' } }}>
                  Try Another Scan
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Product header card */}
              <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 120, height: 120, borderRadius: '10px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', flexShrink: 0 }}>
                      💊
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                        <Chip label="SKU: NUTR-8821" size="small" sx={{ backgroundColor: '#f3f4f6', color: 'text.primary', fontSize: '0.75rem', fontWeight: 600 }} />
                        <Chip label="BATCH: A-990" size="small" sx={{ backgroundColor: '#f3f4f6', color: 'text.primary', fontSize: '0.75rem', fontWeight: 600 }} />
                        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1, backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', px: 1.5, py: 0.5 }}>
                          <CheckCircleIcon sx={{ fontSize: 16, color: '#16a34a' }} />
                          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#16a34a' }}>Verified Safe</Typography>
                        </Box>
                      </Box>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: 'text.primary', mb: 0.5 }}>Synapse Neuro-Complex Forte</Typography>
                      <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary', mb: 1.5 }}>Manufactured by BioKinetics Labs LLC</Typography>
                      <Typography sx={{ fontSize: '0.875rem', color: 'text.primary', lineHeight: 1.6 }}>
                        Comprehensive clinical analysis confirms this product meets all established safety thresholds for heavy metals, microbial contaminants, and label claim accuracy. Raw material sourcing verified through blockchain ledger.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Trust score + Authenticity */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', letterSpacing: '0.05em', mb: 1.5 }}>GLOBAL TRUST SCORE</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 60, height: 60, border: '2px solid #1d4ed8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: '#1d4ed8' }}>98</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', color: 'text.primary' }}>Exceptional</Typography>
                        <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>Top 2% of category</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CheckCircleIcon sx={{ fontSize: 18, color: '#1d4ed8' }} />
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', letterSpacing: '0.05em' }}>AUTHENTICITY</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', color: 'text.primary', mb: 0.5 }}>100% Genuine Origin</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>Supply chain mathematically verified</Typography>
                  </CardContent>
                </Card>
              </Box>

              {/* Composition */}
              <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: 'text.primary' }}>Composition Analysis</Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: '#1d4ed8', fontWeight: 600, cursor: 'pointer' }}>View Full Report →</Typography>
                  </Box>
                  <DonutChart />
                </CardContent>
              </Card>

              {/* Manufacturing */}
              <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: 'text.primary', mb: 2.5 }}>Manufacturing Details</Typography>
                  {mfgDetails.map((d, i) => (
                    <Box key={i}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 2, py: 2 }}>
                        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{d.label}</Typography>
                        <Typography sx={{ fontSize: '0.875rem', color: 'text.primary', fontWeight: 500, whiteSpace: 'pre-line' }}>{d.value}</Typography>
                      </Box>
                      {i < mfgDetails.length - 1 && <Divider />}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </>
          )}
        </Box>

        {/* Right sidebar */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Product Actions */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', letterSpacing: '0.05em', mb: 2 }}>PRODUCT ACTIONS</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button fullWidth variant="contained" startIcon={<TrackIcon />}
                  sx={{ backgroundColor: '#1d4ed8', textTransform: 'none', fontWeight: 600, borderRadius: '8px', '&:hover': { backgroundColor: '#1e40af' } }}>
                  Track Changes
                </Button>
                <Button fullWidth variant="outlined" startIcon={<DownloadIcon />}
                  sx={{ borderColor: '#e5e7eb', color: 'text.primary', textTransform: 'none', fontWeight: 600, borderRadius: '8px', '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' } }}>
                  Download Certificate
                </Button>
                <Button fullWidth variant="outlined" startIcon={<ReportIcon />}
                  onClick={() => navigate('/report')}
                  sx={{ borderColor: '#fecaca', color: '#dc2626', textTransform: 'none', fontWeight: 600, borderRadius: '8px', backgroundColor: '#fef2f2', '&:hover': { backgroundColor: '#fee2e2' } }}>
                  Report Issue
                </Button>
                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center' }}>File a clinical discrepancy report</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Market Context */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', letterSpacing: '0.05em', mb: 2 }}>MARKET CONTEXT</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUpIcon sx={{ fontSize: 18, color: '#1d4ed8' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: 'text.primary' }}>High Demand Status</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Scan frequency up 24% this week</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Issue */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', letterSpacing: '0.05em', mb: 2 }}>ISSUE</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '8px', backgroundColor: '#f3f4f6' }} />
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: 'text.primary' }}>Report an issue</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Report issue to check</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductResultPage;
