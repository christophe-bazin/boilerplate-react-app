/**
 * usePasswordValidation hook
 * Provides password validation logic for forms (password matching only)
 * Note: Password strength validation is handled by Supabase server-side
 * The hook reacts to Supabase validation errors rather than duplicating rules
 */

// React imports first
import { useState, useEffect } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';

// Local imports
import { translateAuthError } from '../lib/errorTranslation';

export function usePasswordValidation() {
  const { t } = useTranslation('auth');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [supabaseError, setSupabaseError] = useState('');

  // Validate passwords whenever they change
  useEffect(() => {
    let validationError = '';
    let valid = false;
    let match = false;

    // Check if password is provided
    if (!password) {
      validationError = '';
      valid = false;
    } else {
      // Password is provided, assume valid until Supabase says otherwise
      valid = true;
    }

    // Check if passwords match (only if confirmation is required)
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        match = true;
      } else {
        validationError = t('errors.passwordMismatch');
        valid = false;
      }
    }

    // Clear Supabase error when password changes (user is fixing it)
    if (supabaseError && password) {
      setSupabaseError('');
    }

    setError(validationError || supabaseError);
    setIsValid(valid && (!confirmPassword || match) && !supabaseError);
    setPasswordsMatch(match);
  }, [password, confirmPassword, supabaseError, t]);

  // Function to handle Supabase validation errors
  const handleSupabaseError = (error) => {
    if (error?.message) {
      // Translate the Supabase error before setting it
      const translatedError = translateAuthError(error.message, t);
      setSupabaseError(translatedError);
    }
  };

  // Clear Supabase errors
  const clearSupabaseError = () => {
    setSupabaseError('');
  };

  // Validation function for form submission
  const validatePasswords = () => {
    if (!password) {
      return { isValid: false, error: t('errors.required') };
    }
    if (confirmPassword && password !== confirmPassword) {
      return { isValid: false, error: t('errors.passwordMismatch') };
    }
    if (supabaseError) {
      return { isValid: false, error: supabaseError };
    }
    return { isValid: true, error: '' };
  };

  // Reset function
  const resetValidation = () => {
    setPassword('');
    setConfirmPassword('');
    setError('');
    setIsValid(false);
    setPasswordsMatch(false);
    setSupabaseError('');
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    isValid,
    passwordsMatch,
    validatePasswords,
    resetValidation,
    handleSupabaseError,
    clearSupabaseError,
    supabaseError
  };
}
