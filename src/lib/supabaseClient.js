/**
 * Supabase client configuration
 * Creates and exports the Supabase client instance
 */

// External libraries
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation of environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓' : '✗');
  throw new Error('Supabase environment variables are not configured. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
