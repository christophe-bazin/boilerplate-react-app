/**
 * Protected layout for authenticated pages
 * Requires user authentication to access
 */

'use client';

import { useAuthContext } from '../../src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TopBar } from '../../src/components/layout';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/sign-in');
    }
  }, [user, loading, router]);
  
  // Show loading state while auth is being determined
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Don't render content if user is not authenticated (will redirect)
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <TopBar />
      <main>{children}</main>
    </div>
  );
}
