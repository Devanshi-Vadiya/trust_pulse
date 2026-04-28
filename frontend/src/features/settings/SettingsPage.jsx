import { Box, Typography, Button, Card, CardContent, Avatar, Divider } from '@mui/material';
import { Edit as EditIcon, Person as PersonIcon, Warning as WarningIcon } from '@mui/icons-material';

const SettingsPage = () => {
  const securityItems = [
    { label: 'Password', sub: 'Last updated 3 months ago', action: 'Update', actionColor: '#1d4ed8' },
    { label: 'Two-Factor Authentication', sub: 'Adds an extra layer of security to your account.', action: 'Enable', actionVariant: 'contained' },
    { label: 'Active Sessions', sub: 'Manage devices currently logged in.', action: 'Manage', actionColor: '#1d4ed8' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Typography sx={{ fontWeight: 700, fontSize: '1.75rem', color: '#111827', mb: 0.75 }}>Platform Settings</Typography>
      <Typography sx={{ color: '#6b7280', fontSize: '0.9375rem', mb: 4 }}>
        Manage your clinical profile, security credentials, and application preferences.
      </Typography>

      {/* Main grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '280px 1fr' }, gap: 3 }}>
        {/* Left: Profile Card */}
        <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px', alignSelf: 'start' }}>
          <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 80, height: 80, mb: 2,
                backgroundColor: '#dbeafe',
                fontSize: '2.5rem',
              }}
            >
              👨‍💼
            </Avatar>
            <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', color: '#111827', mb: 0.25 }}>Dr. Sarah Jenkins</Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#6b7280', mb: 3 }}>Lead Safety Analyst</Typography>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<EditIcon sx={{ fontSize: 15 }} />}
              sx={{
                borderColor: '#1d4ed8', color: '#1d4ed8',
                textTransform: 'none', fontWeight: 600, borderRadius: '8px',
                mb: 1.5, fontSize: '0.875rem',
                '&:hover': { backgroundColor: '#eff6ff' },
              }}
            >
              Edit Profile
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PersonIcon sx={{ fontSize: 15 }} />}
              sx={{
                borderColor: '#e5e7eb', color: '#374151',
                textTransform: 'none', fontWeight: 600, borderRadius: '8px',
                fontSize: '0.875rem',
                '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
              }}
            >
              View Public Profile
            </Button>
          </CardContent>
        </Card>

        {/* Right: Security + Danger Zone */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Account Security */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '14px' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{
                  width: 40, height: 40, borderRadius: '10px',
                  backgroundColor: '#f3f4f6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                }}>
                  🔒
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', color: '#111827' }}>Account Security</Typography>
              </Box>

              {securityItems.map((item, i) => (
                <Box key={i}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: '#111827', mb: 0.25 }}>{item.label}</Typography>
                      <Typography sx={{ fontSize: '0.8125rem', color: '#9ca3af' }}>{item.sub}</Typography>
                    </Box>
                    {item.actionVariant === 'contained' ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: '#1d4ed8', textTransform: 'none', fontWeight: 700,
                          borderRadius: '8px', px: 2, fontSize: '0.8125rem',
                          '&:hover': { backgroundColor: '#1e40af' },
                        }}
                      >
                        {item.action}
                      </Button>
                    ) : (
                      <Typography
                        sx={{ fontSize: '0.875rem', fontWeight: 700, color: item.actionColor, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                      >
                        {item.action}
                      </Typography>
                    )}
                  </Box>
                  {i < securityItems.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card elevation={0} sx={{ border: '1px solid #fecaca', borderRadius: '14px', backgroundColor: '#fff' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.125rem', color: '#dc2626', mb: 0.75 }}>Danger Zone</Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#6b7280', mb: 3 }}>Irreversible actions concerning your account data.</Typography>
              <Divider sx={{ mb: 2.5 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: '#111827', mb: 0.25 }}>Delete Account</Typography>
                  <Typography sx={{ fontSize: '0.8125rem', color: '#9ca3af' }}>Permanently remove your clinical data and profile.</Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<WarningIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    backgroundColor: '#dc2626', textTransform: 'none', fontWeight: 700,
                    borderRadius: '8px', px: 2.5, fontSize: '0.875rem',
                    '&:hover': { backgroundColor: '#b91c1c' },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
