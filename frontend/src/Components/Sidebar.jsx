import { FiTrendingUp, FiPieChart, FiBell } from 'react-icons/fi';
import logo from '../Assets/logo.png'; 

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { name: 'Market', icon: <FiTrendingUp /> },   // Maps to MarketView
    { name: 'Portfolio', icon: <FiPieChart /> },  // Maps to PortfolioView
    { name: 'News', icon: <FiBell /> },           // Maps to NewsView
  ];

  return (
    // 1. Updated Container:
    // - Light Mode: bg-white, border-gray-200
    // - Dark Mode: dark:bg-[#0f172a], dark:border-gray-800
    <aside className="w-64 h-screen hidden md:flex flex-col border-r transition-colors duration-200
      bg-white border-gray-200
      dark:bg-[#0f172a] dark:border-gray-800 z-20">
      
      {/* 2. Logo Header (Removed the duplicate, kept the clickable one) */}
      <div 
        onClick={() => setActiveTab('Overview')}
        className ="h-20 flex items-center px-6 cursor-pointer border-b transition-colors duration-200
        border-gray-100 hover:bg-gray-50
        dark:border-gray-800 dark:hover:bg-gray-800/50"
      >
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 mr-3" />
        {/* Text color changes based on mode */}
        <span className="font-bold text-xl tracking-wide text-gray-800 dark:text-white">
          LaganiLens
        </span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-6">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.name 
              // Active State (Same for both usually, but ensuring text is white)
              ? 'bg-blue-600 shadow-lg shadow-blue-500/20 text-white' 
              // Inactive State (Adapts to Light/Dark)
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}