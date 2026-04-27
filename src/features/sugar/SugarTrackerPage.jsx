import { useState, useMemo } from 'react';
import { 
  Box, Typography, Card, CardContent, Button, Avatar, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem 
} from '@mui/material';
import { Download as DownloadIcon, CalendarToday as CalendarIcon, Add as AddIcon } from '@mui/icons-material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialScansLog = [
  { id: 1, name: 'Boost Maximum Energy', sub: '16 fl oz can', category: 'Beverages', sugar: 32, risk: 'HIGH', riskColor: '#dc2626', riskBg: '#fee2e2', time: '2:15 PM', emoji: '🥤' },
  { id: 2, name: 'Pure Nature Almond Milk', sub: 'Unsweetened, 1 Cup', category: 'Dairy Alt', sugar: 0, risk: 'SAFE', riskColor: '#1d4ed8', riskBg: '#eff6ff', time: '9:30 AM', emoji: '🥛' },
  { id: 3, name: 'FitCrunch Peanut Butter', sub: '1 bar (46g)', category: 'Snacks', sugar: 6, risk: 'WATCH', riskColor: '#b45309', riskBg: '#fef9c3', time: 'Yesterday', emoji: '🍫' },
  { id: 4, name: 'Artisan Cinnamon Roll', sub: 'Bakery item', category: 'Pastry', sugar: 45, risk: 'HIGH', riskColor: '#dc2626', riskBg: '#fee2e2', time: 'Yesterday', emoji: '🥐' },
];

const baseSugarData = [
  { day: 'Mon', intake: 28 }, { day: 'Tue', intake: 42 }, { day: 'Wed', intake: 35 },
  { day: 'Thu', intake: 55 }, { day: 'Fri', intake: 48 }, { day: 'Sat', intake: 65 }, { day: 'Sun', intake: 0 },
];

const baseRiskData = [
  { day: 'Mon', safe: 65, watch: 25, high: 10 },
  { day: 'Tue', safe: 55, watch: 30, high: 15 },
  { day: 'Wed', safe: 70, watch: 20, high: 10 },
  { day: 'Thu', safe: 40, watch: 35, high: 25 },
  { day: 'Fri', safe: 60, watch: 25, high: 15 },
  { day: 'Sat', safe: 30, watch: 40, high: 30 },
  { day: 'Sun', safe: 0, watch: 0, high: 0 },
];

const categories = ['Beverages', 'Dairy Alt', 'Snacks', 'Pastry', 'Meals', 'Other'];

const sugarEntrySchema = Yup.object().shape({
  name: Yup.string().required('Item name is required'),
  sub: Yup.string(),
  category: Yup.string().required('Category is required'),
  sugar: Yup.number()
    .min(0, 'Cannot be negative')
    .required('Sugar amount is required'),
  emoji: Yup.string(),
});

