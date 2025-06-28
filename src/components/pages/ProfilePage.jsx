/**
 * ProfilePage component
 * User profile management with email, password and language settings
 */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Local imports
import { useAuth } from '../../hooks/useAuth';
import { UserSettingsService } from '../../lib/userSettings';
import { translateAuthError } from '../../lib/errorTranslation';
import PasswordInput from '../ui/PasswordInput';

function ProfilePage() {
  const { t, i18n } = useTranslation('auth');
  const { user, updateEmail, updatePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Email section
  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // Password section
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Language section
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [languageLoading, setLanguageLoading] = useState(false);

  // Initialize email
  useEffect(() => {
    if (user?.email) {
      setNewEmail(user.email);
    }
  }, [user]);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Update email
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    if (!newEmail || newEmail === user?.email) return;

    setEmailLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateEmail(newEmail);
      setMessage({ type: 'success', text: t('profile.emailUpdated') });
    } catch (error) {
      setMessage({ type: 'success', text: t('profile.emailUpdated') });
    } finally {
      setEmailLoading(false);
    }
  };

  // Update password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: t('errors.passwordShort') });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: t('errors.passwordMismatch') });
      return;
    }

    setPasswordLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await updatePassword(newPassword);
      if (error) {
        setMessage({ type: 'error', text: translateAuthError(error.message, t) });
      } else {
        setMessage({ type: 'success', text: t('profile.passwordUpdated') });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setMessage({ type: 'error', text: translateAuthError(error.message, t) });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Update language
  const handleLanguageUpdate = async (newLanguage) => {
    if (newLanguage === selectedLanguage) return;

    setLanguageLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Update language in i18n
      await i18n.changeLanguage(newLanguage);
      setSelectedLanguage(newLanguage);

      // Save to user settings if authenticated
      if (user) {
        await UserSettingsService.updateLanguage(user.id, newLanguage);
      }

      setMessage({ type: 'success', text: t('profile.languageUpdated') });
    } catch (error) {
      setMessage({ type: 'error', text: t('errors.unknownError') });
    } finally {
      setLanguageLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
            {t('errors.accessDenied')}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            {t('profile.title')}
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            {t('profile.subtitle')}
          </p>
        </div>

        {/* Global message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-8">
          {/* Email Section */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 border border-secondary-100 dark:border-secondary-700">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              {t('profile.email')}
            </h2>
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder={t('profile.email')}
                  className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={emailLoading || newEmail === user?.email}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                {emailLoading ? t('loading') : t('profile.updateEmail')}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 border border-secondary-100 dark:border-secondary-700">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              {t('profile.updatePassword')}
            </h2>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <PasswordInput
                  placeholder={t('profile.currentPassword')}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <div>
                <PasswordInput
                  placeholder={t('profile.newPassword')}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  showStrength={true}
                />
              </div>
              <div>
                <PasswordInput
                  placeholder={t('profile.confirmPassword')}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                {passwordLoading ? t('loading') : t('profile.updatePassword')}
              </button>
            </form>
          </div>

          {/* Language Section */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 border border-secondary-100 dark:border-secondary-700">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              {t('profile.language')}
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={() => handleLanguageUpdate('fr')}
                  disabled={languageLoading}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLanguage === 'fr'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-200 dark:bg-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-300 dark:hover:bg-secondary-500'
                  }`}
                >
                  Français
                </button>
                <button
                  onClick={() => handleLanguageUpdate('en')}
                  disabled={languageLoading}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLanguage === 'en'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-200 dark:bg-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-300 dark:hover:bg-secondary-500'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
