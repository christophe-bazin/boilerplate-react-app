/**
 * Supabase client configuration
 * Creates and exports the Supabase client instance
 */

// External libraries
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NODE_ENV === 'production') {
  console.warn('NEXT_PUBLIC_SUPABASE_URL is not set. Please configure your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
