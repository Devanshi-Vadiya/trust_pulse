import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PageSEO from '../../components/PageSEO';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppCard from '../../components/AppCard';
import {
  Box,
  Typography,
  CardContent,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  useTheme
} from '@mui/material';
import {
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialScansLog = [
  {
    id: 1,
    name: 'Boost Maximum Energy',
    sub: '16 fl oz can',
    category: 'Beverages',
    sugar: 32,
    risk: 'HIGH',
    riskColor: '#dc2626',
    riskBg: '#fee2e2',
    time: '2:15 PM',
    emoji: '🥤',
  },
  {
    id: 2,
    name: 'Pure Nature Almond Milk',
    sub: 'Unsweetened, 1 Cup',
    category: 'Dairy Alt',
    sugar: 0,
    risk: 'SAFE',
    riskColor: '#1d4ed8',
    riskBg: '#eff6ff',
    time: '9:30 AM',
    emoji: '🥛',
  },
  {
    id: 3,
    name: 'FitCrunch Peanut Butter',
    sub: '1 bar (46g)',
    category: 'Snacks',
    sugar: 6,
    risk: 'WATCH',
    riskColor: '#b45309',
    riskBg: '#fef9c3',
    time: 'Yesterday',
    emoji: '🍫',
  },
  {
    id: 4,
    name: 'Artisan Cinnamon Roll',
    sub: 'Bakery item',
    category: 'Pastry',
    sugar: 45,
    risk: 'HIGH',
    riskColor: '#dc2626',
    riskBg: '#fee2e2',
    time: 'Yesterday',
    emoji: '🥐',
  },
];

const baseSugarData = [
  { day: 'Mon', intake: 28 },
  { day: 'Tue', intake: 42 },
  { day: 'Wed', intake: 35 },
  { day: 'Thu', intake: 55 },
  { day: 'Fri', intake: 48 },
  { day: 'Sat', intake: 65 },
  { day: 'Sun', intake: 0 },
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
  sugar: Yup.number().min(0, 'Cannot be negative').required('Sugar amount is required'),
  emoji: Yup.string(),
});

