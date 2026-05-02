import { useSelector, useDispatch } from 'react-redux';
import {
  logout as logoutAction,
  loginStart,
  loginSuccess,
  loginFailure,
} from '../store/authSlice';
import apiClient from '../services/api';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token, loading, error } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    dispatch(loginStart());
    try {
      const response = await apiClient.post('/auth/login', { email, password });

      if (response.data.success) {
        const { token, user } = response.data;
        dispatch(loginSuccess({ token, user }));
        return true;
      }
      return false;
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || err.message || 'Login failed'));
      return false;
    }
  };

  const signup = async (name, email, password) => {
    dispatch(loginStart());
    try {
      const response = await apiClient.post('/auth/signup', { name, email, password });

      if (response.data.success) {
        const { token, user } = response.data;
        dispatch(loginSuccess({ token, user }));
        return true;
      }
      return false;
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || err.message || 'Signup failed'));
      return false;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    isAuthenticated,
    user,
    token,
    loading,
    error,
    login,
    signup,
    logout,
    isAdmin: user?.role === 'Admin',
  };
};
