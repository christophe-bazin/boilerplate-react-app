/**
 * useTheme hook
 * Manages theme state with localStorage and system preference detection
 * Supports 'light', 'dark', and 'system' themes with automatic system detection
 */

'use client';

// React imports first
import { useEffect, useState, useCallback } from 'react';

// Local imports
import { useAuth } from './useAuth';
import { UserSettingsService } from '../lib/userSettings';
export function useTheme() {
  const { user } = useAuth(); // Get current user
  const [theme, setTheme] = useState('system'); // Current theme setting
  const [resolvedTheme, setResolvedTheme] = useState('light'); // Actual applied theme
  const [isClient, setIsClient] = useState(false); // Track if we're on the client side

  // Get system theme preference (client-side only)
  const getSystemTheme = useCallback(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Get effective theme (resolves 'system' to actual theme)
  const getEffectiveTheme = useCallback((currentTheme) => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  }, [getSystemTheme]);

  // Apply theme to document (client-side only)
  const applyTheme = useCallback((themeValue) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const effectiveTheme = getEffectiveTheme(themeValue);
    setResolvedTheme(effectiveTheme);
    
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [getEffectiveTheme]);

  // Save theme to localStorage and optionally Supabase (client-side only)
  const saveTheme = useCallback(async (newTheme) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
    
    if (user) {
      try {
        await UserSettingsService.updateTheme(user.id, newTheme);
      } catch (error) {
        console.warn('Failed to sync theme to Supabase:', error);
      }
    }
  }, [user]);

  // Load theme from localStorage or default to system (client-side only)
  const loadTheme = useCallback(() => {
    if (typeof window === 'undefined') return 'system';
    
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'system';
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      return 'system';
    }
  }, []);

  // Load theme from Supabase for authenticated users
  const loadThemeFromSupabase = useCallback(async () => {
    if (!user) return null;
    
    try {
      const settings = await UserSettingsService.getUserSettings(user.id);
      return settings?.theme || null;
    } catch (error) {
      console.warn('Failed to load theme from Supabase:', error);
      return null;
    }
  }, [user]);

  // Change theme
  const setThemeValue = useCallback(async (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    await saveTheme(newTheme);
  }, [applyTheme, saveTheme]);

  // Initialize theme on mount
  useEffect(() => {
    // Mark as client-side
    setIsClient(true);
    
    const initTheme = async () => {
      let themeToUse = loadTheme();
      
      // If user is authenticated, try to load from Supabase
      if (user) {
        const supabaseTheme = await loadThemeFromSupabase();
        if (supabaseTheme) {
          themeToUse = supabaseTheme;
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem('theme', supabaseTheme);
            } catch (error) {
              console.warn('Failed to save theme to localStorage:', error);
            }
          }
        } else {
          // No settings exist yet, create default ones
          console.log('Creating default user settings...');
          await saveTheme(themeToUse);
        }
      }
      
      setTheme(themeToUse);
      applyTheme(themeToUse);
    };

    initTheme();
  }, [user, loadTheme, loadThemeFromSupabase, applyTheme, saveTheme]);

  // Listen for system theme changes when theme is set to 'system' (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  return {
    theme, // Current theme setting ('light', 'dark', 'system')
    resolvedTheme, // Actual applied theme ('light', 'dark')
    setTheme: setThemeValue,
    isSystemDark: isClient ? getSystemTheme() === 'dark' : false,
    themes: ['light', 'dark', 'system'],
    isClient // Expose client-side status
  };
}

/**
 * ThemeProvider component
 * Simple provider component that initializes the theme system
 */
export function ThemeProvider({ children }) {
  useTheme(); // Initialize theme system
  return children;
}
