import { useCallback } from 'react';

// Replace this with your actual Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

/**
 * Custom hook for Google Analytics page tracking and event tracking.
 */
export const useAnalytics = () => {
  // Track page views
  const trackPage = useCallback((path) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
      });
    }
  }, []);

  // Track specific events (clicks, form submissions, etc.)
  const trackEvent = useCallback(({ action, category, label, value }) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }, []);

  return { trackPage, trackEvent };
};
