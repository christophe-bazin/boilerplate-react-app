/**
 * Providers component
 * Wraps the app with all necessary providers for Next.js App Router
 * This is a Client Component to handle React contexts
 */

'use client';

// React imports first
import { Suspense } from 'react';

// Local imports
import { AuthProvider } from '../../contexts/AuthContext';
import { ThemeProvider } from '../../hooks/useTheme';
import { LanguageProvider } from '../../hooks/useLanguage';
import '../../i18n';

// Loading component
function AppLoading() {
  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Suspense fallback={<AppLoading />}>
            {children}
          </Suspense>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
