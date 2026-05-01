import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { toggleTheme } from '../store/uiSlice';

/**
 * Custom hook to manage and abstract theme-related logic from Redux.
 * Provides the current mode, boolean helpers, a toggler, and a utility
 * function `t` to easily select colors based on the active theme.
 */
export const useThemeMode = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.ui.themeMode);

  const isLight = themeMode === 'light';
  const isDark = themeMode === 'dark';

  // Utility to quickly pick between light and dark variants inline
  const t = useCallback(
    (lightVal, darkVal) => {
      return isLight ? lightVal : darkVal;
    },
    [isLight]
  );

  // Dispatch theme toggle
  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return {
    themeMode,
    isLight,
    isDark,
    t,
    toggle,
  };
};
