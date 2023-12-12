import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken, authAPI } from '../api/axiosInstance';
import { showToast } from '../utils/toast';

export const AuthContext = createContext();
// eslint-disable-next-line
export const AuthProvider = ({ children }) => {
  const [Manager, setManager] = useState();
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    if (document.cookie.split('=')[1]) {
      setAuthToken(document.cookie.split('=')[1]);
      try {
        const res = await authAPI.getCurrentUser();
        setManager(res.data.data);
      } catch (err) {
        handleError(err);
        setManager(null);
        document.cookie = 'token=null';
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleError = (err) => {
    let errorMessage = err?.response?.data?.error;
    if (errorMessage?.includes('Duplicate')) {
      errorMessage = 'This email is already in use';
    } else if (!errorMessage) {
      errorMessage = 'An unknown error occurred';
    }
    showToast(errorMessage, 'error');
  };

  const login = async (email, password) => {
    try {
      await authAPI.login(email, password);
      loadUser();
    } catch (err) {
      handleError(err);
    }
  };

  const register = async (formData) => {
    try {
      await authAPI.register(formData);
      loadUser();
    } catch (err) {
      handleError(err);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      document.cookie = 'token=null';
      setManager(null);
    } catch (err) {
      handleError(err);
    }
  };

  const value = {
    Manager,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};