import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authApi } from '../api/auth';
import { oauthApi } from '../api/oauth';
import type { AuthUser } from '../types/auth';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  initialLoad: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
  refreshUser: () => Promise<void>;
  getToken: () => string | null;
  oauthLogin: (provider: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      fetchCurrentUser().finally(() => setInitialLoad(false));
    } else {
      setInitialLoad(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await authApi.getCurrentUser();
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      logout();
    }
  };

  const login = async (username: string, password: string) => {
    const response = await authApi.login({ username, password });
    const { token } = response.data;

    setToken(token);
    localStorage.setItem('token', token);

    const userResponse = await authApi.getCurrentUser();
    setUser(userResponse.data);
    localStorage.setItem('user', JSON.stringify(userResponse.data));
  };

  const register = async (data: any) => {
    const response = await authApi.register(data);
    setUser(response.data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    window.location.href = '/login';
  };

  const updateUser = (updatedUser: AuthUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const refreshUser = async () => {
    await fetchCurrentUser();
  };

  const getToken = () => localStorage.getItem('token');

  const oauthLogin = async (provider: string) => {
    const response = await oauthApi.getAuthorizationUrl(provider);
    window.location.href = response.data.url;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        initialLoad,
        login,
        register,
        logout,
        updateUser,
        refreshUser,
        getToken,
        oauthLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
