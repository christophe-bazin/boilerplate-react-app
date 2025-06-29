/**
 * App component
 * Main application component with authentication and theme providers
 */

// React imports first
import { Suspense } from 'react';

// Local imports
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import AppRoutes from './AppRoutes';

// Loading component
function AppLoading() {
  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<AppLoading />}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
