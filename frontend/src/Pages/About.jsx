import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import logo from '../Assets/logo.png';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans flex flex-col items-center">
      
      {/* --- Navbar (Consistent with other pages) --- */}
      <nav className="w-full max-w-5xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-lg" />
          <span className="font-bold text-xl tracking-wide">Lagani Lens</span>
        </div>
        <Link 
          to="/" 
          className="group flex items-center gap-2 px-5 py-2 rounded-full border border-slate-600 hover:bg-slate-800 hover:border-blue-500 transition-all text-sm font-medium"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </nav>

      {/* --- Main Content --- */}
      <div className="flex-1 w-full max-w-4xl px-6 mt-8 mb-12">
        
        {/* Glassmorphism Card */}
        <div className="bg-[#1e293b]/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Decorative Glow Effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

          {/* Title Section */}
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
            About Lagani Lens
          </h1>
          
          <p className="text-slate-300 text-lg leading-relaxed mb-10 border-l-4 border-blue-500 pl-6">
            Lagani Lens is your trusted partner for NEPSE stock market analysis and insights.
            We provide real-time market data, AI-powered predictions, and comprehensive tools
            to help you make informed investment decisions.
          </p>

          {/* Features Section */}
          <div className="bg-[#0f172a]/40 rounded-2xl p-6 border border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
              Our Features
            </h2>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Real-time NEPSE market data and updates",
                "AI-powered stock predictions",
                "Comprehensive stock comparison tools",
                "Personalized watchlist management",
                "Top performer leaderboard"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800/50">
                  <FiCheckCircle className="text-blue-500 mt-1 min-w-[1.25rem]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;