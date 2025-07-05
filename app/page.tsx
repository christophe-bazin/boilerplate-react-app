/**
 * Home page - Landing page for the application
 * Redirects authenticated users to dashboard
 */

'use client';

import { useAuthContext } from '../src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import HomePage from '../src/components/pages/HomePage';
import { PublicPageLayout } from '../src/components/layout';

export default function Home() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
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
  
  // Don't render content if user is authenticated (will redirect)
  if (user) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <PublicPageLayout>
      <HomePage />
    </PublicPageLayout>
  );
}
