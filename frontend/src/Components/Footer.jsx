import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Navbar() {
  const location = useLocation();
  const [user] = useAuthState(auth);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3">
            <div className="text-2xl">📊</div>
            <span className="text-xl font-bold text-white">Lagani Lens</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stocks (e.g., NABIL)"
                className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Market Overview
            </Link>
            <Link
              to="/compare"
              className={`text-sm font-medium transition-colors ${
                isActive('/compare')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Compare Stocks
            </Link>
            <Link
              to="/watchlist"
              className={`text-sm font-medium transition-colors ${
                isActive('/watchlist')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Watchlist
            </Link>
            <Link
              to="/predictions"
              className={`text-sm font-medium transition-colors ${
                isActive('/predictions')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Stock Predictions
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Top Performers
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4 ml-6">
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.email?.[0].toUpperCase() || 'A'}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium">
                      {user.displayName || user.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-gray-400 text-xs">Premium User</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white text-sm ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;