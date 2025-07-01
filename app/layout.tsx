/**
 * Root layout component for Next.js App Router
 * Provides global providers and HTML structure
 */

import '../src/styles/global.css';
import { Providers } from '../src/components/providers/Providers';

export const metadata = {
  title: 'SaaS Boilerplate',
  description: 'Modern SaaS boilerplate with Next.js, Supabase and Tailwind CSS',
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
