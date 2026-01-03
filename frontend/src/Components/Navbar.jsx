import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiBell, FiUser, FiLogOut, FiSettings, FiHelpCircle } from 'react-icons/fi';

export default function Navbar({ user, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Click-outside logic to close dropdowns
  const notiRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notiRef.current && !notiRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock Notifications
  const notifications = [
    { id: 1, title: "Market Alert", message: "NEPSE closed at 2045.32", time: "10m ago", read: false },
    { id: 2, title: "Portfolio", message: "NABIL up by 2.1% today", time: "2h ago", read: false },
    { id: 3, title: "Welcome", message: "Setup your profile to start trading", time: "1d ago", read: true },
  ];

  
  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    return "GU"; 
  };

  return (
    <div className="flex justify-between items-center py-4 px-8 bg-[#0f172a] sticky top-0 z-30 border-b border-slate-800/50">
      
      {/* Search Bar */}
      <div className="relative w-96 hidden md:block">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search stocks (e.g. NABIL)..." 
          className="w-full bg-[#1e293b] border border-slate-700 rounded-full py-2.5 pl-12 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-6">
        
        {/* --- NOTIFICATIONS BELL --- */}
        <div className="relative" ref={notiRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-white transition-colors"
          >
            <FiBell className="text-xl" />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0f172a]"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-[#1e293b] border border-slate-700 rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
                <h3 className="font-bold text-white text-sm">Notifications</h3>
                <button className="text-xs text-blue-400 hover:underline">Mark all read</button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((note) => (
                  <div key={note.id} className={`p-4 border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors ${!note.read ? 'bg-blue-500/5' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-semibold text-white">{note.title}</h4>
                      <span className="text-[10px] text-slate-500">{note.time}</span>
                    </div>
                    <p className="text-xs text-slate-400">{note.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- USER PROFILE (GU Block) --- */}
        <div className="relative" ref={userRef}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 focus:outline-none hover:bg-slate-800/50 p-2 rounded-xl transition-all"
          >
            {/* Initials Circle */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center">
                <span className="font-bold text-xs text-white">{getInitials()}</span>
              </div>
            </div>
            
            {/* Name Label */}
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-white leading-none mb-1">
                {user?.displayName || "Guest User"}
              </p>
              <p className="text-xs text-slate-400 leading-none">Investor</p>
            </div>
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-[#1e293b] border border-slate-700 rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-slate-700/50">
                <p className="text-white font-bold text-sm">{user?.displayName || "Guest User"}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || "No email linked"}</p>
              </div>
              
              <div className="py-2">
                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-3 transition-colors">
                  <FiUser className="text-blue-400" /> My Profile
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-3 transition-colors">
                  <FiSettings className="text-blue-400" /> Settings
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-3 transition-colors">
                  <FiHelpCircle className="text-blue-400" /> Help Center
                </button>
              </div>

              <div className="border-t border-slate-700/50 p-2">
                <button 
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-3 transition-colors font-medium"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}