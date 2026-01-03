import React from 'react';

export default function NewsView() {
  const news = [
    { id: 1, title: 'NEPSE gains 25 points as banking sector rallies', time: '2 hours ago', source: 'Sharesansar' },
    { id: 2, title: 'NICA announces 15% bonus share for fiscal year 2081', time: '5 hours ago', source: 'MeroLagani' },
    { id: 3, title: 'Hydropower sector sees a sharp decline today', time: '1 day ago', source: 'BizMandu' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Market News</h2>
      
      <div className="grid gap-4">
        {news.map((item) => (
          <div key={item.id} className="bg-[#1e293b]/60 border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-colors cursor-pointer group">
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
            <div className="flex gap-4 mt-2 text-xs text-slate-500">
              <span className="bg-slate-800 px-2 py-1 rounded">{item.source}</span>
              <span className="flex items-center">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}