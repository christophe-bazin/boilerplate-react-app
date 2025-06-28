/**
 * AppRoutes component
 * Main routing configuration for the application with authentication-based layouts
 */

// External libraries
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Local imports
import { useAuth } from './hooks/useAuth';
import { ThemeToggle } from './components/ui';
import { TopBar } from './components/layout';
import { HomePage, ProfilePage } from './components/pages';
import { SignIn, SignUp, ResetPassword } from './components/auth';

/**
 * PublicLayout component
 * Layout for public pages (homepage, sign in, sign up) with adaptive navigation
 */
function PublicLayout({ children }) {
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
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (user) return <Navigate to="/app" replace />;
  
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
 * Renders children only if user is authenticated, otherwise redirects to /signin
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/signin" replace />;
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
        
        {/* Protected app routes */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout>
                <div className="text-center py-12">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Tableau de bord
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Bienvenue dans votre espace personnel !
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Cette section sera bientôt disponible avec toutes les fonctionnalités.
                  </p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          }
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
