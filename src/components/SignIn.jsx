import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

/**
 * SignIn component
 * Handles user authentication with validation and Supabase integration.
 */
export default function SignIn() {
  const { t } = useTranslation('auth');
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) return setError(t('errors.required'));
    if (!password) return setError(t('errors.required'));
    const { error } = await signIn({ email, password });
    if (error) setError(error.message);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-xl flex flex-col gap-6 border border-secondary-100 dark:border-secondary-700">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">{t('signIn.title')}</h2>
          <p className="text-secondary-600 dark:text-secondary-400">Connectez-vous à votre compte</p>
        </div>
        
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
          <input
            type="password"
            placeholder={t('signIn.password')}
            className="px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <div className="text-error-600 dark:text-error-400 text-sm bg-error-50 dark:bg-error-900/20 p-3 rounded-lg">{error}</div>}
        
        <button 
          type="submit" 
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
          disabled={loading}
        >
          {loading ? 'Connexion...' : t('signIn.submit')}
        </button>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <a href="#" className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline">{t('signIn.forgot')}</a>
          <Link to="/signup" className="text-secondary-600 dark:text-secondary-400">
            Pas de compte ? <span className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline">S'inscrire</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
