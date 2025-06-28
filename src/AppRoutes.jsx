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
  return <div className="min-h-screen flex items-center justify-center bg-gray-50">{children}</div>;
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
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 mb-6">Transcript IA</header>
      <main className="container mx-auto px-4">{children}</main>
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
