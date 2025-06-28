/**
 * BanWarning component
 * Displays warning message when user is banned or has multiple failed attempts
 */

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function BanWarning({ 
  isBanned, 
  banUntil, 
  attemptsCount, 
  formatBanTime, 
  maxAttempts = 5,
  onBanExpired 
}) {
  const { t } = useTranslation('auth');
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (!isBanned) return;

    const updateTimer = () => {
      const formatted = formatBanTime();
      if (formatted) {
        setTimeRemaining(formatted);
      } else {
        // Ban has expired
        setTimeRemaining('');
        onBanExpired?.();
      }
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [isBanned, formatBanTime, onBanExpired]);

  if (isBanned) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              {t('bruteForce.accountTemporarilyBlocked')}
            </h3>
            <div className="mt-1 text-sm text-red-700 dark:text-red-300">
              <p>
                {t('bruteForce.tooManyFailedAttempts', { count: attemptsCount })}
              </p>
              {timeRemaining && (
                <p className="mt-1 font-mono">
                  {t('bruteForce.tryAgainIn')}: <span className="font-bold">{timeRemaining}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Warning for multiple attempts but not banned yet
  if (attemptsCount >= maxAttempts - 2 && attemptsCount < maxAttempts) {
    const remainingAttempts = maxAttempts - attemptsCount;
    
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              {t('bruteForce.authenticationWarning')}
            </h3>
            <div className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
              <p>
                {t('bruteForce.attemptsRemaining', { count: remainingAttempts })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
