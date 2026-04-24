import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scanHistory: [],
  currentProduct: null,
  sugarData: {
    dailyTotal: 60,
    dailyLimit: 50,
    weeklyTotal: 305,
    recentScans: [],
  },
  alcoholData: {
    recentVerifications: [],
  },
  waterData: {
    recentVerifications: [],
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
      // Add to history if valid
      if (action.payload) {
        state.scanHistory.unshift(action.payload);
      }
    },
    setSugarData: (state, action) => {
      state.sugarData = action.payload;
    },
    addScanLog: (state, action) => {
      state.scanHistory.unshift(action.payload);
      // Logic could update sugarData.dailyTotal here in a real app
    },
  },
});

export const { setProductLoading, setProductError, setCurrentProduct, setSugarData, addScanLog } = productSlice.actions;
export default productSlice.reducer;
