import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

/**
 * AuthLayout component
 * Renders children only if user is not authenticated, otherwise redirects to /app
 */
function AuthLayout({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (user) return <Navigate to="/app" replace />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      {children}
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Transcript IA</h1>
            <button
              onClick={signOut}
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Déconnexion
            </button>
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
                <div className="text-center text-xl">Welcome to the app!</div>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}
