// React imports first
import { useState, useEffect } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Local imports
import { useAuthContext } from '../../contexts/AuthContext';
import { translateAuthError } from '../../lib/errorTranslation';
import PasswordInput from '../ui/PasswordInput';
import BanWarning from './BanWarning';
import MagicLinkForm from './MagicLinkForm';
import MFAChallenge from './MFAChallenge';

/**
 * SignIn component
 * Handles user authentication with validation and Supabase integration.
 */
function SignIn() {
  console.log('🔑 SignIn component RENDER - mfaChallenge:', arguments);
  
  const { t } = useTranslation('auth');
  const { signIn, signInWithMagicLink, loading, bruteForceProtection, mfaChallenge, verifyMfa, upgradeMfaSession } = useAuthContext();
  
  console.log('🔑 SignIn component RENDER - received mfaChallenge:', mfaChallenge);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authAttempting, setAuthAttempting] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(true); // Magic link by default

  // Debug: observe mfaChallenge changes
  useEffect(() => {
    console.log('🔑 SignIn.jsx - mfaChallenge changed:', mfaChallenge);
    console.log('🔑 SignIn.jsx - mfaChallenge reference:', mfaChallenge ? JSON.stringify(mfaChallenge) : 'null');
    // Force re-render if needed
    if (mfaChallenge) {
      console.log('🔑 MFA Challenge detected, component should re-render');
    }
  }, [mfaChallenge]);

  // Check ban status when email changes
  useEffect(() => {
    if (email) {
      bruteForceProtection.checkBanStatus(email);
    } else {
      bruteForceProtection.resetBanStatus(); // Clear ban status when no email
    }
  }, [email, bruteForceProtection]);

  // Handle magic link submission
  const handleMagicLinkSubmit = async (email) => {
    return await signInWithMagicLink(email);
  };

  // Handle password form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAuthAttempting(true);
    
    if (!email) {
      setAuthAttempting(false);
      return setError(t('errors.required'));
    }
    if (!password) {
      setAuthAttempting(false);
      return setError(t('errors.required'));
    }
    
    try {
      console.log('🔑 Attempting sign in with password for:', email);
      const result = await signIn({ email, password });
      console.log('🔑 Sign in result:', result);
      if (result?.error) {
        const translatedError = translateAuthError(result.error.message, t);
        setError(translatedError);
      } else if (result?.mfaRequired) {
        console.log('🔑 MFA required - showing challenge UI');
        // MFA challenge is active, component will show challenge UI
        setError('');
      } else if (result?.mfaUpgradeRequired) {
        console.log('🔑 MFA upgrade required - user has AAL1 but needs AAL2');
        // Automatically trigger MFA upgrade
        const upgradeResult = await upgradeMfaSession(result.availableFactors[0].id);
        console.log('🔑 MFA upgrade result:', upgradeResult);
        if (upgradeResult?.error) {
          const translatedError = translateAuthError(upgradeResult.error.message, t);
          setError(translatedError);
        } else if (upgradeResult?.success) {
          console.log('🔑 MFA upgrade successful - challenge should now be active');
        }
        // The MFA challenge UI will appear automatically
      } else {
        console.log('🔑 Sign in successful');
      }
    } catch (err) {
      console.error('🔑 Sign in error:', err);
      setError(t('errors.unexpected'));
    } finally {
      setAuthAttempting(false);
    }
  };

  // Handle MFA verification
  const handleMfaSuccess = () => {
    // User is now authenticated, auth state will update automatically
    setError('');
  };

  const handleMfaCancel = () => {
    // Reset to login form
    setUseMagicLink(true);
    setError('');
  };

  // If MFA challenge is active, show MFA challenge component
  if (mfaChallenge) {
    console.log('🔑 Showing MFA Challenge component');
    return <MFAChallenge onSuccess={handleMfaSuccess} onCancel={handleMfaCancel} />;
  }

  return (
    <div className="w-full">
      {useMagicLink ? (
        <MagicLinkForm
          onSubmit={handleMagicLinkSubmit}
          mode="signin"
          loading={loading || authAttempting}
          onToggleMode={() => setUseMagicLink(false)}
        />
      ) : (
        <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-xl flex flex-col gap-6 border border-secondary-100 dark:border-secondary-700">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">{t('signIn.title')}</h2>
            <p className="text-secondary-600 dark:text-secondary-400">{t('signIn.subtitle')}</p>
          </div>
          
          {/* Authentication error (includes ban messages) */}
          {error && <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>}
          
          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder={t('signIn.email')}
              className="px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <PasswordInput
              placeholder={t('signIn.password')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          
          <button 
            type="submit" 
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            disabled={loading || authAttempting}
          >
            {(loading || authAttempting) ? t('signIn.loading') : t('signIn.submit')}
          </button>
          
          {/* Switch to magic link option */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setUseMagicLink(true)}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline text-sm"
            >
              {t('magicLink.switchToMagic')}
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
            <Link 
              to="/reset-password" 
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline"
            >
              {t('signIn.forgot')}
            </Link>
            <Link to="/signup" className="text-secondary-600 dark:text-secondary-400">
              {t('signIn.noAccount')} <span className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline">{t('signIn.signUpLink')}</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignIn;
