import { useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './muiTheme';

export const ThemeProvider = ({ children }) => {
  // Get the theme mode from Redux store
  const mode = useSelector((state) => state.ui.themeMode) || 'light';

  const theme = mode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
