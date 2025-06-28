/**
 * Hook for brute force protection
 * Manages login attempt tracking and IP/email banning
 */

import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useBruteForceProtection = () => {
  const [isBanned, setIsBanned] = useState(false);
  const [banUntil, setBanUntil] = useState(null);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // Get user's IP address (simplified - in production use a proper service)
  const getUserIP = async () => {
    try {
      // For development, we'll use a placeholder
      // In production, you'd want to get the real IP from your server
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('Could not get IP address:', error);
      return '127.0.0.1'; // Fallback for development
    }
  };

  // Get user agent
  const getUserAgent = () => {
    return navigator.userAgent || 'Unknown';
  };

  // Check if user is banned
  const checkBanStatus = useCallback(async (email = null) => {
    setIsChecking(true);
    try {
      const ip = await getUserIP();
      
      const { data, error } = await supabase
        .rpc('is_banned', { 
          check_ip: ip,
          check_email: email 
        });

      if (error) {
        console.error('Error checking ban status:', error);
        return { banned: false, banUntil: null, attemptsCount: 0 };
      }

      const result = data[0] || { banned: false, ban_until: null, attempts_count: 0 };
      
      setIsBanned(result.banned);
      setBanUntil(result.ban_until);
      setAttemptsCount(result.attempts_count);

      return {
        banned: result.banned,
        banUntil: result.ban_until,
        attemptsCount: result.attempts_count
      };
    } catch (error) {
      console.error('Error in checkBanStatus:', error);
      return { banned: false, banUntil: null, attemptsCount: 0 };
    } finally {
      setIsChecking(false);
    }
  }, []);

  // Log a login attempt
  const logAttempt = useCallback(async (email, type = 'signin', success = false) => {
    try {
      const ip = await getUserIP();
      const userAgent = getUserAgent();

      const { error } = await supabase
        .rpc('log_login_attempt', {
          attempt_ip: ip,
          attempt_email: email,
          attempt_type: type,
          is_success: success,
          attempt_user_agent: userAgent
        });

      if (error) {
        console.error('Error logging attempt:', error);
      }

      // After logging, update ban status - but don't create circular dependency
      const { data, error: banError } = await supabase
        .rpc('is_banned', { 
          check_ip: ip,
          check_email: email 
        });

      if (!banError && data && data[0]) {
        const result = data[0];
        setIsBanned(result.banned);
        setBanUntil(result.ban_until);
        setAttemptsCount(result.attempts_count);
      }
    } catch (error) {
      console.error('Error in logAttempt:', error);
    }
  }, []);

  // Client-side protection (additional layer)
  const getClientSideBan = useCallback((email) => {
    const key = `login_attempts_${email || 'anonymous'}`;
    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
    const now = Date.now();
    
    // Clean old attempts (older than 1 hour)
    const recentAttempts = attempts.filter(
      attempt => now - attempt.timestamp < 60 * 60 * 1000
    );
    
    // Update localStorage
    localStorage.setItem(key, JSON.stringify(recentAttempts));
    
    // Check if banned (5 attempts in 1 hour = 15 min ban)
    if (recentAttempts.length >= 5) {
      const lastAttempt = Math.max(...recentAttempts.map(a => a.timestamp));
      const banUntil = lastAttempt + (15 * 60 * 1000); // 15 minutes
      
      if (now < banUntil) {
        return {
          banned: true,
          banUntil: new Date(banUntil),
          attemptsCount: recentAttempts.length
        };
      }
    }
    
    return {
      banned: false,
      banUntil: null,
      attemptsCount: recentAttempts.length
    };
  }, []);

  // Log client-side attempt
  const logClientSideAttempt = useCallback((email, success = false) => {
    if (success) {
      // Clear attempts on success
      const key = `login_attempts_${email || 'anonymous'}`;
      localStorage.removeItem(key);
      return;
    }

    const key = `login_attempts_${email || 'anonymous'}`;
    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
    
    attempts.push({
      timestamp: Date.now(),
      success: false
    });
    
    localStorage.setItem(key, JSON.stringify(attempts));
  }, []);

  // Combined check (server + client)
  const checkFullProtection = useCallback(async (email = null) => {
    const [serverStatus, clientStatus] = await Promise.all([
      checkBanStatus(email),
      Promise.resolve(getClientSideBan(email))
    ]);

    // If either server or client says banned, user is banned
    const banned = serverStatus.banned || clientStatus.banned;
    const banUntil = serverStatus.banUntil || clientStatus.banUntil;
    const attemptsCount = Math.max(serverStatus.attemptsCount, clientStatus.attemptsCount);

    setIsBanned(banned);
    setBanUntil(banUntil);
    setAttemptsCount(attemptsCount);

    return { banned, banUntil, attemptsCount };
  }, [checkBanStatus, getClientSideBan]);

  // Combined logging (server + client)
  const logFullAttempt = useCallback(async (email, type = 'signin', success = false) => {
    await Promise.all([
      logAttempt(email, type, success),
      Promise.resolve(logClientSideAttempt(email, success))
    ]);
  }, [logAttempt, logClientSideAttempt]);

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

  return {
    // State
    isBanned,
    banUntil,
    attemptsCount,
    isChecking,
    
    // Methods
    checkBanStatus: checkFullProtection,
    logAttempt: logFullAttempt,
    getBanTimeRemaining,
    formatBanTime,
    
    // Reset ban status (for when ban expires)
    resetBanStatus: () => {
      setIsBanned(false);
      setBanUntil(null);
      setAttemptsCount(0);
    }
  };
};
