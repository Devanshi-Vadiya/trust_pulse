import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from './theme/ThemeProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
