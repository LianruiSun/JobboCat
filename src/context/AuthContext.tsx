import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { authService } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { full_name?: string; field?: string }) => Promise<void>;
  signInWithOAuth: (provider: 'google', shouldSignOutFirst?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    authService.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await authService.signIn(email, password);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const signUp = async (
    email: string,
    password: string,
    metadata?: { full_name?: string; field?: string }
  ) => {
    try {
      const { user } = await authService.signUp(email, password, metadata);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign up');
    }
  };

  const signInWithOAuth = async (provider: 'google', shouldSignOutFirst = false) => {
    try {
      await authService.signInWithOAuth(provider, shouldSignOutFirst);
      // OAuth redirects the user, so no need to set user here
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in with OAuth');
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithOAuth,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
