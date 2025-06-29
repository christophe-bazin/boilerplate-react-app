// React imports first
import { useState, useEffect } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';

// Local imports
import { useAuth } from '../../hooks/useAuth';
import { translateAuthError } from '../../lib/errorTranslation';
import PasswordInput from '../ui/PasswordInput';
import { BanWarning } from './BanWarning';
import MagicLinkForm from './MagicLinkForm';

/**
 * SignUp component
 * Handles user registration with validation and Supabase integration.
 */
function SignUp() {
  const { t } = useTranslation('auth');
  const { signUp, signUpWithMagicLink, loading, bruteForceProtection } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(true); // Magic link by default

  // Handle magic link submission
  const handleMagicLinkSubmit = async (email) => {
    return await signUpWithMagicLink(email);
  };

  // Handle password form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) return setError(t('errors.required'));
    if (!password) return setError(t('errors.required'));
    if (password.length < 6) return setError(t('errors.passwordShort'));
    if (password !== confirmPassword) return setError(t('errors.passwordMismatch'));
    const { error } = await signUp({ email, password });
    if (error) setError(translateAuthError(error.message, t));
  };

  return (
    <div className="w-full">
      {useMagicLink ? (
        <MagicLinkForm
          onSubmit={handleMagicLinkSubmit}
          mode="signup"
          loading={loading}
          onToggleMode={() => setUseMagicLink(false)}
        />
      ) : (
        <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-xl flex flex-col gap-6 border border-secondary-100 dark:border-secondary-700">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">{t('signUp.title')}</h2>
            <p className="text-secondary-600 dark:text-secondary-400">{t('signUp.subtitle')}</p>
          </div>
          
          {error && <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>}
          
          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder={t('signUp.email')}
              className="px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <PasswordInput
              placeholder={t('signUp.password')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <PasswordInput
              placeholder={t('signUp.confirmPassword')}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          
          <button 
            type="submit" 
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            disabled={loading}
          >
            {loading ? t('signUp.loading') : t('signUp.submit')}
          </button>
          
          {/* Switch to magic link option */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setUseMagicLink(true)}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline text-sm"
            >
              {t('signUp.useMagicLink')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignUp;
