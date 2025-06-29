/**
 * usePasswordValidation hook
 * Provides password validation logic for forms (password matching only)
 * Note: Password strength validation is handled by Supabase server-side
 */

// React imports first
import { useState, useEffect } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';

export function usePasswordValidation() {
  const { t } = useTranslation('auth');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

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

    setError(validationError);
    setIsValid(valid && (!confirmPassword || match));
    setPasswordsMatch(match);
  }, [password, confirmPassword, t]);

  // Validation function for form submission
  const validatePasswords = () => {
    if (!password) {
      return { isValid: false, error: t('errors.required') };
    }
    if (confirmPassword && password !== confirmPassword) {
      return { isValid: false, error: t('errors.passwordMismatch') };
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
    resetValidation
  };
}
