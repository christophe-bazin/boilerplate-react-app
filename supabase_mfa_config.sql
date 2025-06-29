-- Enable AAL2 (Multi-Factor Authentication requirement)
-- This will force users with MFA factors to use them

-- Method 1: Via auth configuration (if supported)
UPDATE auth.config SET mfa_enabled = true, require_mfa = true;

-- Method 2: Via Row Level Security (RLS) policies
-- Create a policy that requires AAL2 for sensitive operations
-- This is typically done on your application tables

-- Method 3: Check current AAL in your application
-- You can check session.aal and require 'aal2' for sensitive operations

-- To check current MFA factors:
SELECT * FROM auth.mfa_factors WHERE user_id = auth.uid();

-- To check current session AAL:
SELECT auth.jwt() -> 'aal' as current_aal;
