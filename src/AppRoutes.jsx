// External libraries
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Local imports
import { useAuth } from './hooks/useAuth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ThemeToggle from './components/ThemeToggle';

/**
 * AuthLayout component
 * Renders children only if user is not authenticated, otherwise redirects to /app
 */
function AuthLayout({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (user) return <Navigate to="/app" replace />;
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-secondary-900 dark:to-secondary-800 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md mx-auto">
        {children}
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
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}

/**
 * MainLayout component
 * Main app layout for authenticated users
 */
function MainLayout({ children }) {
  const { signOut } = useAuth();
  
  return (
    <div className="min-h-screen bg-secondary-100 dark:bg-secondary-900">
      <header className="bg-white dark:bg-secondary-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-secondary-900 dark:text-white">Transcript IA</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={signOut}
                className="text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
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
          path="/app"
          element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                    Bienvenue dans l'application !
                  </h1>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Votre tableau de bord principal sera bientôt disponible.
                  </p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}
