/**
 * SignUp component
 * User registration form with email/password validation and magic link option
 */

'use client';

// React imports first
import { useState } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

// Local imports
import { useAuthContext } from '../../contexts/AuthContext';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { translateAuthError } from '../../lib/errorTranslation';
import PasswordInput from '../ui/PasswordInput';
import MagicLinkForm from './MagicLinkForm';

/**
 * SignUp component
 * Handles user registration with magic link priority and password fallback
 */
function SignUp() {
  const { t } = useTranslation('auth');
  const { signUp, signUpWithMagicLink, loading } = useAuthContext();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(true); // Magic link by default
  
  // Use password validation hook
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    validatePasswords,
    resetValidation,
    handleSupabaseError
  } = usePasswordValidation();

  // Handle magic link submission
  const handleMagicLinkSubmit = async (email) => {
    return await signUpWithMagicLink(email);
  };

  // Handle password form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSubmitting(true);
    
    if (!email) {
      setSubmitting(false);
      return setError(t('errors.required'));
    }
    
    // Use password validation hook
    const validation = validatePasswords();
    if (!validation.isValid) {
      setSubmitting(false);
      return setError(validation.error);
    }
    
    try {
      const { error } = await signUp({ email, password });
      if (error) {
        // Handle password-related errors with the hook
        if (error.message.toLowerCase().includes('password') || 
            error.code === 'weak_password' ||
            error.code === 'password_requirements_not_met') {
          handleSupabaseError(error);
        } else {
          const translatedError = translateAuthError(error.message, t);
          setError(translatedError);
        }
      } else {
        setSuccess(true);
        // Clear form
        setEmail('');
        resetValidation();
      }
    } catch {
      setError(t('errors.unexpected'));
    } finally {
      setSubmitting(false);
    }
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
      ) : success ? (
        // Success state for password signup
        <div className="w-full p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-xl border border-secondary-100 dark:border-secondary-700">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
              {t('signUp.successTitle')}
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              {t('signUp.successMessage')}
            </p>
            <Link
              href="/sign-in"
              className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
            >
              {t('signUp.goToSignIn')}
            </Link>
          </div>
        </div>
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
              showRequirements={true}
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
            disabled={submitting}
          >
            {submitting ? t('signUp.loading') : t('signUp.submit')}
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
          
          <div className="text-center text-sm">
            <Link href="/sign-in" className="text-secondary-600 dark:text-secondary-400">
              {t('signUp.hasAccount')} <span className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline">{t('signUp.signInLink')}</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignUp;
