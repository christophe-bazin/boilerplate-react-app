// React imports first
import { useEffect, useState, useCallback } from 'react';

// Local imports
import { supabase } from '../lib/supabaseClient';
import { UserSettingsService } from '../lib/userSettings';

/**
 * useAuth hook
 * Manages user authentication state and provides auth methods for Supabase
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback((options) => supabase.auth.signInWithPassword(options), []);
  const signUp = useCallback((options) => supabase.auth.signUp(options), []);
  const signOut = useCallback(() => supabase.auth.signOut(), []);
  const updateEmail = useCallback((email) => supabase.auth.updateUser({ email }), []);
  const updatePassword = useCallback((password) => supabase.auth.updateUser({ password }), []);
  const resetPassword = useCallback((email) => supabase.auth.resetPasswordForEmail(email), []);
  const deleteAccount = useCallback(async () => {
    if (!user?.id) throw new Error('No user found');
    
    // For now, we'll sign out the user. In production, you'd want to:
    // 1. Call a server function to delete user data
    // 2. Mark the account as deleted in your database
    // 3. Handle data cleanup according to GDPR requirements
    
    // Delete user settings first
    try {
      await UserSettingsService.deleteUserSettings(user.id);
    } catch (error) {
      console.warn('Failed to delete user settings:', error);
    }
    
    // Sign out user (in production, this would be after actual account deletion)
    await supabase.auth.signOut();
    
    return { success: true };
  }, [user?.id]);

  return { user, loading, signIn, signUp, signOut, updateEmail, updatePassword, resetPassword, deleteAccount };
}

/**
 * AuthProvider component
 * Simple provider component that initializes the authentication system
 */
export function AuthProvider({ children }) {
  useAuth(); // Initialize auth system
  return children;
}
