import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase'; 
// We use react-icons to match the rest of the project
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import logo from '../Assets/logo.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // 1. Create User
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // 2. Update Profile Name
      await updateProfile(userCredential.user, { displayName: name });
      // 3. Navigate
      navigate('/'); 
    } catch (error) {
      // Handle Firebase specific errors for better UX
      if (error.code === 'auth/email-already-in-use') {
        setError('That email is already registered.');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#1e293b] via-[#243258] to-[#162032] font-sans">
      
      <div className="bg-[#1E293B]/40 backdrop-blur-2xl rounded-3xl p-8 px-10 shadow-2xl border border-white/10 max-w-md w-full relative z-10">
        
        {/* Header with Logo */}
        <div className="flex flex-col items-center justify-center mb-6">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-16 w-16 rounded-full object-cover mb-4 shadow-lg border-2 border-white/20" 
            />
            <h2 className="text-3xl font-bold text-white text-center">Create Account</h2>
            <p className="text-slate-400 text-sm mt-1">Join Lagani Lens today</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-4">
          
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-slate-300 text-xs font-bold uppercase tracking-wider">Full Name</label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiUser className="text-slate-500 text-lg" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 text-white text-sm rounded-xl block pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 border-transparent placeholder-slate-600 transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
          
          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-slate-300 text-xs font-bold uppercase tracking-wider">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-slate-500 text-lg" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 text-white text-sm rounded-xl block pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 border-transparent placeholder-slate-600 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-slate-300 text-xs font-bold uppercase tracking-wider">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-slate-500 text-lg" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 text-white text-sm rounded-xl block pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 border-transparent placeholder-slate-600 transition-all"
                placeholder="••••••••"
                required
              />
               <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
              </button>
            </div>
          </div>
          
          {/* Confirm Password Field */}
          <div className="space-y-1">
            <label className="text-slate-300 text-xs font-bold uppercase tracking-wider">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-slate-500 text-lg" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-slate-900/50 border text-white text-sm rounded-xl block pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-slate-600 transition-all ${
                    password && confirmPassword && password !== confirmPassword 
                    ? 'border-red-500/50 focus:ring-red-500' 
                    : 'border-slate-800'
                }`}
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up'} <HiOutlineArrowUpRight className="text-xl stroke-[2.5]"/>
          </button>
        </form>
        
        <p className="text-center mt-8 text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-400 font-bold transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;