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
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
