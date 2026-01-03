import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function NepseChart({ data, loading, isMarketOpen }) {
  if (loading) {
    return <div className="h-full flex items-center justify-center text-slate-500">Loading Market Data...</div>;
  }

  const activeColor = isMarketOpen ? "#3b82f6" : "#94a3b8"; 

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={activeColor} stopOpacity={0.5}/>
            <stop offset="95%" stopColor={activeColor} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 12}} />
        <YAxis domain={['auto', 'auto']} stroke="#64748b" tick={{fontSize: 12}} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
          itemStyle={{ color: activeColor }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke={activeColor} 
          strokeWidth={3} 
          fill="url(#colorValue)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}