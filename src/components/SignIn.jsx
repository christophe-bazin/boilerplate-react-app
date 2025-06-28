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
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-xl shadow-xl flex flex-col gap-6 border border-gray-100">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('signIn.title')}</h2>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>
        
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder={t('signIn.email')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder={t('signIn.password')}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
        
        <button 
          type="submit" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          disabled={loading}
        >
          {loading ? 'Connexion...' : t('signIn.submit')}
        </button>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">{t('signIn.forgot')}</a>
          <Link to="/signup" className="text-gray-600">
            Pas de compte ? <span className="text-blue-600 hover:text-blue-800 hover:underline">S'inscrire</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
