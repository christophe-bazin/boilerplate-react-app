/**
 * Root layout component for Next.js App Router
 * Provides global providers and HTML structure
 */

import '../src/styles/global.css';
import { Providers } from '../src/components/providers/Providers';

export const metadata = {
  title: 'Next.js SaaS Boilerplate',
  description: 'Modern SaaS boilerplate with Next.js 14, Supabase, Tailwind CSS, and i18n',
  keywords: ['Next.js', 'SaaS', 'Boilerplate', 'Supabase', 'Tailwind CSS', 'TypeScript'],
  authors: [{ name: 'SaaS Team' }],
  creator: 'Next.js SaaS Boilerplate',
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Next.js SaaS Boilerplate',
    description: 'Modern SaaS boilerplate with Next.js 14, Supabase, and Tailwind CSS',
    siteName: 'Next.js SaaS Boilerplate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS Boilerplate',
    description: 'Modern SaaS boilerplate with Next.js 14, Supabase, and Tailwind CSS',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  const stored = localStorage.getItem('theme');
                  if (stored && ['light', 'dark', 'system'].includes(stored)) {
                    if (stored === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return stored;
                  }
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                
                const theme = getTheme();
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
