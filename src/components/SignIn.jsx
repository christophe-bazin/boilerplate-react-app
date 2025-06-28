import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">{t('signIn.title')}</h2>
      <input
        type="email"
        placeholder={t('signIn.email')}
        className="input input-bordered w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder={t('signIn.password')}
        className="input input-bordered w-full"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? '...' : t('signIn.submit')}
      </button>
      <a href="#" className="text-xs text-blue-500 hover:underline text-right">{t('signIn.forgot')}</a>
    </form>
  );
}
