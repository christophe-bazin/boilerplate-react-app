/**
 * MagicLinkForm component
 * Handles magic link authentication (sign in or sign up) with email-only input
 */

// React imports first
import { useState } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';

// Local imports
import { translateAuthError } from '../../lib/errorTranslation';

function MagicLinkForm({ onSubmit, mode = 'signin', loading, onToggleMode }) {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSubmitting(true);
    
    if (!email) {
      setSubmitting(false);
      return setError(t('errors.required'));
    }
    
    try {
      const { error } = await onSubmit(email);
      if (error) {
        const translatedError = translateAuthError(error.message, t);
        setError(translatedError);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(t('errors.unexpected'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setSuccess(false);
    setError('');
  };

  if (success) {
    return (
      <div className="w-full p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-xl border border-secondary-100 dark:border-secondary-700">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
            {t('magicLink.emailSent')}
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            {t('magicLink.success')}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSendAnother}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
            >
              {t('magicLink.sendAnother')}
            </button>
            <button
              onClick={onToggleMode}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline text-sm"
            >
              {t('magicLink.backToPassword')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-xl flex flex-col gap-6 border border-secondary-100 dark:border-secondary-700">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            {t('magicLink.title')}
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400">
            {mode === 'signup' ? t('signUp.magicLinkSubtitle') : t('magicLink.subtitle')}
          </p>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder={t('magicLink.email')}
            className="px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
          disabled={loading || submitting}
        >
          {(loading || submitting) ? t('magicLink.loading') : t('magicLink.submit')}
        </button>
        
        <div className="text-center">
          <button
            type="button"
            onClick={onToggleMode}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline text-sm"
          >
            {t('magicLink.backToPassword')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MagicLinkForm;
