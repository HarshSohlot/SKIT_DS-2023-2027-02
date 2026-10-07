import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMockMode, setIsMockMode] = useState(false);

  useEffect(() => {
    // Check if user is already logged in on page reload
    const storedUser = authService.getCurrentUser();
    const storedToken = authService.getToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, roleHint) => {
    const result = await authService.login(email, password, roleHint);
    if (result.success) {
      setUser(result.user);
      setToken(result.token);
      setIsMockMode(result.isMock);
    }
    return result;
  };

  const register = async (userData) => {
    const result = await authService.register(userData);
    if (result.success) {
      setUser(result.user);
      setToken(result.token);
      setIsMockMode(result.isMock);
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setIsMockMode(false);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    role: user?.role || null,
    loading,
    isMockMode,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
