import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabaseClient';

/**
 * useTheme hook
 * Manages theme state with localStorage and Supabase sync for authenticated users
 */
export function useTheme() {
  const { user } = useAuth();
  const [theme, setTheme] = useState(null);
  const [resolvedTheme, setResolvedTheme] = useState('light');

  // Get system preference
  const getSystemTheme = useCallback(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((themeValue) => {
    setResolvedTheme(themeValue);
    
    if (themeValue === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Load theme from localStorage or default to system
  const loadTheme = useCallback(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || getSystemTheme();
  }, [getSystemTheme]);

  // Save theme to localStorage and optionally Supabase
  const saveTheme = useCallback(async (newTheme) => {
    localStorage.setItem('theme', newTheme);
    
    if (user) {
      try {
        await supabase
          .from('user_preferences')
          .upsert({ 
            user_id: user.id, 
            theme: newTheme 
          }, { 
            onConflict: 'user_id' 
          });
      } catch (error) {
        console.warn('Failed to sync theme to Supabase:', error);
      }
    }
  }, [user]);

  // Load theme from Supabase for authenticated users
  const loadThemeFromSupabase = useCallback(async () => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('theme')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') { // Not found error
        console.warn('Failed to load theme from Supabase:', error);
        return null;
      }
      
      return data?.theme || null;
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
    const initTheme = async () => {
      let themeToUse = loadTheme();
      
      // If user is authenticated, try to load from Supabase
      if (user) {
        const supabaseTheme = await loadThemeFromSupabase();
        if (supabaseTheme) {
          themeToUse = supabaseTheme;
          localStorage.setItem('theme', supabaseTheme);
        }
      }
      
      setTheme(themeToUse);
      applyTheme(themeToUse);
    };

    initTheme();
  }, [user, loadTheme, loadThemeFromSupabase, applyTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeValue,
    isSystemDark: getSystemTheme() === 'dark'
  };
}
