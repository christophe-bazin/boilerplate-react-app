-- Database Setup for Transcript IA Frontend
-- Execute this in your Supabase SQL Editor for production deployment

-- Create user_settings table
-- Note: auth.users is automatically managed by Supabase
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  theme text CHECK (theme IN ('light', 'dark', 'system')) DEFAULT 'system',
  language text CHECK (language IN ('fr', 'en')) DEFAULT 'fr',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can delete own settings" ON user_settings;

-- Create RLS policies
CREATE POLICY "Users can view own settings" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own settings" ON user_settings
  FOR DELETE USING (auth.uid() = user_id);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;

-- Create trigger
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- Create login_attempts table for brute force protection
CREATE TABLE IF NOT EXISTS login_attempts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address inet NOT NULL,
  email text,
  attempt_type text CHECK (attempt_type IN ('signin', 'signup', 'reset_password')) DEFAULT 'signin',
  success boolean DEFAULT false,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '1 hour')
);

-- Enable Row Level Security for login_attempts
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_email ON login_attempts(ip_address, email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempts_expires ON login_attempts(expires_at);

-- RLS policies for login_attempts (only system can manage these)
CREATE POLICY "System can manage login attempts" ON login_attempts
  FOR ALL USING (false); -- No direct user access

-- Create function to check if IP/email is banned
CREATE OR REPLACE FUNCTION is_banned(check_ip inet, check_email text DEFAULT NULL)
RETURNS TABLE(banned boolean, ban_until timestamptz, attempts_count bigint) AS $$
DECLARE
  max_attempts integer := 5; -- Maximum failed attempts
  ban_duration interval := '15 minutes'; -- Ban duration
  time_window interval := '1 hour'; -- Time window for counting attempts
  failed_attempts bigint;
  last_attempt timestamptz;
BEGIN
  -- Count failed attempts in the time window
  SELECT COUNT(*), MAX(created_at)
  INTO failed_attempts, last_attempt
  FROM login_attempts
  WHERE ip_address = check_ip 
    AND (check_email IS NULL OR email = check_email)
    AND success = false
    AND created_at > (now() - time_window);

  -- If too many failed attempts, check if still in ban period
  IF failed_attempts >= max_attempts THEN
    IF last_attempt + ban_duration > now() THEN
      RETURN QUERY SELECT true, last_attempt + ban_duration, failed_attempts;
    ELSE
      RETURN QUERY SELECT false, NULL::timestamptz, failed_attempts;
    END IF;
  ELSE
    RETURN QUERY SELECT false, NULL::timestamptz, failed_attempts;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to log login attempt
CREATE OR REPLACE FUNCTION log_login_attempt(
  attempt_ip inet, 
  attempt_email text,
  attempt_type text DEFAULT 'signin',
  is_success boolean DEFAULT false,
  attempt_user_agent text DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO login_attempts (ip_address, email, attempt_type, success, user_agent)
  VALUES (attempt_ip, attempt_email, attempt_type, is_success, attempt_user_agent);
  
  -- Clean up old attempts
  DELETE FROM login_attempts WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions to authenticated users for the functions
GRANT EXECUTE ON FUNCTION is_banned(inet, text) TO authenticated;
GRANT EXECUTE ON FUNCTION log_login_attempt(inet, text, text, boolean, text) TO authenticated;
