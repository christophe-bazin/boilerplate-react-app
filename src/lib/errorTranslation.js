/**
 * Error translation utility
 * Maps Supabase error messages to translation keys
 */

/**
 * Translates Supabase error messages to localized text
 * @param {string} errorMessage - The error message from Supabase
 * @param {function} t - The translation function from react-i18next
 * @returns {string} - The translated error message
 */
export function translateAuthError(errorMessage, t) {
  // Don't translate custom brute force messages
  if (errorMessage?.includes('Compte temporairement bloqué')) {
    return errorMessage;
  }

  // Common Supabase error patterns
  const errorMappings = {
    'Invalid login credentials': 'errors.invalidCredentials',
    'Email not confirmed': 'errors.emailNotConfirmed', 
    'User not found': 'errors.userNotFound',
    'Invalid email': 'errors.invalidEmail',
    'Password should be at least': 'errors.passwordShort',
    'Password should contain at least': 'errors.weakPassword',
    'User already registered': 'errors.emailAlreadyExists',
    'Email address not authorized': 'errors.emailNotAuthorized',
    'Signup is disabled': 'errors.signupDisabled',
    'Email rate limit exceeded': 'errors.emailRateLimit',
    'Password is too weak': 'errors.weakPassword',
    'Invalid password': 'errors.wrongPassword',
    'Network request failed': 'errors.networkError',
    'fetch error': 'errors.networkError'
  };

  // Find matching error pattern
  for (const [pattern, translationKey] of Object.entries(errorMappings)) {
    if (errorMessage?.toLowerCase().includes(pattern.toLowerCase())) {
      return t(translationKey);
    }
  }

  // If no specific translation found, return generic error
  return t('errors.unknownError');
}
