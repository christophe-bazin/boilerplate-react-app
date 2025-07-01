/**
 * Auth layout for authentication pages
 * Groups auth-related pages with a specific layout
 */

'use client';

import { useAuthContext } from '../../src/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { TopBar } from '../../src/components/layout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();
  
  // Show loading state while auth is being determined
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Redirect logged users to dashboard
  if (user) {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <TopBar />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
