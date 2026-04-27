import { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, TextField, Select, MenuItem, FormControl } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, Warning as WarningIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const STEPS = ['Details', 'Evidence', 'Review'];

const ReportFormPage = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ category: '', productName: '', description: '' });
  const navigate = useNavigate();
  const charCount = form.description.length;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', p: { xs: 2, md: 4 }, fontFamily: 'Inter, sans-serif', pt: { xs: 3, md: 6 } }}>
      <Box sx={{ width: '100%', maxWidth: 700 }}>
        <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '16px', backgroundColor: '#fff' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {/* Title */}
            <Typography sx={{ fontWeight: 800, fontSize: '1.625rem', color: '#111827', mb: 0.75 }}>Report a Safety Risk</Typography>
            <Typography sx={{ fontSize: '0.9375rem', color: '#6b7280', mb: 4 }}>
              Please provide details about the incident to help us verify and take action.
            </Typography>

            {/* Step progress */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
              {STEPS.map((label, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 0 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                    <Box sx={{
                      width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: i === step ? '#1d4ed8' : i < step ? '#1d4ed8' : '#f3f4f6',
                      color: i <= step ? '#fff' : '#9ca3af',
                      fontWeight: 700, fontSize: '0.9375rem',
                    }}>
                      {i < step ? '✓' : i + 1}
                    </Box>
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: i === step ? 700 : 500, color: i === step ? '#1d4ed8' : '#9ca3af' }}>
                      {label}
                    </Typography>
                  </Box>
                  {i < STEPS.length - 1 && (
                    <Box sx={{ flex: 1, height: 2, backgroundColor: i < step ? '#1d4ed8' : '#e5e7eb', mx: 1.5, mb: 3.5 }} />
                  )}
                </Box>
              ))}
            </Box>

            {/* Step 1 content */}
            {step === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', color: '#111827', mb: -1 }}>Incident Details</Typography>

                {/* Risk Category */}
                <Box>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1 }}>Risk Category</Typography>
                  <FormControl fullWidth>
                    <Select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      displayEmpty
                      renderValue={(v) => v || <span style={{ color: '#9ca3af' }}>Select a category...</span>}
                      sx={{ borderRadius: '8px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb' } }}
                    >
                      <MenuItem value="contamination">Contamination</MenuItem>
                      <MenuItem value="mislabeling">Mislabeling</MenuItem>
                      <MenuItem value="allergen">Undisclosed Allergen</MenuItem>
                      <MenuItem value="counterfeit">Counterfeit Product</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Product Name */}
                <Box>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1 }}>Product Name or UPC</Typography>
                  <TextField
                    fullWidth placeholder="e.g. Organic Almond Milk 32oz"
                    value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: '#e5e7eb' }, '&.Mui-focused fieldset': { borderColor: '#2563eb' } } }}
                  />
                </Box>

                {/* Description */}
                <Box>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1 }}>Detailed Description</Typography>
                  <TextField
                    fullWidth multiline rows={5}
                    placeholder="Describe the issue, how it was discovered, and any immediate effects..."
                    value={form.description}
                    onChange={(e) => e.target.value.length <= 500 && setForm({ ...form, description: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: '#e5e7eb' }, '&.Mui-focused fieldset': { borderColor: '#2563eb' } } }}
                  />
                  <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af', mt: 0.75 }}>{charCount} / 500</Typography>
                </Box>

                {/* Warning callout */}
                <Box sx={{ display: 'flex', gap: 1.5, borderLeft: '3px solid #dc2626', backgroundColor: '#fff5f5', borderRadius: '0 8px 8px 0', p: 2 }}>
                  <WarningIcon sx={{ fontSize: 20, color: '#dc2626', flexShrink: 0, mt: 0.25 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827', mb: 0.25 }}>Immediate Hazard?</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#374151' }}>
                      If this issue requires immediate medical attention, please contact local emergency services first.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Step 2 placeholder */}
            {step === 1 && (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2rem', mb: 2 }}>📎</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', color: '#111827', mb: 1 }}>Upload Evidence</Typography>
                <Typography sx={{ color: '#6b7280', fontSize: '0.9375rem' }}>Attach photos, receipts, or other supporting documents.</Typography>
              </Box>
            )}

            {/* Step 3 placeholder */}
            {step === 2 && (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2rem', mb: 2 }}>✅</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', color: '#111827', mb: 1 }}>Review & Submit</Typography>
                <Typography sx={{ color: '#6b7280', fontSize: '0.9375rem', mb: 2 }}>Review the details before submitting your safety report.</Typography>
                <Box sx={{ backgroundColor: '#f9fafb', borderRadius: '10px', p: 2.5, textAlign: 'left' }}>
                  <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 0.75 }}><strong>Category:</strong> {form.category || '—'}</Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 0.75 }}><strong>Product:</strong> {form.productName || '—'}</Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: '#374151' }}><strong>Description:</strong> {form.description || '—'}</Typography>
                </Box>
              </Box>
            )}

            {/* Footer */}
            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button onClick={() => step === 0 ? navigate(-1) : setStep(s => s - 1)}
                sx={{ color: '#6b7280', textTransform: 'none', fontWeight: 600, '&:hover': { backgroundColor: '#f3f4f6' } }}>
                {step === 0 ? 'Cancel' : '← Back'}
              </Button>
              <Button
                variant="contained"
                endIcon={step < 2 ? <ArrowForwardIcon /> : null}
                onClick={() => step < 2 ? setStep(s => s + 1) : navigate('/dashboard')}
                sx={{ backgroundColor: '#1d4ed8', textTransform: 'none', fontWeight: 700, borderRadius: '8px', px: 3, '&:hover': { backgroundColor: '#1e40af' } }}
              >
                {step < 2 ? 'Next Step' : 'Submit Report'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ReportFormPage;
