/**
 * ResetPassword component
 * Handles password reset request with email sending
 */

'use client';

// React imports first
import { useState } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

// Local imports
import { useAuthContext } from '../../contexts/AuthContext';
function ResetPassword() {
  const { t } = useTranslation('auth');
  const { resetPassword } = useAuthContext();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) {
      setError(t('errors.required'));
      setLoading(false);
      return;
    }

    try {
      // Supabase always sends the reset email if the email format is valid
      await resetPassword(email);
      setSuccess(true);
    } catch {
      // Even on "error", Supabase likely sent the email for security reasons
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full">
        <div className="p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-xl text-center border border-secondary-100 dark:border-secondary-700">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
            {t('resetPassword.title')}
          </h2>
          
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            {t('resetPassword.success')}
          </p>
          
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {t('resetPassword.backToSignIn')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-xl flex flex-col gap-6 border border-secondary-100 dark:border-secondary-700">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            {t('resetPassword.title')}
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400">
            {t('resetPassword.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder={t('resetPassword.email')}
            className="px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        
        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
          disabled={loading}
        >
          {loading ? t('resetPassword.loading') : t('resetPassword.submit')}
        </button>
        
        <div className="text-center">
          <Link 
            href="/signin" 
            className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
          >
            {t('resetPassword.backToSignIn')}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
