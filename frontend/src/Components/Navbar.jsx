import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-6 sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="flex items-center gap-4 md:hidden">
        <button className="text-slate-300"><FiMenu className="text-2xl" /></button>
      </div>

      <div className="relative hidden md:block w-96">
        <FiSearch className="absolute left-4 top-3.5 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search stocks..." 
          className="w-full bg-slate-900 border border-slate-700 rounded-full pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-500 text-white"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-300 hover:text-white transition-colors">
          <FiBell className="text-xl" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0f172a]"></span>
        </button>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
          GU
        </div>
      </div>
    </header>
  );
}