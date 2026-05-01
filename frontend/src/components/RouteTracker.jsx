import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';

/**
 * Utility component that silently tracks route changes.
 * Must be placed inside the BrowserRouter.
 */
const RouteTracker = () => {
  const location = useLocation();
  const { trackPage } = useAnalytics();

  useEffect(() => {
    // Send the current path to Google Analytics whenever the location changes
    trackPage(location.pathname + location.search);
  }, [location, trackPage]);

  return null;
};

export default RouteTracker;
