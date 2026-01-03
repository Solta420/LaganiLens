import { ThemeProvider } from './Context/ThemeContext'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

// Import Pages
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Signup from './pages/Signup'; 

// Import Components
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      // Added dark:bg-[#0f172a] so the loading screen also respects dark mode
      <div className="min-h-screen bg-white dark:bg-[#0f172a] flex items-center justify-center transition-colors duration-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    // WRAPPER: ThemeProvider wraps the entire routing logic
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          
          {/* --- Public Routes --- */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/dashboard" replace /> : <Signup />} 
          />
          
          {/* --- Protected Routes --- */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;