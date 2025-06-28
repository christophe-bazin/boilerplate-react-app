// React imports first
import { useEffect, useState, useCallback } from 'react';

// Local imports
import { supabase } from '../lib/supabaseClient';

/**
 * useAuth hook
 * Manages user authentication state and provides auth methods for Supabase
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback((options) => supabase.auth.signInWithPassword(options), []);
  const signUp = useCallback((options) => supabase.auth.signUp(options), []);
  const signOut = useCallback(() => supabase.auth.signOut(), []);
  const updateEmail = useCallback((email) => supabase.auth.updateUser({ email }), []);
  const updatePassword = useCallback((password) => supabase.auth.updateUser({ password }), []);

  return { user, loading, signIn, signUp, signOut, updateEmail, updatePassword };
}

/**
 * AuthProvider component
 * Simple provider component that initializes the authentication system
 */
export function AuthProvider({ children }) {
  useAuth(); // Initialize auth system
  return children;
}
