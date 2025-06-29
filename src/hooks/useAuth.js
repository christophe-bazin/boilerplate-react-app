// React imports first
import { useEffect, useState, useCallback } from 'react';

// Local imports
import { supabase } from '../lib/supabaseClient';
import { UserSettingsService } from '../lib/userSettings';
import { useBruteForceProtection } from './useBruteForceProtection';

/**
 * useAuth hook
 * Manages user authentication state and provides auth methods for Supabase
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Brute force protection
  const bruteForceProtection = useBruteForceProtection();

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

  // Enhanced signIn with brute force protection
  const signIn = useCallback(async (options) => {
    const { email } = options;
    
    // Check if user is currently banned before attempting login
    const banStatus = await bruteForceProtection.checkBanStatus(email);
    if (banStatus.banned) {
      const timeRemaining = bruteForceProtection.formatBanTime();
      return { 
        error: { 
          message: `Compte temporairement bloqué. Réessayez dans ${timeRemaining}.` 
        } 
      };
    }

    // Attempt login with Supabase - this will give us the real auth error
    const result = await supabase.auth.signInWithPassword(options);
    
    // Log the attempt for brute force tracking
    // Only log as failed if it's an actual authentication error (not network/server errors)
    const isAuthFailure = result.error && (
      result.error.message.includes('Invalid login credentials') ||
      result.error.message.includes('Email not confirmed') ||
      result.error.message.includes('Invalid email or password')
    );
    
    await bruteForceProtection.logAttempt(email, 'signin', !result.error);
    
    // If login failed due to auth reasons, check if user should now be banned
    if (isAuthFailure) {
      const newBanStatus = await bruteForceProtection.checkBanStatus(email);
      if (newBanStatus.banned) {
        const timeRemaining = bruteForceProtection.formatBanTime();
        // Override the original error with ban message
        return { 
          error: { 
            message: `Compte temporairement bloqué suite à plusieurs tentatives échouées. Réessayez dans ${timeRemaining}.` 
          } 
        };
      }
    }
    
    // Return the original Supabase result if no ban
    return result;
  }, [bruteForceProtection]);

  // Enhanced signUp with protection
  const signUp = useCallback(async (options) => {
    const { email } = options;
    
    // Attempt signup with Supabase
    const result = await supabase.auth.signUp(options);
    
    // Log the attempt
    await bruteForceProtection.logAttempt(email, 'signup', !result.error);
    
    return result;
  }, [bruteForceProtection]);

  const signOut = useCallback(() => supabase.auth.signOut(), []);
  const updateEmail = useCallback((email) => supabase.auth.updateUser({ email }), []);
  const updatePassword = useCallback((password) => supabase.auth.updateUser({ password }), []);
  
  // Enhanced resetPassword with protection
  const resetPassword = useCallback(async (email) => {
    // Attempt password reset with Supabase
    const result = await supabase.auth.resetPasswordForEmail(email);
    
    // Log the attempt
    await bruteForceProtection.logAttempt(email, 'reset_password', !result.error);
    
    return result;
  }, [bruteForceProtection]);
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

  return { 
    user, 
    loading, 
    signIn, 
    signUp, 
    signOut, 
    updateEmail, 
    updatePassword, 
    resetPassword, 
    deleteAccount,
    // Brute force protection methods
    bruteForceProtection: {
      isBanned: bruteForceProtection.isBanned,
      banUntil: bruteForceProtection.banUntil,
      attemptsCount: bruteForceProtection.attemptsCount,
      isChecking: bruteForceProtection.isChecking,
      checkBanStatus: bruteForceProtection.checkBanStatus,
      getBanTimeRemaining: bruteForceProtection.getBanTimeRemaining,
      formatBanTime: bruteForceProtection.formatBanTime,
      resetBanStatus: bruteForceProtection.resetBanStatus
    }
  };
}

/**
 * AuthProvider component
 * Simple provider component that initializes the authentication system
 */
export function AuthProvider({ children }) {
  useAuth(); // Initialize auth system
  return children;
}
