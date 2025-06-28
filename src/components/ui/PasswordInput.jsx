/**
 * PasswordInput component
 * Password input with toggle visibility feature and optional strength indicator
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function PasswordInput({ 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  className = '', 
  autoComplete = 'current-password',
  showStrength = false,
  ...props 
}) {
  const { t } = useTranslation('common');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password strength calculation
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '', bg: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    const levels = [
      { score: 0, label: '', color: '', bg: '' },
      { score: 1, label: t('passwordStrength.veryWeak'), color: 'text-red-600', bg: 'bg-red-200' },
      { score: 2, label: t('passwordStrength.weak'), color: 'text-yellow-600', bg: 'bg-yellow-200' },
      { score: 3, label: t('passwordStrength.medium'), color: 'text-yellow-600', bg: 'bg-yellow-300' },
      { score: 4, label: t('passwordStrength.strong'), color: 'text-primary-600', bg: 'bg-primary-200' },
      { score: 5, label: t('passwordStrength.veryStrong'), color: 'text-green-600', bg: 'bg-green-200' }
    ];
    
    return levels[score];
  };

  const strength = getPasswordStrength(value);

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
      
      {/* Password strength indicator */}
      {showStrength && value && (
        <div className="mt-2">
          <div className="flex space-x-1 mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1 w-full rounded ${
                  i <= strength.score ? strength.bg : 'bg-secondary-200 dark:bg-secondary-700'
                }`}
              />
            ))}
          </div>
          <p className={`text-xs ${strength.color}`}>{strength.label}</p>
        </div>
      )}
    </div>
  );
}

export default PasswordInput;
