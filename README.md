# Transcript IA - Frontend

Frontend React application for the Transcript IA transcription platform.

## Stack

- **React 18** + **Vite** - Fast development
- **Tailwind CSS** - Custom color system with dark/light themes
- **Supabase** - Authentication and user preferences
- **react-i18next** - French/English support
- **React Router** - Protected routes

## Features

- ✅ Authentication (sign-in/sign-up)
- ✅ Theme persistence (dark/light mode)
- ✅ Internationalization (FR/EN)
- ✅ Protected routes
- ✅ Responsive design

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Environment**
Create `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Database**
Execute `database/setup.sql` in your Supabase SQL editor.

4. **Run**
```bash
npm run dev
```

## Production

1. Create new Supabase project
2. Execute `database/setup.sql` 
3. Set environment variables in your hosting platform
4. Deploy with `npm run build`

Recommended: Netlify or Vercel
