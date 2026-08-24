'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthUser, UserRole } from '@/lib/auth-types';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isGuest: boolean;
  isLoading: boolean;
  
  // Auth Operations
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, phone?: string, city?: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: (customData?: { name: string; email: string; avatar?: string }) => Promise<{ success: boolean; message?: string }>;
  continueAsGuest: () => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => Promise<{ success: boolean; message?: string }>;
  
  // Auth Modal State
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'guest';
  openAuthModal: (tab?: 'login' | 'register' | 'guest') => void;
  closeAuthModal: () => void;
  
  // Google Popup Simulator State
  isGooglePopupOpen: boolean;
  openGooglePopup: () => void;
  closeGooglePopup: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tameer_user_data');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('tameer_jwt_token');
      } catch {}
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'guest'>('login');
  const [isGooglePopupOpen, setIsGooglePopupOpen] = useState<boolean>(false);

  // Synchronize Token to localStorage & Cookie
  const saveAuthSession = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem('tameer_jwt_token', newToken);
      localStorage.setItem('tameer_user_data', JSON.stringify(newUser));
      document.cookie = `tameer_jwt_token=${newToken}; path=/; max-age=604800; SameSite=Lax`;
    } catch (e) {
      console.error('Failed to save auth session:', e);
    }
  };

  const clearAuthSession = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem('tameer_jwt_token');
      localStorage.removeItem('tameer_user_data');
      document.cookie = 'tameer_jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    } catch (e) {
      console.error('Failed to clear auth session:', e);
    }
  };

  // Background verification of token on mount
  useEffect(() => {
    let isMounted = true;
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('tameer_jwt_token') : null;
    if (!storedToken) return;

    fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${storedToken}` }
    })
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (data.success && data.user) {
          setUser(data.user);
          try {
            localStorage.setItem('tameer_user_data', JSON.stringify(data.user));
          } catch {}
        } else {
          clearAuthSession();
        }
      })
      .catch(() => {
        // Keep offline cached user if network fails temporarily
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Login Handler
  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        saveAuthSession(data.token, data.user);
        setIsAuthModalOpen(false);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Login failed. Please verify credentials.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error occurred during login' };
    } finally {
      setIsLoading(false);
    }
  };

  // Registration Handler
  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
    city?: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, city }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        saveAuthSession(data.token, data.user);
        setIsAuthModalOpen(false);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error occurred during registration' };
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In Handler
  const loginWithGoogle = async (customData?: { name: string; email: string; avatar?: string }): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const payload = customData || {
        name: 'Google User',
        email: 'user.google@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        googleId: 'google_' + Date.now(),
      };

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        saveAuthSession(data.token, data.user);
        setIsAuthModalOpen(false);
        setIsGooglePopupOpen(false);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Google sign-in failed' };
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, message: 'Google authentication service unreachable' };
    } finally {
      setIsLoading(false);
    }
  };

  // Guest Session Handler
  const continueAsGuest = async (): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        saveAuthSession(data.token, data.user);
        setIsAuthModalOpen(false);
        return { success: true, message: 'Browsing as Guest Patient' };
      } else {
        return { success: false, message: data.message || 'Failed to initialize guest session' };
      }
    } catch (error) {
      console.error('Guest session error:', error);
      return { success: false, message: 'Network error creating guest mode' };
    } finally {
      setIsLoading(false);
    }
  };

  // Update Profile Handler
  const updateProfile = async (data: Partial<AuthUser>): Promise<{ success: boolean; message?: string }> => {
    if (!token) return { success: false, message: 'Not authenticated' };

    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (res.ok && resData.success && resData.user) {
        setUser(resData.user);
        try {
          localStorage.setItem('tameer_user_data', JSON.stringify(resData.user));
        } catch {}
        return { success: true, message: 'Profile updated successfully' };
      } else {
        return { success: false, message: resData.message || 'Update failed' };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'Failed to communicate with server' };
    }
  };

  // Logout Handler
  const logout = () => {
    clearAuthSession();
  };

  const openAuthModal = (tab: 'login' | 'register' | 'guest' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openGooglePopup = () => {
    setIsGooglePopupOpen(true);
  };

  const closeGooglePopup = () => {
    setIsGooglePopupOpen(false);
  };

  const role = user ? user.role : null;
  const isAuthenticated = !!user && user.role !== 'guest';
  const isAdmin = user?.role === 'admin';
  const isGuest = user?.role === 'guest';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        isAdmin,
        isGuest,
        isLoading,
        login,
        register,
        loginWithGoogle,
        continueAsGuest,
        logout,
        updateProfile,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        isGooglePopupOpen,
        openGooglePopup,
        closeGooglePopup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
