import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction, loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token, loading, error } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    dispatch(loginStart());
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Temporary mock login logic
      if (email && password) {
        dispatch(loginSuccess({
          token: 'mock-jwt-token-12345',
          user: {
            id: '1',
            name: 'Devanshi Vadiya',
            email: email,
            role: 'Admin'
          }
        }));
        return true;
      } else {
        throw new Error('Please enter both email and password');
      }
    } catch (err) {
      dispatch(loginFailure(err.message || 'Login failed'));
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
    logout,
    isAdmin: user?.role === 'Admin',
  };
};
