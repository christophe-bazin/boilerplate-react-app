/**
 * AuthContext - Centralized authentication state management
 * Provides authentication state and methods to the entire application
 */

// Import the useAuth hook directly to avoid circular dependencies
import { useAuth } from '../hooks/useAuth.jsx';

// Re-export everything from useAuth.jsx which contains the full MFA implementation
export { AuthProvider } from '../hooks/useAuth.jsx';
export { useAuth as useAuthContext } from '../hooks/useAuth.jsx';

/**
 * withLoadingProtection HOC
 * Higher-order component that shows loading state while auth is being determined
 * Useful for components that need to wait for auth state before rendering
 */
export function withLoadingProtection(Component, LoadingComponent = null) {
  return function ProtectedComponent(props) {
    const { loading } = useAuth();
    
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
