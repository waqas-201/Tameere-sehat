'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
  signOut,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, googleProvider, db } from '@/lib/firebase';
import { AuthUser, UserRole } from '@/lib/auth-types';

interface AuthContextType {
  user: AuthUser | null;
  firebaseUser: FirebaseUser | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isGuest: boolean;
  isLoading: boolean;
  
  // Real Firebase Auth Operations
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, phone?: string, city?: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message?: string }>;
  continueAsGuest: () => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<{ success: boolean; message?: string }>;
  
  // Auth Modal State
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'guest';
  openAuthModal: (tab?: 'login' | 'register' | 'guest') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin email list
const ADMIN_EMAILS = [
  'admin@tameersehat.pk',
  'waqasvu892@gmail.com'
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Client hydration for cached user profile
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tameer_firebase_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {}
  }, []);
  
  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'guest'>('login');

  // Helper to fetch or create user document in Firestore
  const syncUserDoc = async (fbUser: FirebaseUser, extraData?: { name?: string; phone?: string; city?: string }) => {
    try {
      const userDocRef = doc(db, 'users', fbUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      const email = fbUser.email?.toLowerCase() || `guest_${fbUser.uid.slice(0, 6)}@tameersehat.pk`;
      const isUserAdmin = ADMIN_EMAILS.includes(email);
      const isAnon = fbUser.isAnonymous;
      const role: UserRole = isUserAdmin ? 'admin' : isAnon ? 'guest' : 'user';
      
      let profile: AuthUser;

      if (userDocSnap.exists()) {
        const existingData = userDocSnap.data();
        profile = {
          id: fbUser.uid,
          name: existingData.name || fbUser.displayName || (isAnon ? 'Guest Patient' : 'Patient'),
          email: existingData.email || email,
          role: existingData.role || role,
          avatar: existingData.avatar || fbUser.photoURL || undefined,
          phone: existingData.phone || extraData?.phone,
          city: existingData.city || extraData?.city || 'Karachi',
          address: existingData.address,
          provider: isAnon ? 'guest' : (fbUser.providerData[0]?.providerId.includes('google') ? 'google' : 'email'),
          createdAt: existingData.createdAt || new Date().toISOString(),
          savedMizaj: existingData.savedMizaj,
          orderCount: existingData.orderCount || 0
        };
      } else {
        // Create initial user doc
        profile = {
          id: fbUser.uid,
          name: extraData?.name || fbUser.displayName || (isAnon ? 'Guest Patient' : (email.split('@')[0])),
          email: email,
          role: role,
          avatar: fbUser.photoURL || undefined,
          phone: extraData?.phone || '',
          city: extraData?.city || 'Karachi',
          provider: isAnon ? 'guest' : (fbUser.providerData[0]?.providerId.includes('google') ? 'google' : 'email'),
          createdAt: new Date().toISOString(),
          orderCount: 0
        };

        await setDoc(userDocRef, {
          ...profile,
          serverCreated: serverTimestamp(),
        }, { merge: true });
      }

      setUser(profile);
      try {
        localStorage.setItem('tameer_firebase_user', JSON.stringify(profile));
      } catch {}

      return profile;
    } catch (err) {
      console.error('Firestore user sync error:', err);
      // Fallback local representation
      const isUserAdmin = ADMIN_EMAILS.includes(fbUser.email?.toLowerCase() || '');
      const profile: AuthUser = {
        id: fbUser.uid,
        name: fbUser.displayName || (fbUser.isAnonymous ? 'Guest Patient' : 'Patient'),
        email: fbUser.email || `guest_${fbUser.uid.slice(0, 6)}@tameersehat.pk`,
        role: isUserAdmin ? 'admin' : (fbUser.isAnonymous ? 'guest' : 'user'),
        avatar: fbUser.photoURL || undefined,
        provider: fbUser.isAnonymous ? 'guest' : 'email',
        createdAt: new Date().toISOString()
      };
      setUser(profile);
      return profile;
    }
  };

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setIsLoading(true);
      if (fbUser) {
        setFirebaseUser(fbUser);
        try {
          const idToken = await fbUser.getIdToken();
          setToken(idToken);
          await syncUserDoc(fbUser);
        } catch (e) {
          console.error('Error fetching ID token or syncing:', e);
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
        setToken(null);
        try {
          localStorage.removeItem('tameer_firebase_user');
        } catch {}
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login with Email & Password
  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      await syncUserDoc(userCredential.user);
      setIsAuthModalOpen(false);
      return { success: true, message: 'Successfully signed in with Firebase' };
    } catch (error: any) {
      console.error('Firebase sign-in error:', error);
      let errorMsg = 'Failed to sign in. Please verify your credentials.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMsg = 'Invalid email or password. Please check your credentials or create a new account.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMsg = 'Too many failed attempts. Please try again in a few minutes.';
      }
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Register with Email & Password
  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
    city?: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      
      // Update display name
      if (name) {
        await updateFirebaseProfile(userCredential.user, { displayName: name });
      }

      await syncUserDoc(userCredential.user, { name, phone, city });
      setIsAuthModalOpen(false);
      return { success: true, message: 'Account registered successfully' };
    } catch (error: any) {
      console.error('Firebase registration error:', error);
      let errorMsg = 'Failed to register account.';
      if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'An account with this email already exists. Please sign in instead.';
      } else if (error.code === 'auth/weak-password') {
        errorMsg = 'Password should be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
      }
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In with real Firebase Popup
  const loginWithGoogle = async (): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserDoc(result.user);
      setIsAuthModalOpen(false);
      return { success: true, message: `Signed in as ${result.user.displayName || result.user.email}` };
    } catch (error: any) {
      console.error('Firebase Google popup error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        return { success: false, message: 'Google sign-in popup was closed before completing.' };
      }
      return { success: false, message: error.message || 'Google sign-in could not be completed.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Continue as Anonymous Guest
  const continueAsGuest = async (): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const result = await signInAnonymously(auth);
      await syncUserDoc(result.user);
      setIsAuthModalOpen(false);
      return { success: true, message: 'Guest session created' };
    } catch (error: any) {
      console.error('Firebase Anonymous auth error:', error);
      return { success: false, message: 'Failed to initialize anonymous guest session.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Update Profile
  const updateProfile = async (data: Partial<AuthUser>): Promise<{ success: boolean; message?: string }> => {
    if (!auth.currentUser) return { success: false, message: 'Not authenticated with Firebase' };

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });

      if (data.name) {
        await updateFirebaseProfile(auth.currentUser, { displayName: data.name });
      }

      setUser(prev => prev ? { ...prev, ...data } : null);
      try {
        if (user) {
          localStorage.setItem('tameer_firebase_user', JSON.stringify({ ...user, ...data }));
        }
      } catch {}

      return { success: true, message: 'Profile updated in Firestore' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'Failed to save changes to database.' };
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
      setToken(null);
      try {
        localStorage.removeItem('tameer_firebase_user');
      } catch {}
    } catch (e) {
      console.error('Sign out error:', e);
    }
  };

  const openAuthModal = (tab: 'login' | 'register' | 'guest' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const role = user ? user.role : null;
  const isAuthenticated = !!user && user.role !== 'guest';
  const isAdmin = user?.role === 'admin';
  const isGuest = user?.role === 'guest';

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
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
