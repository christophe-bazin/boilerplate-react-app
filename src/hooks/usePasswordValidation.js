/**
 * usePasswordValidation hook
 * Provides password validation logic for forms
 */

// React imports first
import { useState, useEffect } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';

// Local imports
import { useAppConfig } from './useAppConfig';
export function usePasswordValidation() {
  const { t } = useTranslation('auth');
  const appConfig = useAppConfig();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  // Get password requirements from config
  const minLength = appConfig.auth.password.minLength;

  // Validate passwords whenever they change
  useEffect(() => {
    let validationError = '';
    let valid = false;
    let match = false;

    // Check if password is provided
    if (!password) {
      validationError = '';
      valid = false;
    } else if (password.length < minLength) {
      validationError = t('errors.passwordShort');
      valid = false;
    } else {
      valid = true;
    }

    // Check if passwords match
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
  }, [password, confirmPassword, t, minLength]);

  // Validation function for form submission
  const validatePasswords = () => {
    if (!password) {
      return { isValid: false, error: t('errors.required') };
    }
    if (password.length < minLength) {
      return { isValid: false, error: t('errors.passwordShort') };
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
