/**
 * Two-Factor Authentication component for TOTP setup and verification
 * Handles MFA enrollment and verification using Supabase Auth MFA
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode';
import { supabase } from '../../lib/supabaseClient';

export default function TwoFactorAuth() {
  const { t } = useTranslation('auth');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [totpUri, setTotpUri] = useState('');
  const [factorId, setFactorId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [existingFactors, setExistingFactors] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check existing MFA factors on component mount
  useEffect(() => {
    checkMFAStatus();
  }, []);

  const checkMFAStatus = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.mfa.listFactors();
      
      if (error) throw error;
      
      const totpFactors = data.totp || [];
      console.log('🔐 MFA Factors found:', totpFactors);
      
      // Only cleanup factors that are NOT verified (incomplete enrollment)
      const incompleteFactors = totpFactors.filter(factor => 
        factor.status !== 'verified'
      );
      
      // Auto-cleanup incomplete factors only
      if (incompleteFactors.length > 0) {
        console.log('🔐 Found incomplete MFA factors, cleaning up:', incompleteFactors);
        for (const factor of incompleteFactors) {
          try {
            await supabase.auth.mfa.unenroll({ factorId: factor.id });
            console.log('🔐 Cleaned up incomplete factor:', factor.id);
          } catch (cleanupError) {
            console.error('🔐 Failed to cleanup factor:', cleanupError);
          }
        }
        // Re-fetch after cleanup
        const { data: cleanData, error: cleanError } = await supabase.auth.mfa.listFactors();
        if (!cleanError) {
          const verifiedFactors = cleanData.totp?.filter(f => f.status === 'verified') || [];
          console.log('🔐 Verified factors after cleanup:', verifiedFactors);
          setExistingFactors(verifiedFactors);
        }
      } else {
        const verifiedFactors = totpFactors.filter(f => f.status === 'verified');
        console.log('🔐 Verified factors:', verifiedFactors);
        setExistingFactors(verifiedFactors);
      }
    } catch (err) {
      console.error('🔐 MFA Status check error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove existing MFA factor
  const removeMFAFactor = async (factorId) => {
    try {
      setError('');
      const { error } = await supabase.auth.mfa.unenroll({
        factorId
      });
      
      if (error) throw error;
      
      setSuccess(t('twoFactor.removed'));
      await checkMFAStatus(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  // Enroll for MFA
  const enrollMFA = async () => {
    try {
      setIsEnrolling(true);
      setError('');
      
      console.log('🔐 Starting MFA enrollment...');
      
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });

      console.log('🔐 MFA enrollment result:', { data, error });

      if (error) throw error;

      console.log('🔐 MFA enrollment successful, generating QR code...');
      
      // Store the URI for manual entry option
      setTotpUri(data.totp.uri);
      
      // Generate QR code from URI (more compact than qr_code)
      try {
        const qrCode = await QRCode.toDataURL(data.totp.uri, {
          width: 256,
          margin: 2,
          errorCorrectionLevel: 'M'
        });
        setQrCodeUrl(qrCode);
        console.log('🔐 QR code generated successfully');
      } catch (qrError) {
        // If QR generation fails, we'll show manual URI entry
        console.error('🔐 QR Code generation failed:', qrError);
      }
      
      setFactorId(data.id);
      console.log('🔐 Factor ID set:', data.id);
      
    } catch (err) {
      console.error('🔐 MFA enrollment error:', err);
      setError(err.message);
    } finally {
      setIsEnrolling(false);
    }
  };

  // Verify MFA enrollment
  const verifyEnrollment = async () => {
    try {
      setIsVerifying(true);
      setError('');

      // For enrollment, we need to use challenge first, then verify
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId
      });

      if (challengeError) throw challengeError;

      const { data, error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: verificationCode
      });

      if (error) throw error;

      setSuccess(t('twoFactor.enrollmentSuccess'));
      setQrCodeUrl('');
      setTotpUri('');
      setVerificationCode('');
      await checkMFAStatus(); // Refresh the list
      
    } catch (err) {
      console.error('MFA verification error:', err);
      setError(err.message || 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t('twoFactor.title')}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t('twoFactor.description')}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('common.loading')}
          </p>
        </div>
      ) : existingFactors.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-green-800 dark:text-green-400">
                  {t('twoFactor.enabled')}
                </h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  {t('twoFactor.enabledDescription')}
                </p>
              </div>
              <button
                onClick={() => removeMFAFactor(existingFactors[0].id)}
                className="ml-4 px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {t('twoFactor.disable')}
              </button>
            </div>
          </div>
        </div>
      ) : !totpUri ? (
        <button
          onClick={enrollMFA}
          disabled={isEnrolling}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEnrolling ? t('twoFactor.enrolling') : t('twoFactor.setupButton')}
        </button>
      ) : (
        <div className="space-y-4">
          {qrCodeUrl ? (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {t('twoFactor.scanQR')}
              </p>
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="mx-auto border rounded-lg"
              />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {t('twoFactor.manualSetup')}
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <code className="text-xs break-all">{totpUri}</code>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {t('twoFactor.copyUri')}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('twoFactor.verificationCode')}
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="123456"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              maxLength={6}
            />
          </div>

          <button
            onClick={verifyEnrollment}
            disabled={isVerifying || verificationCode.length !== 6}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? t('twoFactor.verifying') : t('twoFactor.verifyButton')}
          </button>
        </div>
      )}
    </div>
  );
}
