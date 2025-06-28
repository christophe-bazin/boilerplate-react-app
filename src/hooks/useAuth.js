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

  return { user, loading, signIn, signUp, signOut };
}
