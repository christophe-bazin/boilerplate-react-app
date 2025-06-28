import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">{t('signUp.title')}</h2>
      <input
        type="email"
        placeholder={t('signUp.email')}
        className="input input-bordered w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder={t('signUp.password')}
        className="input input-bordered w-full"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder={t('signUp.confirmPassword')}
        className="input input-bordered w-full"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? '...' : t('signUp.submit')}
      </button>
    </form>
  );
}
