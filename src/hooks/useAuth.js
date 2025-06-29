// React imports first
import { useEffect, useState, useCallback } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('auth');
  
  // Brute force protection
  const bruteForceProtection = useBruteForceProtection();

  useEffect(() => {
    // Get initial session synchronously if possible
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    
    getInitialSession();
    
    // Listen for auth state changes
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
          message: `${t('bruteForce.accountTemporarilyBlocked')}. ${t('bruteForce.tryAgainIn')} ${timeRemaining}.` 
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
            message: `${t('bruteForce.accountTemporarilyBlocked')} ${t('bruteForce.tooManyFailedAttempts', { count: bruteForceProtection.attemptsCount })}. ${t('bruteForce.tryAgainIn')} ${timeRemaining}.` 
          } 
        };
      }
    }
    
    // Return the original Supabase result if no ban
    return result;
  }, [bruteForceProtection, t]);

  // Enhanced signUp with protection
  const signUp = useCallback(async (options) => {
    const { email } = options;
    
    // Add metadata to mark user as having password
    const enhancedOptions = {
      ...options,
      options: {
        data: {
          has_password: true
        }
      }
    };
    
    // Attempt signup with Supabase
    const result = await supabase.auth.signUp(enhancedOptions);
    
    // Log the attempt
    await bruteForceProtection.logAttempt(email, 'signup', !result.error);
    
    return result;
  }, [bruteForceProtection]);

  const signOut = useCallback(() => supabase.auth.signOut(), []);
  
  // Magic Link authentication functions
  const signInWithMagicLink = useCallback(async (email) => {
    // For magic link, we always allow user creation for security and UX reasons:
    // 1. Security: Don't reveal if user exists or not
    // 2. UX: Magic link should work seamlessly regardless of account existence
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true, // Always allow user creation
        data: {
          has_password: false // Mark as magic link user
        }
      }
    });
    
    return { data, error };
  }, []);

  const signUpWithMagicLink = useCallback(async (email) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true, // Allow new user creation for sign up
        data: {
          has_password: false // Mark user as magic link only
        }
      }
    });
    return { data, error };
  }, []);
  
  const updateEmail = useCallback((email) => supabase.auth.updateUser({ email }), []);
  const updatePassword = useCallback((password) => supabase.auth.updateUser({ password }), []);
  
  // Check if user has a password (vs magic link only)
  const userHasPassword = useCallback(() => {
    if (!user) return false;
    // Check if user has password based on app_metadata or auth providers
    // If user only has email provider and has_password is false, they don't have password
    const hasPasswordFlag = user.app_metadata?.has_password;
    if (hasPasswordFlag === false) return false;
    if (hasPasswordFlag === true) return true;
    
    // Fallback: check auth providers - if only email and no password set during signup
    const authProviders = user.app_metadata?.providers || [];
    return authProviders.includes('email') && user.user_metadata?.has_password !== false;
  }, [user]);

  // Set initial password for magic link users
  const setInitialPassword = useCallback(async (newPassword) => {
    if (!user) return { error: { message: 'No user found' } };
    
    try {
      // Update password and mark user as having password
      const { data, error } = await supabase.auth.updateUser({ 
        password: newPassword,
        data: { has_password: true }
      });
      
      return { data, error };
    } catch (err) {
      return { error: { message: err.message } };
    }
  }, [user]);

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
    
    try {
      // Call the Edge Function to delete the user
      const { error } = await supabase.functions.invoke('delete-user', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to delete account');
      }

      // Sign out the user session locally after successful deletion
      await supabase.auth.signOut();
      
      return { success: true };
    } catch (error) {
      console.error('Failed to delete account:', error);
      // Don't fall back to sign out - let the error bubble up
      throw new Error('Unable to delete user account. Please contact support or check Edge Function deployment.');
    }
  }, [user?.id]);

  return { 
    user, 
    loading, 
    signIn, 
    signUp, 
    signOut, 
    signInWithMagicLink,
    signUpWithMagicLink,
    updateEmail, 
    updatePassword,
    userHasPassword,
    setInitialPassword,
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
      resetBanStatus: bruteForceProtection.resetBanStatus,
      clearAllAttempts: bruteForceProtection.clearAllAttempts // Development helper
    }
  };
}
