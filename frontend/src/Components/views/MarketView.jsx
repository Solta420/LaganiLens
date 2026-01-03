import React from 'react';
import { FiTrendingUp, FiClock } from 'react-icons/fi';
import NepseChart from '../NepseChart'; // Go up one level to components
import StockCard from '../StockCard';

export default function MarketView({ nepseData, stockList, loading, isMarketOpen }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Chart Section */}
      <div className="bg-[#1e293b]/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-xl flex flex-col h-[400px]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Market Overview</h3>
            <h1 className="text-4xl font-bold text-white">NEPSE Index</h1>
          </div>
          {isMarketOpen ? (
            <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              <FiTrendingUp /> Live
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-3 py-1 rounded-full text-sm font-bold">
              <FiClock /> Closed
            </div>
          )}
        </div>
        <div className="flex-1 w-full min-h-0">
          <NepseChart data={nepseData} loading={loading} isMarketOpen={isMarketOpen} />
        </div>
      </div>

      {/* Stock Cards Section */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
          Live Market Watch
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-slate-500">Loading stocks...</p>
          ) : stockList.length > 0 ? (
            stockList.map((stock) => <StockCard key={stock._id} stock={stock} />)
          ) : (
            <p className="text-slate-500">No stock data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}