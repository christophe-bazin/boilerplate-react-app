# React + Supabase Boilerplate

A production-ready React application boilerplate with authentication, theming, and internationalization.

## ✨ Features

- 🚀 **React 18** + **Vite** - Lightning fast development
- 🎨 **Tailwind CSS** - Utility-first CSS with dark/light/system themes
- 🔐 **Supabase Auth** - Complete authentication system (sign up, sign in, logout)
- 🛡️ **Brute Force Protection** - Account lockout after failed login attempts
- 🌍 **i18n** - French/English internationalization with react-i18next
- 🛡️ **Protected Routes** - Authentication-based routing
- 📱 **Responsive** - Mobile-first design
- 🎯 **TypeScript Ready** - Easy migration to TypeScript
- 🔧 **ESLint** - Code quality and consistency

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/christophe-bazin/boilerplate-react-app
cd boilerplate-react-app
npm install
```

### 2. Configure Supabase

Create a `.env.local` file:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Setup Database

Execute `database/setup.sql` in your Supabase SQL editor.

### 4. Customize Your App

**App Name & Logo:**
Edit `src/config/app.json`:
```json
{
  "app": {
    "name": "Your App Name",
    "logo": "/src/assets/logo.svg"
  }
}
```

### 5. Start Development

```bash
npm run dev
```

Your app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # React components organized by feature
│   ├── auth/           # Authentication components (SignIn, SignUp, etc.)
│   ├── layout/         # Layout components (TopBar, UserDropdown, etc.)
│   ├── ui/             # Reusable UI components (ThemeToggle, etc.)
│   ├── pages/          # Page components (HomePage, etc.)
│   └── index.js        # Main components exports
├── hooks/              # Custom React hooks (useAuth, useTheme, useAppConfig)
├── lib/                # External library configurations (Supabase)
├── locales/            # i18n translations (fr/en)
├── styles/             # Global CSS styles
├── config/             # App configuration
└── assets/             # Static assets (logo, images)
```

## ⚙️ Configuration

### 🛡️ Brute Force Protection
- Automatic account lockout after 5 failed login attempts
- 15-minute temporary ban with countdown timer
- Client-side and server-side protection layers

### 🎨 Theme System
- **Light/Dark/System modes** - Automatically follows OS preference
- Themes persisted in localStorage and synced with user preferences

### 🌍 Internationalization
- **Languages:** French (default) and English
- **Translation files:** `src/locales/{lang}/{namespace}.json`
- Easy to extend with additional languages

## 🏗️ Customization

Update `src/config/app.json` for app name and logo, then modify translation files in `src/locales/` for content.

## 📦 Production

1. **Create Supabase Project** at [supabase.com](https://supabase.com)
2. **Execute** `database/setup.sql` in SQL editor
3. **Set Environment Variables**
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. **Build and Deploy**
   ```bash
   npm run build
   ```

**Recommended hosting:** Netlify, Vercel, or Cloudflare Pages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
