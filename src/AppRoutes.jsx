/**
 * AppRoutes component
 * Main routing configuration for the application with authentication-based layouts
 */

// External libraries
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Local imports
import { useAuthContext } from './contexts/AuthContext';
import { ThemeToggle } from './components/ui';
import { TopBar } from './components/layout';
import { HomePage, ProfilePage, DashboardPage } from './components/pages';
import { SignIn, SignUp, ResetPassword } from './components/auth';

// PublicLayout component
function PublicLayout({ children }) {
  const { user } = useAuthContext();
  
  // Redirect logged users to dashboard
  if (user) return <Navigate to="/dashboard" replace />;
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <TopBar />
      <main>{children}</main>
    </div>
  );
}

/**
 * AuthLayout component
 * Layout specifically for authentication pages (sign in/up)
 */
function AuthLayout({ children }) {
  const { user } = useAuthContext();
  
  if (user) return <Navigate to="/dashboard" replace />;
  
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

/**
 * ProtectedRoute component
 * Renders children only if user is authenticated, otherwise redirects to homepage
 */
function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  
  if (!user) return <Navigate to="/" replace />;
  return children;
}

/**
 * AppLayout component
 * Main app layout for authenticated users with TopBar
 */
function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

/**
 * AppRoutes component
 * Main routing configuration with authentication-based navigation
 */
export default function AppRoutes() {
  const { loading } = useAuthContext();

  // Show global loading screen while authentication state is being determined
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public homepage */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        
        {/* Authentication routes */}
        <Route
          path="/signin"
          element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <SignUp />
            </AuthLayout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          }
        />
        
        {/* Protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Legacy route redirect */}
        <Route
          path="/app"
          element={<Navigate to="/dashboard" replace />}
        />
        
        {/* Profile page */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Catch all - redirect to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