const SugarTrackerPage = () => {
  const [scansLog, setScansLog] = useState(initialScansLog);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formik for Add Item Modal
  const formik = useFormik({
    initialValues: {
      name: '',
      sub: '',
      category: 'Snacks',
      sugar: '',
      emoji: '🍎',
    },
    validationSchema: sugarEntrySchema,
    onSubmit: (values, { resetForm }) => {
      const sugarVal = Number(values.sugar);
      
      let risk = 'SAFE';
      let riskColor = '#1d4ed8';
      let riskBg = '#eff6ff';

      if (sugarVal >= 5 && sugarVal <= 15) {
        risk = 'WATCH';
        riskColor = '#b45309';
        riskBg = '#fef9c3';
      } else if (sugarVal > 15) {
        risk = 'HIGH';
        riskColor = '#dc2626';
        riskBg = '#fee2e2';
      }

      const newScan = {
        id: Date.now(),
        name: values.name,
        sub: values.sub || 'Manual Entry',
        category: values.category,
        sugar: sugarVal,
        risk,
        riskColor,
        riskBg,
        time: 'Just now',
        emoji: values.emoji || '🍽️'
      };

      setScansLog([newScan, ...scansLog]);
      setIsModalOpen(false);
      resetForm();
    },
  });

  // Dynamically calculate metrics
  const totalSugarToday = useMemo(() => {
    return scansLog
      .filter(scan => scan.time.includes('AM') || scan.time.includes('PM') || scan.time === 'Just now')
      .reduce((sum, item) => sum + item.sugar, 0);
  }, [scansLog]);

  const totalWeeklyIntake = 273 + totalSugarToday;
  const dailyAverage = (totalWeeklyIntake / 7).toFixed(1);
  const itemsScanned = 38 + scansLog.length;

  const sugarData = useMemo(() => {
    const data = [...baseSugarData];
    data[6] = { ...data[6], intake: totalSugarToday };
    return data;
  }, [totalSugarToday]);

  const riskData = useMemo(() => {
    const todayScans = scansLog.filter(scan => scan.time.includes('AM') || scan.time.includes('PM') || scan.time === 'Just now');
    let safe = 0, watch = 0, high = 0;
    todayScans.forEach(scan => {
      if (scan.sugar < 5) safe += 100 / (todayScans.length || 1);
      else if (scan.sugar <= 15) watch += 100 / (todayScans.length || 1);
      else high += 100 / (todayScans.length || 1);
    });

    const data = [...baseRiskData];
    if (todayScans.length > 0) {
      data[6] = { day: 'Sun', safe, watch, high };
    }
    return data;
  }, [scansLog]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    formik.resetForm();
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#111827' }}>Consumption Insights</Typography>
          <Typography sx={{ color: '#6b7280', fontSize: '0.9375rem', mt: 0.5 }}>Detailed breakdown of your scanned items and metabolic risk factors.</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, border: '1px solid #e5e7eb', borderRadius: '8px', px: 1.5, py: 0.875, cursor: 'pointer' }}>
            <CalendarIcon sx={{ fontSize: 16, color: '#6b7280' }} />
            <Typography sx={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500 }}>Oct 12 – Oct 18</Typography>
          </Box>
          <Button variant="outlined" startIcon={<DownloadIcon />}
            sx={{ borderColor: '#e5e7eb', color: '#374151', textTransform: 'none', fontWeight: 600, borderRadius: '8px', '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' } }}>
            Export
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal}
            sx={{ backgroundColor: '#1d4ed8', textTransform: 'none', fontWeight: 600, borderRadius: '8px', '&:hover': { backgroundColor: '#1e40af' } }}>
            Add Item
          </Button>
        </Box>
      </Box>

      {/* Top section: chart + stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 260px' }, gap: 2.5, mb: 2.5 }}>
        {/* 7-Day Chart */}
        <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: '#111827' }}>7-Day Sugar Intake</Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: '#9ca3af' }}>Measured in Grams (g)</Typography>
            </Box>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={sugarData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}g`} />
                <Tooltip formatter={(v) => [`${v}g`, 'Intake']} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.8125rem' }} />
                <Area type="monotone" dataKey="intake" stroke="#1d4ed8" fill="rgba(29,78,216,0.08)" strokeWidth={2.5} dot={{ fill: '#111827', r: 5 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', gap: 3, mt: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#1d4ed8' }} />
                <Typography sx={{ fontSize: '0.75rem', color: '#6b7280' }}>Intake</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 16, height: 2, backgroundColor: '#b45309' }} />
                <Typography sx={{ fontSize: '0.75rem', color: '#6b7280' }}>AHA Daily Limit (50g)</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Stats */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Total */}
          <Card elevation={0} sx={{ borderRadius: '14px', backgroundColor: '#1d4ed8', border: 'none', flex: 1 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em', mb: 1.5 }}>TOTAL WEEKLY INTAKE</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '2.5rem', color: '#fff', lineHeight: 1, mb: 0.5 }}>
                {totalWeeklyIntake} <span style={{ fontSize: '1.125rem', fontWeight: 500 }}>grams</span>
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.75)' }}>↗ +12% vs last week</Typography>
            </CardContent>
          </Card>
          {/* Daily avg + items */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
              <CardContent sx={{ p: 2 }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af', mb: 0.5 }}>Daily Average</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1.375rem', color: '#111827' }}>{dailyAverage}g</Typography>
              </CardContent>
            </Card>
            <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
              <CardContent sx={{ p: 2 }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af', mb: 0.5 }}>Items Tracked</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1.375rem', color: '#111827' }}>{itemsScanned}</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Risk breakdown */}
      <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px', mb: 2.5 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: '#111827' }}>Daily Risk Breakdown</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[{ color: '#1d4ed8', label: 'Safe (<5g)' }, { color: '#b45309', label: 'Watch (5-15g)' }, { color: '#dc2626', label: 'High (>15g)' }].map(l => (
                <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: l.color }} />
                  <Typography sx={{ fontSize: '0.75rem', color: '#6b7280' }}>{l.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Typography sx={{ fontSize: '0.8125rem', color: '#9ca3af', mb: 2.5 }}>Proportion of scanned items by metabolic impact.</Typography>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={riskData} layout="vertical" margin={{ left: 20, right: 10 }} barSize={14}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="day" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} width={30} />
              <Bar dataKey="safe" stackId="a" fill="#1d4ed8" radius={[0, 0, 0, 0]} />
              <Bar dataKey="watch" stackId="a" fill="#b45309" />
              <Bar dataKey="high" stackId="a" fill="#dc2626" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent scans log */}
      <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.0625rem', color: '#111827' }}>Recent Scans Log</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#1d4ed8', fontWeight: 600, cursor: 'pointer' }}>View All</Typography>
          </Box>
          {/* Table header */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 1fr 1fr' }, gap: 1, pb: 1.5, borderBottom: '1px solid #f3f4f6', mb: 1, display: { xs: 'none', sm: 'grid' } }}>
            {['PRODUCT INFO', 'CATEGORY', 'ADDED SUGARS', 'RISK LEVEL', 'TIME'].map(h => (
              <Typography key={h} sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em' }}>{h}</Typography>
            ))}
          </Box>
          
          {scansLog.length === 0 && (
            <Typography sx={{ py: 3, textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>No items tracked yet.</Typography>
          )}

          {scansLog.map((s, i) => (
            <Box key={s.id} sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 1fr 1fr' }, 
              gap: { xs: 2, sm: 1 }, 
              alignItems: 'center', 
              py: 1.75, 
              borderBottom: i < scansLog.length - 1 ? '1px solid #f9fafb' : 'none' 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ width: 36, height: 36, borderRadius: '8px', backgroundColor: '#f3f4f6', fontSize: '1.1rem' }}>{s.emoji}</Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>{s.name}</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#9ca3af' }}>{s.sub}</Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: '0.875rem', color: '#374151' }}>{s.category}</Typography>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{s.sugar}g</Typography>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, backgroundColor: s.riskBg, borderRadius: '6px', px: 1, py: 0.25, width: 'fit-content' }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: s.riskColor }}>{s.risk}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.8125rem', color: '#9ca3af' }}>{s.time}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Add Item Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '12px', p: 1 } }}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle sx={{ fontWeight: 700, color: '#111827', pb: 1 }}>Add New Entry</DialogTitle>
          <DialogContent sx={{ pb: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', color: '#6b7280', mb: 3 }}>Log a food or beverage manually.</Typography>
            
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', mb: 0.5 }}>Item Name</Typography>
            <TextField 
              fullWidth size="small" placeholder="e.g. Apple Juice" sx={{ mb: 2 }}
              name="name"
              value={formik.values.name} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', mb: 0.5 }}>Details / Serving Size</Typography>
            <TextField 
              fullWidth size="small" placeholder="e.g. 1 glass (240ml)" sx={{ mb: 2 }}
              name="sub"
              value={formik.values.sub} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.sub && Boolean(formik.errors.sub)}
              helperText={formik.touched.sub && formik.errors.sub}
            />
            
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', mb: 0.5 }}>Category</Typography>
            <TextField
              fullWidth size="small" select sx={{ mb: 2 }}
              name="category"
              value={formik.values.category} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', mb: 0.5 }}>Added Sugars (g)</Typography>
            <TextField 
              fullWidth size="small" type="number" placeholder="0" sx={{ mb: 2 }}
              name="sugar"
              value={formik.values.sugar} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.sugar && Boolean(formik.errors.sugar)}
              helperText={formik.touched.sugar && formik.errors.sugar}
            />
            
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', mb: 0.5 }}>Emoji Icon</Typography>
            <TextField 
              fullWidth size="small" placeholder="e.g. 🍎" sx={{ mb: 1 }}
              name="emoji"
              value={formik.values.emoji} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.emoji && Boolean(formik.errors.emoji)}
              helperText={formik.touched.emoji && formik.errors.emoji}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseModal} sx={{ color: '#6b7280', textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
            <Button 
              type="submit" variant="contained"
              disabled={formik.isSubmitting}
              sx={{ backgroundColor: '#1d4ed8', textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}
            >
              Add Entry
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default SugarTrackerPage;