const SugarTrackerPage = () => {
  const [scansLog, setScansLog] = useState(initialScansLog);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const t = (light, dark) => (isLight ? light : dark);

  const formik = useFormik({
    initialValues: { name: '', sub: '', category: 'Snacks', sugar: '', emoji: '🍎' },
    validationSchema: sugarEntrySchema,
    onSubmit: (values, { resetForm }) => {
      const sugarVal = Number(values.sugar);
      let risk = 'SAFE',
        riskColor = '#1d4ed8',
        riskBg = '#eff6ff';
      if (sugarVal >= 5 && sugarVal <= 15) {
        risk = 'WATCH';
        riskColor = '#b45309';
        riskBg = '#fef9c3';
      } else if (sugarVal > 15) {
        risk = 'HIGH';
        riskColor = '#dc2626';
        riskBg = '#fee2e2';
      }
      setScansLog([
        {
          id: Date.now(),
          name: values.name,
          sub: values.sub || 'Manual Entry',
          category: values.category,
          sugar: sugarVal,
          risk,
          riskColor,
          riskBg,
          time: 'Just now',
          emoji: values.emoji || '🍽️',
        },
        ...scansLog,
      ]);
      setIsModalOpen(false);
      resetForm();
    },
  });

  const totalSugarToday = useMemo(
    () =>
      scansLog
        .filter((s) => s.time.includes('AM') || s.time.includes('PM') || s.time === 'Just now')
        .reduce((sum, item) => sum + item.sugar, 0),
    [scansLog]
  );
  const totalWeeklyIntake = 273 + totalSugarToday;
  const dailyAverage = (totalWeeklyIntake / 7).toFixed(1);
  const itemsScanned = 38 + scansLog.length;

  const sugarData = useMemo(() => {
    const d = [...baseSugarData];
    d[6] = { ...d[6], intake: totalSugarToday };
    return d;
  }, [totalSugarToday]);
  const riskData = useMemo(() => {
    const todayScans = scansLog.filter(
      (s) => s.time.includes('AM') || s.time.includes('PM') || s.time === 'Just now'
    );
    let safe = 0,
      watch = 0,
      high = 0;
    todayScans.forEach((s) => {
      if (s.sugar < 5) safe += 100 / (todayScans.length || 1);
      else if (s.sugar <= 15) watch += 100 / (todayScans.length || 1);
      else high += 100 / (todayScans.length || 1);
    });
    const d = [...baseRiskData];
    if (todayScans.length > 0) d[6] = { day: 'Sun', safe, watch, high };
    return d;
  }, [scansLog]);

  return (
    <>
      <PageSEO
        title="Safety History"
        description="Track your daily and weekly sugar consumption. View metabolic risk breakdown and recent scan history."
        path="/sugar-tracker"
      />
      <Box
        component="main"
        role="main"
        sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: 700, fontSize: '1.5rem', color: t('#111827', '#f8fafc') }}
            >
              Consumption Insights
            </Typography>
            <Typography sx={{ color: t('#6b7280', '#94a3b8'), fontSize: '0.9375rem', mt: 0.5 }}>
              Detailed breakdown of your scanned items and metabolic risk factors.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: t('1px solid #e5e7eb', '1px solid #334155'),
                borderRadius: '8px',
                px: 1.5,
                py: 0.875,
                cursor: 'pointer',
                backgroundColor: t('transparent', '#1e293b'),
              }}
            >
              <CalendarIcon sx={{ fontSize: 16, color: t('#6b7280', '#94a3b8') }} />
              <Typography
                sx={{ fontSize: '0.875rem', color: t('#374151', '#cbd5e1'), fontWeight: 500 }}
              >
                Oct 12 – Oct 18
              </Typography>
            </Box>
            <AppButton
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                borderColor: t('#e5e7eb', '#334155'),
                color: t('#374151', '#cbd5e1'),
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
              }}
            >
              Export
            </AppButton>
            <AppButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsModalOpen(true)}
              sx={{
                backgroundColor: '#1d4ed8',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                '&:hover': { backgroundColor: '#1e40af' },
              }}
            >
              Add Item
            </AppButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 260px' },
            gap: 2.5,
            mb: 2.5,
          }}
        >
          <AppCard elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: '1.0625rem', color: t('#111827', '#f8fafc') }}
                >
                  7-Day Sugar Intake
                </Typography>
                <Typography sx={{ fontSize: '0.8125rem', color: t('#9ca3af', '#64748b') }}>
                  Measured in Grams (g)
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={sugarData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={t('#f3f4f6', '#334155')} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: t('#9ca3af', '#64748b') }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: t('#9ca3af', '#64748b') }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}g`}
                  />
                  <Tooltip
                    formatter={(v) => [`${v}g`, 'Intake']}
                    contentStyle={{
                      borderRadius: '8px',
                      border: t('1px solid #e5e7eb', '1px solid #334155'),
                      backgroundColor: t('#fff', '#1e293b'),
                      color: t('#111827', '#f8fafc'),
                      fontSize: '0.8125rem',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="intake"
                    stroke="#1d4ed8"
                    fill="rgba(29,78,216,0.08)"
                    strokeWidth={2.5}
                    dot={{ fill: t('#111827', '#f8fafc'), r: 5 }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </AppCard>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AppCard
              elevation={0}
              sx={{ borderRadius: '14px', backgroundColor: '#1d4ed8', border: 'none', flex: 1 }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.05em',
                    mb: 1.5,
                  }}
                >
                  TOTAL WEEKLY INTAKE
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '2.5rem',
                    color: '#fff',
                    lineHeight: 1,
                    mb: 0.5,
                  }}
                >
                  {totalWeeklyIntake}{' '}
                  <span style={{ fontSize: '1.125rem', fontWeight: 500 }}>grams</span>
                </Typography>
                <Typography sx={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.75)' }}>
                  ↗ +12% vs last week
                </Typography>
              </CardContent>
            </AppCard>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <AppCard elevation={0}>
                <CardContent sx={{ p: 2 }}>
                  <Typography sx={{ fontSize: '0.75rem', color: t('#9ca3af', '#64748b'), mb: 0.5 }}>
                    Daily Average
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: '1.375rem', color: t('#111827', '#f8fafc') }}
                  >
                    {dailyAverage}g
                  </Typography>
                </CardContent>
              </AppCard>
              <AppCard elevation={0}>
                <CardContent sx={{ p: 2 }}>
                  <Typography sx={{ fontSize: '0.75rem', color: t('#9ca3af', '#64748b'), mb: 0.5 }}>
                    Items Tracked
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: '1.375rem', color: t('#111827', '#f8fafc') }}
                  >
                    {itemsScanned}
                  </Typography>
                </CardContent>
              </AppCard>
            </Box>
          </Box>
        </Box>

        <AppCard elevation={0} sx={{ mb: 2.5 }}>
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 0.5,
              }}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: '1.0625rem', color: t('#111827', '#f8fafc') }}
              >
                Daily Risk Breakdown
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {[
                  { color: '#1d4ed8', label: 'Safe (<5g)' },
                  { color: t('#b45309', '#f59e0b'), label: 'Watch (5-15g)' },
                  { color: t('#dc2626', '#f87171'), label: 'High (>15g)' },
                ].map((l) => (
                  <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Box
                      sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: l.color }}
                    />
                    <Typography sx={{ fontSize: '0.75rem', color: t('#6b7280', '#94a3b8') }}>
                      {l.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.8125rem', color: t('#9ca3af', '#64748b'), mb: 2.5 }}>
              Proportion of scanned items by metabolic impact.
            </Typography>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart
                data={riskData}
                layout="vertical"
                margin={{ left: 20, right: 10 }}
                barSize={14}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="day"
                  tick={{ fontSize: 12, fill: t('#6b7280', '#94a3b8') }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <Bar dataKey="safe" stackId="a" fill="#1d4ed8" />
                <Bar dataKey="watch" stackId="a" fill={t('#b45309', '#f59e0b')} />
                <Bar
                  dataKey="high"
                  stackId="a"
                  fill={t('#dc2626', '#f87171')}
                  radius={[0, 3, 3, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </AppCard>

        <AppCard elevation={0}>
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2.5,
              }}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: '1.0625rem', color: t('#111827', '#f8fafc') }}
              >
                Recent Scans Log
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: t('#1d4ed8', '#60a5fa'),
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                View All
              </Typography>
            </Box>
            <Box
              sx={{
                gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 1fr 1fr' },
                gap: 1,
                pb: 1.5,
                borderBottom: t('1px solid #f3f4f6', '1px solid #334155'),
                mb: 1,
                display: { xs: 'none', sm: 'grid' },
              }}
            >
              {['PRODUCT INFO', 'CATEGORY', 'ADDED SUGARS', 'RISK LEVEL', 'TIME'].map((h) => (
                <Typography
                  key={h}
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: t('#9ca3af', '#64748b'),
                    letterSpacing: '0.05em',
                  }}
                >
                  {h}
                </Typography>
              ))}
            </Box>
            {scansLog.map((s, i) => (
              <Box
                key={s.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 1fr 1fr' },
                  gap: { xs: 2, sm: 1 },
                  alignItems: 'center',
                  py: 1.75,
                  borderBottom:
                    i < scansLog.length - 1 ? t('1px solid #f9fafb', '1px solid #1e293b') : 'none',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '8px',
                      backgroundColor: t('#f3f4f6', '#334155'),
                      fontSize: '1.1rem',
                    }}
                  >
                    {s.emoji}
                  </Avatar>
                  <Box>
                    <Typography
                      sx={{ fontWeight: 600, fontSize: '0.875rem', color: t('#111827', '#f8fafc') }}
                    >
                      {s.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: t('#9ca3af', '#64748b') }}>
                      {s.sub}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '0.875rem', color: t('#374151', '#cbd5e1') }}>
                  {s.category}
                </Typography>
                <Typography
                  sx={{ fontSize: '0.875rem', fontWeight: 600, color: t('#111827', '#f8fafc') }}
                >
                  {s.sugar}g
                </Typography>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: s.riskBg,
                    borderRadius: '6px',
                    px: 1,
                    py: 0.25,
                    width: 'fit-content',
                  }}
                >
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: s.riskColor }}>
                    {s.risk}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.8125rem', color: t('#9ca3af', '#64748b') }}>
                  {s.time}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </AppCard>

        <Dialog
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            formik.resetForm();
          }}
          maxWidth="xs"
          fullWidth
          PaperProps={{ sx: { borderRadius: '12px', p: 1, backgroundColor: t('#fff', '#1e293b') } }}
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle sx={{ fontWeight: 700, color: t('#111827', '#f8fafc'), pb: 1 }}>
              Add New Entry
            </DialogTitle>
            <DialogContent sx={{ pb: 1 }}>
              {[
                ['name', 'Item Name', 'e.g. Apple Juice'],
                ['sub', 'Details / Serving Size', 'e.g. 1 glass (240ml)'],
                ['sugar', 'Added Sugars (g)', '0'],
                ['emoji', 'Emoji Icon', '🍎'],
              ].map(([name, label, ph]) => (
                <Box key={name}>
                  <Typography
                    sx={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: t('#374151', '#cbd5e1'),
                      mb: 0.5,
                    }}
                  >
                    {label}
                  </Typography>
                  <AppInput
                    fullWidth
                    size="small"
                    placeholder={ph}
                    name={name}
                    type={name === 'sugar' ? 'number' : 'text'}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                    sx={{ mb: 2 }}
                  />
                </Box>
              ))}
              <Typography
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: t('#374151', '#cbd5e1'),
                  mb: 0.5,
                }}
              >
                Category
              </Typography>
              <AppInput
                fullWidth
                size="small"
                select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                sx={{ mb: 1 }}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </AppInput>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <AppButton
                onClick={() => {
                  setIsModalOpen(false);
                  formik.resetForm();
                }}
                sx={{ color: t('#6b7280', '#94a3b8'), textTransform: 'none', fontWeight: 600 }}
              >
                Cancel
              </AppButton>
              <AppButton
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
                sx={{
                  backgroundColor: '#1d4ed8',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px',
                }}
              >
                Add Entry
              </AppButton>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </>
  );
};

export default SugarTrackerPage;
