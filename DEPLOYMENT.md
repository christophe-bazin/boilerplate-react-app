# 🚀 Production Deployment Guide

## Prerequisites
- Node.js 18+
- Supabase account
- Domain name (optional)

## 📋 Deployment Checklist

### 1. **Create New Supabase Project**
```bash
# Go to https://supabase.com/dashboard
# Create new project
# Note down your project URL and anon key
```

### 2. **Setup Database**
In your Supabase SQL Editor, execute:
```sql
-- Copy and paste the entire content of: database/setup.sql
```

### 3. **Environment Configuration**
Create `.env.local` (or `.env.production`):
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. **Install Dependencies**
```bash
npm install
```

### 5. **Build for Production**
```bash
npm run build
```

### 6. **Deploy Options**

#### Option A: Netlify (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod --dir=dist
```

#### Option B: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Option C: Manual Upload
Upload the `dist/` folder to your web server.

## 🔧 Environment Variables Setup

### For Netlify:
```bash
# Set environment variables in Netlify dashboard
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### For Vercel:
```bash
# Set in Vercel dashboard or via CLI
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

## ✅ Post-Deployment Verification

1. **Test Authentication**
   - [ ] Sign up with new email
   - [ ] Sign in with existing account
   - [ ] Theme persistence works

2. **Test User Preferences**
   - [ ] Theme changes are saved
   - [ ] Preferences persist after logout/login
   - [ ] Multiple users have isolated preferences

3. **Test Responsive Design**
   - [ ] Mobile view works correctly
   - [ ] Dark/light mode functions
   - [ ] All forms are usable

## 🔄 Database Verification

Execute in Supabase SQL Editor to verify setup:
```sql
-- Check table exists
SELECT * FROM user_preferences LIMIT 1;

-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'user_preferences';

-- Check policies exist
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'user_preferences';
```

## 🚨 Troubleshooting

### Common Issues:

**Build Fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Supabase Connection Fails:**
- Verify environment variables are set correctly
- Check Supabase project URL format
- Ensure anon key has correct permissions

**RLS Errors:**
- Verify all policies are created
- Check user authentication state
- Test with different user accounts

## 📊 Monitoring

### Performance Monitoring
- Set up Vercel Analytics or Netlify Analytics
- Monitor Core Web Vitals
- Track user engagement

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for user session replay
- Supabase built-in analytics

---

**Production URL:** `https://your-domain.com`  
**Supabase Dashboard:** `https://supabase.com/dashboard/project/your-project-ref`
