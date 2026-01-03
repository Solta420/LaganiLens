import { FiActivity, FiTrendingUp, FiPieChart, FiBell, FiSettings, FiLogOut } from 'react-icons/fi';
import logo from '../Assets/logo.png'; 

// Note: We added 'onLogout' to the props list below
export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { name: 'Overview', icon: <FiActivity /> },
    { name: 'Market', icon: <FiTrendingUp /> },
    { name: 'Portfolio', icon: <FiPieChart /> },
    { name: 'News', icon: <FiBell /> },
  ];

  return (
    <aside className="w-64 bg-[#1e293b]/50 hidden md:flex flex-col border-r border-slate-700/50 backdrop-blur-xl h-screen">
      <div className="p-6 flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" />
        <span className="font-bold text-xl tracking-wide text-white">Lagani Lens</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.name 
              ? 'bg-blue-600 shadow-lg shadow-blue-500/20 text-white' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-700/50 space-y-2">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors px-4 py-2 w-full rounded-lg hover:bg-slate-800">
          <FiSettings /> Settings
        </button>
        
        {/* Logout Button */}
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors px-4 py-2 w-full rounded-lg"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}