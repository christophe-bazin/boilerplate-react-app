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

**Content & Translations:**
Update files in `src/locales/`:
- `src/locales/en/common.json` - English translations
- `src/locales/fr/common.json` - French translations
- `src/locales/en/auth.json` - English auth texts
- `src/locales/fr/auth.json` - French auth texts

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

## ⚙️ Advanced Configuration

### 🛡️ Security Features

**Brute Force Protection:**
- Automatic account lockout after 5 failed login attempts
- 15-minute temporary ban with countdown timer
- Client-side and server-side protection layers
- IP-based and email-based tracking
- Visual warnings before account lockout

**Password Security:**
- bcrypt hashing with random salt
- Password strength indicator
- Protection against leaked passwords (HaveIBeenPwned integration)
- Configurable password requirements

**Authentication Security:**
- JWT-based sessions with automatic refresh
- Row Level Security (RLS) on database
- Rate limiting on auth endpoints
- Optional CAPTCHA protection

### Theme System
The app includes a complete theme system with:
- **Light mode** - Clean white interface
- **Dark mode** - Dark interface for low-light environments  
- **System mode** - Automatically follows OS preference

Themes are persisted in localStorage and synced with Supabase user preferences.

### Internationalization (i18n)
Built-in support for French and English:
- **Default language:** French (`fr`)
- **Fallback language:** English (`en`)
- **Translation files:** `src/locales/{lang}/{namespace}.json`

Add new languages by:
1. Creating new folders in `src/locales/`
2. Adding translation files
3. Updating `src/i18n.js`

### Authentication Flow
Complete authentication system with:
- **Sign Up** - Email/password registration with strength validation
- **Sign In** - Email/password login with brute force protection
- **Password Reset** - Secure email-based password recovery
- **Profile Management** - Email, password, language, account deletion
- **Protected Routes** - Automatic redirects
- **User Session** - Persistent login state
- **Brute Force Protection** - Account lockout after failed attempts

## 🏗️ Building Your App

### Customizing Content
1. **App Name:** Update `src/config/app.json`
2. **Logo:** Replace `src/assets/logo.svg`
3. **Homepage:** Edit `src/locales/*/common.json`
4. **Features:** Modify `src/components/HomePage.jsx`

### Adding New Pages
1. Create component in `src/components/`
2. Add route in `src/AppRoutes.jsx`
3. Add translations in `src/locales/`

### Styling
Uses Tailwind CSS with:
- **Responsive design** - Mobile-first approach
- **Utility classes** - No custom CSS needed
- **Theme support** - Dark/light mode ready

## 📦 Production

### Deploy to Production

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Execute `database/setup.sql` in SQL editor

2. **Set Environment Variables**
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Build and Deploy**
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
