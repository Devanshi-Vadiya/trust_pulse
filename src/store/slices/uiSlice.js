import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeMode: localStorage.getItem('themeMode') || 'light',
  sidebarOpen: true,
  globalLoading: false,
  toast: {
    open: false,
    message: '',
    severity: 'info', // 'success', 'info', 'warning', 'error'
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.themeMode);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toast = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },
    hideToast: (state) => {
      state.toast.open = false;
    },
  },
});

export const { toggleTheme, toggleSidebar, setGlobalLoading, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
