/**
 * PasswordInput component
 * Password input with toggle visibility feature and optional strength indicator
 */

// React imports first
import { useState } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';

function PasswordInput({ 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  className = '', 
  autoComplete = 'current-password',
  showRequirements = false,
  showErrors = false,
  ...props 
}) {
  const { t } = useTranslation('common');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password validation based on Supabase requirements
  const validatePassword = (password) => {
    if (!password) return { isValid: true, errors: [] };
    
    const errors = [];
    
    // Length check (should match your Supabase minimum password length setting)
    const minLength = 8; // Update this to match your Supabase setting
    if (password.length < minLength) {
      errors.push(t('passwordRequirements.length', { count: minLength }));
    }
    
    // Character requirements for Supabase option:
    // "Lowercase, uppercase letters, digits and symbols" (recommended)
    // 
    // IMPORTANT: This component is configured for this specific Supabase option.
    // If you use a different option in Supabase settings, update the validation below.
    
    const requirements = {
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password), 
      digit: /[0-9]/.test(password),
      symbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password)
    };
    
    if (!requirements.lowercase) {
      errors.push(t('passwordRequirements.lowercase'));
    }
    if (!requirements.uppercase) {
      errors.push(t('passwordRequirements.uppercase'));
    }
    if (!requirements.digit) {
      errors.push(t('passwordRequirements.digit'));
    }
    if (!requirements.symbol) {
      errors.push(t('passwordRequirements.symbol'));
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      requirements
    };
  };

  const validation = validatePassword(value);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={`px-4 py-3 pr-12 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400 w-full ${className}`}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 transition-colors"
          aria-label={showPassword ? t('hidePassword') : t('showPassword')}
        >
          {showPassword ? (
            // Eye slash icon (hide)
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
          ) : (
            // Eye icon (show)
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Password requirements indicator */}
      {showRequirements && value && (
        <div className="mt-2 space-y-1">
          <div className="text-xs space-y-1">
            <div className={`flex items-center gap-2 ${
              value.length >= 8 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <span className="text-xs">{value.length >= 8 ? '✓' : '✗'}</span>
              <span>{t('passwordRequirements.length', { count: 8 })}</span>
            </div>
            <div className={`flex items-center gap-2 ${
              validation.requirements.lowercase ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <span className="text-xs">{validation.requirements.lowercase ? '✓' : '✗'}</span>
              <span>{t('passwordRequirements.lowercase')}</span>
            </div>
            <div className={`flex items-center gap-2 ${
              validation.requirements.uppercase ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <span className="text-xs">{validation.requirements.uppercase ? '✓' : '✗'}</span>
              <span>{t('passwordRequirements.uppercase')}</span>
            </div>
            <div className={`flex items-center gap-2 ${
              validation.requirements.digit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <span className="text-xs">{validation.requirements.digit ? '✓' : '✗'}</span>
              <span>{t('passwordRequirements.digit')}</span>
            </div>
            <div className={`flex items-center gap-2 ${
              validation.requirements.symbol ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <span className="text-xs">{validation.requirements.symbol ? '✓' : '✗'}</span>
              <span>{t('passwordRequirements.symbol')}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Error messages on validation attempt */}
      {showErrors && validation.errors.length > 0 && (
        <div className="mt-2">
          {validation.errors.map((error, index) => (
            <p key={index} className="text-xs text-red-600 dark:text-red-400">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default PasswordInput;
