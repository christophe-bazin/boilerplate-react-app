# Transcript IA - Frontend

Frontend React application for the Transcript IA transcription platform, built with Vite, Tailwind CSS, and Supabase.

## 🚀 Features

### ✅ Completed Features
- **Modern React Setup**: Built with React 18 + Vite for fast development
- **Tailwind CSS v3**: Complete styling with custom color system
- **Authentication System**: Full Supabase integration with sign-in/sign-up
- **Form Validation**: Email validation and password strength indicator
- **Internationalization**: Multi-language support (French/English) with react-i18next
- **Theme System**: Dark/light mode with automatic system detection
- **Protected Routes**: Route guards and layouts for authenticated users
- **Responsive Design**: Mobile-first approach with modern UI
- **User Preferences**: Theme persistence with localStorage + Supabase sync

### 🎨 Design System
- **Custom Color Palette**: 
  - Primary (Blue): Brand colors for main actions
  - Secondary (Gray): Neutral colors for backgrounds and text
  - Success (Green): Positive feedback and confirmations
  - Warning (Yellow): Alerts and cautions
  - Error (Red): Error states and validation feedback
- **Dark Mode Support**: Complete dark theme implementation
- **Consistent Typography**: Professional font hierarchy

## 🛠️ Tech Stack

### Core
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS v3** - Utility-first CSS framework

### Authentication & Backend
- **Supabase** - Authentication and database
- **Row Level Security** - Secure data access

### Internationalization
- **react-i18next** - Translation management
- **French/English** - Bilingual support

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SignIn.jsx      # Login form
│   ├── SignUp.jsx      # Registration form
│   ├── ThemeToggle.jsx # Theme switcher
│   └── PasswordStrength.jsx # Password validation indicator
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication state management
│   └── useTheme.js     # Theme management with persistence
├── lib/                # Services and utilities
│   ├── supabaseClient.js    # Supabase configuration
│   └── userPreferences.js   # User preferences service
├── locales/            # Translation files
│   ├── fr/auth.json    # French translations
│   └── en/auth.json    # English translations
├── migrations/         # Database migrations
│   └── 001_create_user_preferences.sql
├── AppRoutes.jsx       # Main routing configuration
└── i18n.js            # Internationalization setup
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone and install dependencies**
```bash
cd transcript-ia-front
npm install
```

2. **Environment Setup**
Create `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Database Setup**
Execute the setup script in your Supabase SQL editor:
```sql
-- Copy and paste: database/setup.sql
-- Creates user_preferences table with RLS and policies
```

4. **Start Development Server**
```bash
npm run dev
```

## 🚀 Production Deployment

For detailed production deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

Quick overview:
1. Create new Supabase project
2. Execute `database/setup.sql` 
3. Configure environment variables
4. Build and deploy to Netlify/Vercel

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Tailwind CSS
Custom color system defined in `tailwind.config.js`:
- `primary.*` - Brand colors (blue palette)
- `secondary.*` - Neutral colors (gray palette)  
- `success.*` - Success states (green palette)
- `warning.*` - Warning states (yellow palette)
- `error.*` - Error states (red palette)

### Theme System
- **localStorage**: Immediate persistence for all users
- **Supabase sync**: Cloud sync for authenticated users
- **System detection**: Automatic dark mode based on OS preference
- **Manual override**: User-selected themes take precedence

## 🔐 Authentication

### Supabase Integration
- **Sign Up**: Email verification required
- **Sign In**: Secure session management
- **Protected Routes**: Automatic redirection
- **User Preferences**: Personalized settings

### Security Features
- Row Level Security (RLS) enabled
- User-specific data access
- Secure session handling
- Input validation and sanitization

## 🌍 Internationalization

### Supported Languages
- **French (fr)** - Default language
- **English (en)** - Secondary language

### Adding Translations
1. Add keys to `src/locales/[lang]/[namespace].json`
2. Use `useTranslation` hook in components
3. Format: `t('namespace:key')`

## 🎨 UI Components

### Forms
- Modern input styling with focus states
- Validation feedback with color coding
- Responsive design for all screen sizes

### Theme Toggle
- Dropdown selector for theme preferences
- Visual indicators (sun/moon icons)
- Instant theme switching

### Password Strength
- Real-time validation feedback
- Visual progress indicator
- Multiple criteria checking

## 📱 Responsive Design

- **Mobile-first approach**
- **Flexible layouts** with CSS Grid and Flexbox
- **Touch-friendly interfaces**
- **Consistent spacing** across devices

## 🔗 Integration Ready

The frontend is designed to integrate seamlessly with the existing `transcript-pl` backend:
- Authentication state management
- API-ready service architecture
- Error handling patterns
- Loading states implementation

## 📝 Next Steps

- [ ] Connect to transcript-pl backend API
- [ ] Implement transcription features
- [ ] Add file upload functionality  
- [ ] Create user dashboard
- [ ] Add transcription history
- [ ] Implement real-time transcription updates

---

Built with ❤️ using React, Vite, Tailwind CSS, and Supabase
