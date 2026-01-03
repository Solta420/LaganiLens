import React from 'react';

export default function StockCard({ stock }) {
  const getChangeColor = (changeStr) => {
    if (!changeStr) return 'text-slate-400';
    return changeStr.includes('-') ? 'text-red-400 bg-red-500/20' : 'text-green-400 bg-green-500/20';
  };

  return (
    <div className="bg-[#1e293b]/60 backdrop-blur-xl border border-slate-700 rounded-2xl p-5 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-lg group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-lg text-white">{stock.symbol}</h4>
          <p className="text-xs text-slate-400 truncate w-32">{stock.name}</p>
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs font-bold ${getChangeColor(stock.percentChange)}`}>
          {stock.percentChange || '0%'}
        </div>
      </div>
      
      <div className="flex justify-between items-end border-t border-slate-700/50 pt-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Current</p>
          <p className="text-xl font-bold text-white">Rs. {stock.currentPrice}</p>
        </div>
        <div className="text-right">
            <p className="text-xs text-blue-400 mb-1">Target</p>
            <p className="text-lg font-bold text-blue-400">Rs. {stock.targetPrice?.toFixed(0) || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}