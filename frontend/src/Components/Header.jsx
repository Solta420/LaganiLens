import React, { useState } from 'react';
import { Search, Bell, ChevronDown, User, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext'; // Make sure this path matches where you put ThemeContext

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 transition-colors duration-200">
      
      {/* Search Bar */}
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search stocks (e.g. NABIL)..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-6 ml-auto">
        <button className="text-gray-500 dark:text-gray-400">
          <Bell size={20} />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <div className="w-8 h-8 bg-indigo-900 rounded-full flex items-center justify-center text-white text-xs">S</div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Sandesh</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Investor</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {/* THE DROPDOWN MENU */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
              
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                <User size={16} className="mr-3" /> Profile
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Settings size={16} className="mr-3" /> Settings
              </a>

              {/* --- DARK MODE TOGGLE ITEM --- */}
              <div 
                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" 
                onClick={(e) => {
                   e.preventDefault();
                   toggleTheme();
                }}
              >
                <div className="flex items-center">
                  {theme === 'light' ? <Moon size={16} className="mr-3"/> : <Sun size={16} className="mr-3"/>}
                  Dark Mode
                </div>
                
                {/* Toggle Switch Visual */}
                <div className={`w-10 h-5 flex items-center bg-gray-300 dark:bg-blue-600 rounded-full p-1 duration-300 ease-in-out`}>
                  <div className={`bg-white w-3 h-3 rounded-full shadow-md transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-5' : ''}`}></div>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

              <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                <LogOut size={16} className="mr-3" /> Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;