import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for redirection
// Import Firebase functions
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path matches your firebase config file

import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import logo from '../Assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // State to show error messages
  
  const navigate = useNavigate(); // Hook to redirect user after login

  // 1️⃣ Function to handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(''); // Clear previous errors
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login Successful! 
      // The `onAuthStateChanged` in your App.js will detect this and redirect to Dashboard
      // Or you can manually force it:
      navigate('/dashboard'); 
    } catch (err) {
      console.error("Login Error:", err.code, err.message);
      // Show a user-friendly error message
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError('Invalid email or password.');
      } else {
        setError('Failed to log in. Please try again.');
      }
    }
  };

  // 2️⃣ Function to handle Google Login
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); // Redirect on success
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError('Google Sign-In failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#1e293b] via-[#243258] to-[#162032] font-sans">
      
      <div className="bg-[#1E293B]/40 backdrop-blur-2xl rounded-3xl p-8 px-10 shadow-2xl border border-white/10 max-w-md w-full relative z-10">
        
        {/* Header Section with Logo */}
        <div className="flex flex-col items-center justify-center mb-8">
            <img 
              src={logo} 
              alt="Lagani Lens Logo" 
              className="h-16 w-16 rounded-full object-cover mb-4 shadow-lg border-2 border-white/20" 
            />
            <h2 className="text-4xl font-bold text-white text-center">Welcome Back</h2>
        </div>

        <p className="text-slate-400 text-center mb-10 text-sm">Log in to access your portfolio</p>
        
        {/* Error Message Display */}
        {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-500/10 p-2 rounded">{error}</p>}

        {/* Form triggers handleLogin on submit */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="space-y-2">
            <label className="block text-slate-300 text-sm font-bold">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-slate-500 text-lg" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 text-white text-sm rounded-xl block pl-11 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-slate-500 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-300 text-sm font-bold">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-slate-500 text-lg" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 text-white text-sm rounded-xl block pl-11 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-slate-500 transition-all"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showPassword ? <FiEye className="text-lg" /> : <FiEyeOff className="text-lg" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center text-slate-300 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 bg-slate-900/50 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-900 transition" 
              />
              <span className="ml-3 group-hover:text-white transition-colors">Remember me</span>
            </label>
            <a href="#" className="font-bold text-blue-500 hover:text-blue-400 transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
          >
            Log In <HiOutlineArrowUpRight className="text-xl stroke-[2.5]"/>
          </button>
        </form>

        <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/80"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#1f293a] text-slate-400 rounded-full font-medium">Or continue with</span>
            </div>
        </div>

        {/* Google Button - Added onClick Handler */}
        <button 
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-4 px-6 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 hover:border-slate-700"
        >
            <FcGoogle className="text-2xl" />
            Continue with Google
        </button>

        <p className="text-slate-400 text-center mt-10 text-sm">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-400 font-bold transition-colors inline-flex items-center gap-1">Create Account <HiOutlineArrowUpRight className="text-sm stroke-[2.5]"/></a>
        </p>
      </div>
    </div>
  );
}