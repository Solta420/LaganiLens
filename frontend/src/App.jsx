import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

// 1. Import Pages from the correct 'pages' folder
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Signup from './pages/Signup'; // Ensure you have created this file, or comment it out

// 2. Import Components from the correct 'components' folder
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- Public Routes (Redirect to Dashboard if already logged in) --- */}
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
        {/* We use the ProtectedRoute component here to handle security */}
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
  );
}

export default App;