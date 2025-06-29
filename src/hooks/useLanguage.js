/**
 * useLanguage hook
 * Manages language state with localStorage and user preferences
 * Priority: User settings > localStorage > OS locale > Browser language > Default (fr)
 */

// React imports first
import { useEffect, useState, useCallback } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';

// Local imports
import { useAuth } from './useAuth';
import { UserSettingsService } from '../lib/userSettings';

const SUPPORTED_LANGUAGES = ['fr', 'en'];
const DEFAULT_LANGUAGE = 'fr';
const STORAGE_KEY = 'language';

export function useLanguage() {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Get system/OS language preference
  const getSystemLanguage = useCallback(() => {
    // Get system locale first (OS preference)
    const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    let systemLang = systemLocale.split('-')[0]; // Extract language code
    
    // If system language not supported, try browser language
    if (!SUPPORTED_LANGUAGES.includes(systemLang)) {
      const browserLang = navigator.language?.split('-')[0];
      systemLang = browserLang;
    }
    
    // Return if supported, otherwise default
    return SUPPORTED_LANGUAGES.includes(systemLang) ? systemLang : DEFAULT_LANGUAGE;
  }, []);

  // Get language from localStorage
  const getStoredLanguage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored && SUPPORTED_LANGUAGES.includes(stored) ? stored : null;
    } catch (error) {
      console.warn('Failed to read language from localStorage:', error);
      return null;
    }
  }, []);

  // Save language to localStorage
  const saveToStorage = useCallback((language) => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  }, []);

  // Load language from user settings (Supabase)
  const loadUserLanguage = useCallback(async () => {
    if (!user) return null;
    
    try {
      const settings = await UserSettingsService.getUserSettings(user.id);
      return settings?.language && SUPPORTED_LANGUAGES.includes(settings.language) 
        ? settings.language 
        : null;
    } catch (error) {
      console.warn('Failed to load language from user settings:', error);
      return null;
    }
  }, [user]);

  // Save language to user settings (Supabase)
  const saveUserLanguage = useCallback(async (language) => {
    if (!user) return;
    
    try {
      await UserSettingsService.updateLanguage(user.id, language);
    } catch (error) {
      console.warn('Failed to save language to user settings:', error);
    }
  }, [user]);

  // Determine the best language to use based on priority
  const determineBestLanguage = useCallback(async () => {
    // Priority 1: User settings (if authenticated)
    if (user) {
      const userLang = await loadUserLanguage();
      if (userLang) {
        return userLang;
      }
    }
    
    // Priority 2: localStorage (browser preference)
    const storedLang = getStoredLanguage();
    if (storedLang) {
      return storedLang;
    }
    
    // Priority 3: System/OS language
    return getSystemLanguage();
  }, [user, loadUserLanguage, getStoredLanguage, getSystemLanguage]);

  // Change language
  const changeLanguage = useCallback(async (newLanguage) => {
    if (!SUPPORTED_LANGUAGES.includes(newLanguage)) {
      console.warn(`Unsupported language: ${newLanguage}`);
      return false;
    }

    if (newLanguage === i18n.language) {
      return true; // Already set
    }

    setIsLoading(true);
    
    try {
      // Update i18next first
      await i18n.changeLanguage(newLanguage);
      
      // Save to localStorage (always save for non-authenticated users)
      saveToStorage(newLanguage);
      
      // Save to user settings if authenticated (priority over localStorage)
      if (user) {
        await saveUserLanguage(newLanguage);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to change language:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [i18n, saveToStorage, saveUserLanguage, user]);

  // Initialize language on mount and user changes
  useEffect(() => {
    const initializeLanguage = async () => {
      setIsLoading(true);
      
      try {
        const bestLanguage = await determineBestLanguage();
        
        // Only change if different from current
        if (bestLanguage !== i18n.language) {
          await i18n.changeLanguage(bestLanguage);
          saveToStorage(bestLanguage);
          
          // If user is authenticated but doesn't have settings yet, create them
          if (user) {
            const userLang = await loadUserLanguage();
            if (!userLang) {
              await saveUserLanguage(bestLanguage);
            }
          }
        }
      } catch (error) {
        console.error('Failed to initialize language:', error);
        // Fallback to default if everything fails
        if (i18n.language !== DEFAULT_LANGUAGE) {
          await i18n.changeLanguage(DEFAULT_LANGUAGE);
          saveToStorage(DEFAULT_LANGUAGE);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguage();
  }, [user, determineBestLanguage, i18n, saveToStorage, loadUserLanguage, saveUserLanguage]);

  return {
    currentLanguage: i18n.language,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isLoading,
    changeLanguage,
    isLanguageSupported: (lang) => SUPPORTED_LANGUAGES.includes(lang)
  };
}

/**
 * LanguageProvider component
 * Simple provider component that initializes the language system
 */
export function LanguageProvider({ children }) {
  useLanguage(); // Initialize language system
  return children;
}
