/**
 * Protected layout for authenticated pages
 * Requires user authentication to access
 */

'use client';

import { useAuthContext } from '../../src/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { TopBar } from '../../src/components/layout';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();
  
  // Show loading state while auth is being determined
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Redirect non-authenticated users to sign in
  if (!user) {
    redirect('/sign-in');
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <TopBar />
      <main>{children}</main>
    </div>
  );
}
