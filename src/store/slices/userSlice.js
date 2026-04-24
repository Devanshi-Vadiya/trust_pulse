import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    name: 'Devanshi Vadiya',
    email: 'admin@trustpulse.ai',
    avatar: '',
    role: 'Admin',
    plan: 'Pro',
  },
  preferences: {
    notifications: true,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
  },
});

export const { updateProfile, updatePreferences } = userSlice.actions;
export default userSlice.reducer;
