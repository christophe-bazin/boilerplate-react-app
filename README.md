# Next.js + Supabase SaaS Boilerplate

A production-ready Next.js application boilerplate with authentication, theming, and internationalization. Designed for rapid SaaS development with modular architecture.

## ✨ Features

- 🚀 **Next.js 14+** + **App Router** - Modern React framework with SSR/SSG
- 🎨 **Tailwind CSS** - Utility-first CSS with dark/light/system themes
- 🔐 **Supabase Auth** - Complete authentication system (sign up, sign in, logout)
- 🛡️ **Brute Force Protection** - Account lockout after failed login attempts
- 🌍 **i18n** - French/English internationalization with react-i18next
- 🛡️ **Protected Routes** - Authentication-based routing with App Router layouts
- 📱 **Responsive** - Mobile-first design
- 🎯 **TypeScript Ready** - Full TypeScript support with strict mode
- 🔧 **ESLint** - Code quality and consistency
- 📦 **Modular Architecture** - Prepared for core package extraction

## 🏗️ Architecture

This boilerplate is designed with a modular architecture in mind:

- **Core Components** (`src/components`): Reusable UI components
- **Business Logic** (`src/hooks`, `src/contexts`): Custom hooks and contexts
- **App Router Pages** (`app/`): Next.js app structure with route groups
- **Configuration** (`src/config`, `src/lib`): App configuration and utilities

###  Supabase Auth Configuration
**Required Auth settings in Supabase Dashboard > Authentication > Settings:**
- ✅ **Confirm email** - Enable email confirmation
- ✅ **Secure email change** - Require confirmation on both emails
- ✅ **Secure password change** - Require recent login for password changes
- ✅ **Prevent use of leaked passwords** - Enable HaveIBeenPwned integration
- **Minimum password length**: 8+ characters (recommended over default 6)
- **Password Requirements**: **"Lowercase, uppercase letters, digits and symbols"** ⚠️ **REQUIRED**
- **Email OTP Expiration**: 3600 seconds (1 hour)
- **Email OTP Length**: 6 digits

> ⚠️ **Important**: This app's password validation is specifically coded for the **"Lowercase, uppercase letters, digits and symbols"** option in Supabase. You must select this option for the client-side validation to work correctly.

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/christophe-bazin/boilerplate-react-app
cd boilerplate-react-app
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### 3. Configure Supabase

Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Setup Database & Edge Functions

**Execute SQL in your Supabase SQL editor:**
```sql
-- Execute database/setup.sql
```

**Deploy Edge Functions (Required for user deletion):**
```bash
npx supabase login
npx supabase functions deploy delete-user --project-ref your-project-ref
```

> 💡 **Note**: No local `config.toml` needed! You can deploy Edge Functions directly to your Supabase project using the `--project-ref` flag.

**Set Environment Variables for Edge Function:**
In your Supabase dashboard, go to Settings > Edge Functions and add:
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key (from Settings > API)

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

Your app will be available at `http://localhost:3000`

## 📁 Project Structure

```
app/                     # Next.js App Router structure
├── (auth)/             # Route group for authentication pages
│   ├── sign-in/        # Sign in page
│   ├── sign-up/        # Sign up page
│   └── reset-password/ # Password reset page
├── (protected)/        # Route group for protected pages
│   ├── dashboard/      # Dashboard page
│   └── profile/        # Profile page
├── layout.tsx          # Root layout with providers
└── page.tsx            # Home page

src/
├── components/          # React components organized by feature
│   ├── auth/           # Authentication components (SignIn, SignUp, etc.)
│   ├── providers/      # Next.js providers wrapper
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

### � Configuration Files

The project uses different configuration files for different purposes:

#### **Application Configuration** - `src/config/app.json`
Centralized app settings used in all environments:
```json
{
  "app": {
    "name": "Your App Name",
    "logo": "/src/assets/logo.svg"
  },
  "auth": {
    "bruteForce": {
      "maxAttempts": 5,
      "lockoutDuration": 900000
    }
  }
}
```

#### **Environment Variables** - `.env.local` (local), `.env.production` (prod)
Supabase connection settings:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### **Supabase Local Development** (optional)
For local Supabase development with `npx supabase start`, you can optionally create a `supabase/config.toml` file. Use the example configuration provided in `supabase/config.example.toml` as a starting point.

> **Note**: Local Supabase setup is only needed if you want to develop offline or test migrations locally. Most development can be done directly against your Supabase project.

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
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. **Build and Deploy**
   ```bash
   npm run build
   ```

**Recommended hosting:** Netlify, Vercel, or Cloudflare Pages

## 📚 Documentation

For detailed information about the project:

- 📖 **[Migration Guide](docs/MIGRATION.md)** - Complete migration documentation from React+Vite to Next.js
- 🚀 **[Next Steps](docs/NEXT_STEPS.md)** - Roadmap for modular architecture and SaaS platform development

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
