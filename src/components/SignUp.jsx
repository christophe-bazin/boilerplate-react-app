import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import PasswordStrength from './PasswordStrength';

/**
 * SignUp component
 * Handles user registration with validation and Supabase integration.
 */
export default function SignUp() {
  const { t } = useTranslation('auth');
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) return setError(t('errors.required'));
    if (!password) return setError(t('errors.required'));
    if (password.length < 6) return setError(t('errors.passwordShort'));
    if (password !== confirmPassword) return setError(t('errors.passwordMismatch'));
    const { error } = await signUp({ email, password });
    if (error) setError(error.message);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-xl shadow-xl flex flex-col gap-6 border border-gray-100">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('signUp.title')}</h2>
          <p className="text-gray-600">Créez votre compte</p>
        </div>
        
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder={t('signUp.email')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder={t('signUp.password')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <PasswordStrength password={password} />
        </div>
        
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder={t('signUp.confirmPassword')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
        
        <button 
          type="submit" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          disabled={loading}
        >
          {loading ? 'Création...' : t('signUp.submit')}
        </button>
      </form>
    </div>
  );
}
