import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './muiTheme';

export const ThemeProvider = ({ children }) => {
  // We will get the theme mode from Redux store later, default to light for now
  // const mode = useSelector((state) => state.ui.themeMode);
  const mode = 'light'; 

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
