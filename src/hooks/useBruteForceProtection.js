/**
 * Hook for brute force protection
 * Simple and reliable client-side protection with server fallback
 */

import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAppConfig } from './useAppConfig';

export const useBruteForceProtection = () => {
  const appConfig = useAppConfig();
  const [isBanned, setIsBanned] = useState(false);
  const [banUntil, setBanUntil] = useState(null);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // Configuration from app config
  const MAX_ATTEMPTS = appConfig.auth.bruteForce.maxAttempts;
  const BAN_DURATION_MINUTES = appConfig.auth.bruteForce.banDurationMinutes;
  const ATTEMPT_WINDOW_MINUTES = 60; // Keep at 60 minutes for attempt tracking

  // Simple client-side protection (primary method)
  const getClientProtectionStatus = useCallback((email) => {
    const key = `auth_attempts_${email}`;
    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
    const now = Date.now();
    
    // Clean old attempts (older than ATTEMPT_WINDOW_MINUTES)
    const recentAttempts = attempts.filter(
      attempt => now - attempt < (ATTEMPT_WINDOW_MINUTES * 60 * 1000)
    );
    
    // Update localStorage with cleaned attempts
    localStorage.setItem(key, JSON.stringify(recentAttempts));
    
    // Check if should be banned
    if (recentAttempts.length >= MAX_ATTEMPTS) {
      const lastAttempt = Math.max(...recentAttempts);
      const banUntil = lastAttempt + (BAN_DURATION_MINUTES * 60 * 1000);
      
      if (now < banUntil) {
        return {
          banned: true,
          banUntil: new Date(banUntil),
          attemptsCount: recentAttempts.length
        };
      } else {
        // Ban has expired, clear attempts
        localStorage.removeItem(key);
        return {
          banned: false,
          banUntil: null,
          attemptsCount: 0
        };
      }
    }
    
    return {
      banned: false,
      banUntil: null,
      attemptsCount: recentAttempts.length
    };
  }, [MAX_ATTEMPTS, BAN_DURATION_MINUTES, ATTEMPT_WINDOW_MINUTES]);

  // Log a failed attempt
  const logFailedAttempt = useCallback((email) => {
    const key = `auth_attempts_${email}`;
    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
    attempts.push(Date.now());
    localStorage.setItem(key, JSON.stringify(attempts));
  }, []);

  // Clear attempts on success
  const clearAttempts = useCallback((email) => {
    const key = `auth_attempts_${email}`;
    localStorage.removeItem(key);
  }, []);

  // Check ban status
  const checkBanStatus = useCallback(async (email) => {
    if (!email) {
      // No email, reset state
      setIsBanned(false);
      setBanUntil(null);
      setAttemptsCount(0);
      return { banned: false, banUntil: null, attemptsCount: 0 };
    }
    
    setIsChecking(true);
    
    try {
      // Primary: client-side protection
      const clientStatus = getClientProtectionStatus(email);
      
      // Try server-side as fallback (don't fail if server is down)
      let serverStatus = { banned: false, banUntil: null, attemptsCount: 0 };
      try {
        const { data, error } = await supabase
          .rpc('is_banned', { 
            check_ip: '127.0.0.1', // Simplified for now
            check_email: email 
          });
          
        if (!error && data && data[0]) {
          const result = data[0];
          serverStatus = {
            banned: result.banned,
            banUntil: result.ban_until ? new Date(result.ban_until) : null,
            attemptsCount: result.attempts_count || 0
          };
        }
      } catch (serverError) {
        console.warn('Server-side brute force check failed, using client-side only:', serverError);
      }
      
      // Use the most restrictive result
      const finalStatus = {
        banned: clientStatus.banned || serverStatus.banned,
        banUntil: clientStatus.banUntil || serverStatus.banUntil,
        attemptsCount: Math.max(clientStatus.attemptsCount, serverStatus.attemptsCount)
      };
      
      setIsBanned(finalStatus.banned);
      setBanUntil(finalStatus.banUntil);
      setAttemptsCount(finalStatus.attemptsCount);
      
      return finalStatus;
    } catch (error) {
      console.error('Error checking ban status:', error);
      return { banned: false, banUntil: null, attemptsCount: 0 };
    } finally {
      setIsChecking(false);
    }
  }, [getClientProtectionStatus]);

  // Log attempt (success or failure)
  const logAttempt = useCallback(async (email, type = 'signin', success = false) => {
    if (!email) return;
    
    try {
      if (success) {
        // Clear client-side attempts on success
        clearAttempts(email);
      } else {
        // Log failed attempt client-side
        logFailedAttempt(email);
      }
      
      // Try to log to server as well (don't fail if server is down)
      try {
        await supabase.rpc('log_login_attempt', {
          attempt_ip: '127.0.0.1', // Simplified for now
          attempt_email: email,
          attempt_type: type,
          is_success: success,
          attempt_user_agent: navigator.userAgent || 'Unknown'
        });
      } catch (serverError) {
        console.warn('Server-side attempt logging failed:', serverError);
      }
    } catch (error) {
      console.error('Error logging attempt:', error);
    }
  }, [logFailedAttempt, clearAttempts]);

  // Get time remaining for ban
  const getBanTimeRemaining = useCallback(() => {
    if (!banUntil) return 0;
    
    const now = new Date();
    const banTime = new Date(banUntil);
    const remaining = banTime.getTime() - now.getTime();
    
    return Math.max(0, Math.ceil(remaining / 1000)); // Return seconds
  }, [banUntil]);

  // Format ban time for display
  const formatBanTime = useCallback(() => {
    const seconds = getBanTimeRemaining();
    if (seconds <= 0) return null;
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  }, [getBanTimeRemaining]);

  // Get formatted ban time with fallback
  const getFormattedBanTimeWithFallback = useCallback(() => {
    const formatted = formatBanTime();
    if (formatted) return formatted;
    
    // Fallback calculation if formatBanTime returns null
    if (banUntil) {
      const now = new Date();
      const banTime = new Date(banUntil);
      const remaining = Math.max(0, Math.ceil((banTime.getTime() - now.getTime()) / 1000));
      
      if (remaining > 0) {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
      }
    }
    
    return `${BAN_DURATION_MINUTES}m 0s`; // Default fallback
  }, [formatBanTime, banUntil, BAN_DURATION_MINUTES]);

  // Reset ban status (called when ban expires)
  const resetBanStatus = useCallback(() => {
    setIsBanned(false);
    setBanUntil(null);
    setAttemptsCount(0);
  }, []);

  return {
    // State
    isBanned,
    banUntil,
    attemptsCount,
    isChecking,
    
    // Methods
    checkBanStatus,
    logAttempt,
    getBanTimeRemaining,
    formatBanTime: getFormattedBanTimeWithFallback,
    resetBanStatus
  };
};
