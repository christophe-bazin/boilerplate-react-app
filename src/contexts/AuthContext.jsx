/**
 * AuthContext - Centralized authentication state management
 * Provides authentication state and methods to the entire application
 */

'use client';

// React imports first
import { createContext, useContext } from 'react';

// Local imports
import { useAuth } from '../hooks/useAuth';

// Create the context
const AuthContext = createContext(undefined);

/**
 * AuthProvider component
 * Wraps the app and provides authentication state to all children
 */
export function AuthProvider({ children }) {
  const authState = useAuth();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuthContext hook
 * Custom hook to consume the AuthContext
 * Replaces direct useAuth() calls in components
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * withLoadingProtection HOC
 * Higher-order component that shows loading state while auth is being determined
 * Useful for components that need to wait for auth state before rendering
 */
export function withLoadingProtection(Component, LoadingComponent = null) {
  return function ProtectedComponent(props) {
    const { loading } = useAuthContext();
    
    if (loading) {
      return LoadingComponent || (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}
