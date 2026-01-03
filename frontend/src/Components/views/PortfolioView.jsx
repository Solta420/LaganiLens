import React from 'react';

export default function PortfolioView() {
  // Mock Data (Replace with real data from Firebase later)
  const holdings = [
    { id: 1, symbol: 'NICA', qty: 50, avg: 450, ltp: 480 },
    { id: 2, symbol: 'HIDCL', qty: 100, avg: 210, ltp: 195 },
    { id: 3, symbol: 'NABIL', qty: 30, avg: 600, ltp: 615 },
  ];

  const calculatePL = (avg, ltp) => ((ltp - avg) / avg) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">My Portfolio</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1e293b]/60 border border-slate-700 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm">Total Investment</p>
            <p className="text-2xl font-bold text-white">Rs. 61,500</p>
        </div>
        <div className="bg-[#1e293b]/60 border border-slate-700 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm">Current Value</p>
            <p className="text-2xl font-bold text-white">Rs. 61,950</p>
        </div>
        <div className="bg-[#1e293b]/60 border border-slate-700 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm">Total Profit/Loss</p>
            <p className="text-2xl font-bold text-green-400">+ Rs. 450 (0.7%)</p>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-[#1e293b]/60 border border-slate-700 rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase">
            <tr>
              <th className="p-4 font-bold">Symbol</th>
              <th className="p-4 font-bold">Quantity</th>
              <th className="p-4 font-bold">Avg Price</th>
              <th className="p-4 font-bold">LTP</th>
              <th className="p-4 font-bold text-right">P/L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-sm">
            {holdings.map((item) => {
              const pl = calculatePL(item.avg, item.ltp);
              return (
                <tr key={item.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="p-4 font-bold text-white">{item.symbol}</td>
                  <td className="p-4 text-slate-300">{item.qty}</td>
                  <td className="p-4 text-slate-300">Rs. {item.avg}</td>
                  <td className="p-4 text-slate-300">Rs. {item.ltp}</td>
                  <td className={`p-4 font-bold text-right ${pl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {pl.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}