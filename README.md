# React + Supabase Boilerplate

A production-ready React application boilerplate with authentication, theming, and internationalization.

## ✨ Features

- 🚀 **React 18** + **Vite** - Lightning fast development
- 🎨 **Tailwind CSS** - Utility-first CSS with dark/light themes
- 🔐 **Supabase Auth** - Complete authentication system
- 🌍 **i18n** - French/English internationalization
- 🛡️ **Protected Routes** - Authentication-based routing
- 📱 **Responsive** - Mobile-first design
- 🎯 **TypeScript Ready** - Easy migration to TypeScript
- 🔧 **ESLint** - Code quality and consistency

## 🚀 Quick Start

```bash
git clone <this-repo>
cd <project-name>
chmod +x scripts/setup.sh
./scripts/setup.sh
```

## 📁 Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # External library configurations
├── locales/            # i18n translations (fr/en)
├── styles/             # Global CSS styles
├── config/             # App configuration
└── assets/             # Static assets
```

## ⚙️ Configuration

### App Settings
Edit `src/config/app.json`:
```json
{
  "app": {
    "name": "Your App Name",
    "logo": "/src/assets/logo.svg"
  }
}
```

### Translations
Update files in `src/locales/` to customize your app content and translations.

### Environment Variables
Create `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
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
