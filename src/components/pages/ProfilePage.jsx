/**
 * ProfilePage component
 * User profile management with email, password and language settings
 */

// React imports first
import { useState, useEffect } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';

// Local imports
import { useAuth } from '../../hooks/useAuth';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { UserSettingsService } from '../../lib/userSettings';
import { translateAuthError } from '../../lib/errorTranslation';
import PasswordInput from '../ui/PasswordInput';

function ProfilePage() {
  const { t, i18n } = useTranslation('profile');
  const { t: tAuth } = useTranslation('auth');
  const { user, updateEmail, updatePassword, deleteAccount, userHasPassword, setInitialPassword } = useAuth();
  const [message, setMessage] = useState({ type: '', text: '' });

  // Email section
  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // Password section
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const hasPassword = userHasPassword();
  
  // Use password validation hook for new password
  const {
    password: newPassword,
    setPassword: setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isValid: passwordsValid,
    passwordsMatch,
    handleSupabaseError,
    clearSupabaseError
  } = usePasswordValidation();

  // Language section
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [languageLoading, setLanguageLoading] = useState(false);

  // Delete account section
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

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
      setMessage({ type: 'success', text: t('emailUpdated') });
    } catch {
      setMessage({ type: 'success', text: t('emailUpdated') });
    } finally {
      setEmailLoading(false);
    }
  };

  // Update password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    // For users without password (magic link only), currentPassword is not required
    if (hasPassword && !currentPassword) {
      setMessage({ type: 'error', text: tAuth('errors.required') });
      return;
    }
    
    if (!newPassword) {
      setMessage({ type: 'error', text: tAuth('errors.required') });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: tAuth('errors.passwordMismatch') });
      return;
    }

    setPasswordLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let result;
      if (hasPassword) {
        // User has existing password, use updatePassword
        result = await updatePassword(newPassword);
      } else {
        // User has no password (magic link only), set initial password
        result = await setInitialPassword(newPassword);
      }
      
      if (result.error) {
        // Handle password-related errors with the hook
        if (result.error.message.toLowerCase().includes('password') || 
            result.error.code === 'weak_password' ||
            result.error.code === 'password_requirements_not_met') {
          handleSupabaseError(result.error);
        } else {
          setMessage({ type: 'error', text: translateAuthError(result.error.message, t) });
        }
      } else {
        const successMessage = hasPassword ? t('passwordUpdated') : t('passwordSet');
        setMessage({ type: 'success', text: successMessage });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        clearSupabaseError(); // Clear any previous password errors
      }
    } catch (error) {
      // Handle password-related errors with the hook
      if (error.message.toLowerCase().includes('password') || 
          error.code === 'weak_password' ||
          error.code === 'password_requirements_not_met') {
        handleSupabaseError(error);
      } else {
        setMessage({ type: 'error', text: translateAuthError(error.message, t) });
      }
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

      setMessage({ type: 'success', text: t('languageUpdated') });
    } catch {
      setMessage({ type: 'error', text: tAuth('errors.unknownError') });
    } finally {
      setLanguageLoading(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    // Check if confirmation text matches
    const requiredText = t('confirmDeleteKeyword');
    if (deleteConfirmation !== requiredText) {
      setMessage({ type: 'error', text: t('confirmDeleteError') });
      return;
    }

    setDeleteLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await deleteAccount();
      setMessage({ type: 'success', text: t('accountDeleted') });
      // The user will be automatically redirected due to auth state change
    } catch {
      setMessage({ type: 'error', text: tAuth('errors.unknownError') });
      setShowDeleteModal(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Reset delete confirmation when modal closes
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmation('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
            {tAuth('errors.accessDenied')}
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
            {t('title')}
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            {t('subtitle')}
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
              {t('email')}
            </h2>
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder={t('email')}
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
                {emailLoading ? t('loading') : t('updateEmail')}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 border border-secondary-100 dark:border-secondary-700">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              {hasPassword ? t('updatePassword') : t('setPassword')}
            </h2>
            
            {!hasPassword && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  {t('noPasswordInfo')}
                </p>
              </div>
            )}
            
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              {hasPassword && (
                <div>
                  <PasswordInput
                    placeholder={t('currentPassword')}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              )}
              <div>
                <PasswordInput
                  placeholder={t('newPassword')}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  showRequirements={true}
                />
              </div>
              <div>
                <PasswordInput
                  placeholder={t('confirmPassword')}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                {/* Password match indicator */}
                {confirmPassword && (
                  <div className={`mt-2 text-sm ${
                    passwordsMatch 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {passwordsMatch 
                      ? '✓ ' + t('passwordsMatch')
                      : '✗ ' + tAuth('errors.passwordMismatch')
                    }
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={
                  passwordLoading || 
                  (hasPassword && !currentPassword) || 
                  !passwordsValid
                }
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                {passwordLoading ? t('loading') : (hasPassword ? t('updatePassword') : t('setPassword'))}
              </button>
            </form>
          </div>

          {/* Language Section */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 border border-secondary-100 dark:border-secondary-700">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              {t('language')}
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

          {/* Delete Account Section */}
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 border border-red-200 dark:border-red-800">
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
              {t('deleteAccount')}
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  {t('deleteAccountWarning')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
            >
              {t('deleteAccount')}
            </button>
          </div>
        </div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={handleCloseDeleteModal}
            ></div>
            
            {/* Modal */}
            <div className="relative bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6 max-w-md w-full mx-4 border border-secondary-200 dark:border-secondary-700">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                {t('confirmDeleteTitle')}
              </h3>
              <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                {t('confirmDeleteMessage')}
              </p>
              
              {/* Confirmation input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  {t('confirmDeleteInput')}
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder={t('confirmDeletePlaceholder')}
                  className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400"
                  disabled={deleteLoading}
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCloseDeleteModal}
                  disabled={deleteLoading}
                  className="px-4 py-2 bg-secondary-200 dark:bg-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-300 dark:hover:bg-secondary-500 disabled:opacity-50 rounded-lg transition-colors"
                >
                  {t('cancelDelete')}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading || deleteConfirmation !== t('confirmDeleteKeyword')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  {deleteLoading ? t('loading') : t('confirmDelete')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
