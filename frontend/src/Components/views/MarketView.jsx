import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '../../Context/ThemeContext'; // Import your Theme Hook

const MarketView = () => {
  const { theme } = useTheme(); // Access 'light' or 'dark'
  const [allStocks, setAllStocks] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [chartSeries, setChartSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial Chart Options
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'candlestick',
      height: 450,
      fontFamily: '"DM Sans", sans-serif',
      background: 'transparent', // CRITICAL: Allows dark container to show through
      toolbar: {
        show: true,
        tools: { download: false, selection: true, zoom: true, pan: true },
        autoSelected: 'pan'
      }
    },
    title: {
      text: 'Loading...',
      align: 'left',
      style: { fontSize: '16px', fontWeight: 'bold', color: '#333' }
    },
    stroke: {
      width: [1, 0],
      colors: ['#333'] 
    },
    xaxis: {
      type: 'datetime',
      tooltip: { enabled: true },
      axisBorder: { show: true, color: '#ccc' },
      axisTicks: { show: true },
      labels: { style: { colors: '#333' } }, // Default Light
      crosshairs: {
        show: true,
        width: 1,
        position: 'back',
        opacity: 0.9,
        stroke: { color: '#666', width: 1, dashArray: 3 }
      }
    },
    yaxis: [
      {
        tooltip: { enabled: true },
        opposite: true,
        labels: {
          style: { colors: '#333' }, // Default Light
          formatter: (value) => value.toFixed(1)
        }
      },
      {
        seriesName: 'Volume',
        opposite: true,
        show: false,
        max: (max) => max * 5
      }
    ],
    plotOptions: {
      candlestick: {
        colors: { upward: '#00B746', downward: '#EF403C' },
        wick: { useFillColor: true }
      },
      bar: {
        columnWidth: '60%',
        colors: { ranges: [{ from: 0, to: 1000000000, color: undefined }] }
      }
    },
    grid: {
      borderColor: '#f1f1f1', // Default Light
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light', // Default Light
      y: {
        formatter: function (y, { seriesIndex }) {
          if (seriesIndex === 1) return y.toFixed(0);
          if (typeof y !== "undefined") return y.toFixed(1);
          return y;
        }
      }
    }
  });

  // 1. Fetch Stocks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stocks');
        setAllStocks(response.data);
        if (response.data.length > 0) setSelectedSymbol(response.data[0].symbol);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. LISTEN FOR THEME CHANGES & UPDATE CHART COLORS
  useEffect(() => {
    const isDark = theme === 'dark';
    const textColor = isDark ? '#E2E8F0' : '#333333'; // White-ish vs Dark Gray
    const gridColor = isDark ? '#334155' : '#f1f1f1'; // Dark Slate vs Light Gray

    setChartOptions(prev => ({
      ...prev,
      chart: {
        ...prev.chart,
        background: 'transparent' // Ensure transparency
      },
      title: {
        ...prev.title,
        style: { ...prev.title.style, color: textColor }
      },
      xaxis: {
        ...prev.xaxis,
        labels: { style: { colors: textColor } },
        axisBorder: { show: true, color: gridColor },
      },
      yaxis: [
        {
          ...prev.yaxis[0],
          labels: { style: { colors: textColor }, formatter: (v) => v.toFixed(1) }
        },
        prev.yaxis[1] // Keep volume axis as is
      ],
      grid: {
        ...prev.grid,
        borderColor: gridColor
      },
      tooltip: {
        ...prev.tooltip,
        theme: isDark ? 'dark' : 'light' // Fixes the tooltip background/text issue
      },
      stroke: {
        width: [1, 0],
        colors: [isDark ? '#E2E8F0' : '#333'] // Candle borders adapt
      }
    }));
  }, [theme]); // Rerun whenever theme changes

  // 3. Generate Mock Data when Symbol Changes
  useEffect(() => {
    if (!selectedSymbol || allStocks.length === 0) return;

    const stock = allStocks.find(s => s.symbol === selectedSymbol);
    if (!stock) return;

    setChartOptions(prev => ({
      ...prev,
      title: { ...prev.title, text: `${selectedSymbol} - Daily Chart` }
    }));

    // Data Generation Logic (Kept same as your code)
    let currentPrice = stock.currentPrice;
    const now = new Date();
    const mockData = [];
    const volumeColors = [];

    for (let i = 45; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const volatility = currentPrice * 0.02;
      const change = (Math.random() - 0.5) * volatility;
      const open = currentPrice;
      const close = currentPrice + change;
      const high = Math.max(open, close) + Math.random() * volatility * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * 0.5;
      const volume = Math.floor(Math.random() * 9000) + 1000;
      const isUp = close >= open;
      volumeColors.push(isUp ? '#00B746' : '#EF403C');

      mockData.push({
        x: date.getTime(),
        y: [open, high, low, close],
        volume: volume
      });
      currentPrice = close;
    }

    const lastIdx = mockData.length - 1;
    mockData[lastIdx].y = [
      stock.openPrice || mockData[lastIdx].y[0],
      stock.highPrice || mockData[lastIdx].y[1],
      stock.lowPrice || mockData[lastIdx].y[2],
      stock.currentPrice
    ];

    setChartSeries([
      {
        name: 'Price',
        type: 'candlestick',
        data: mockData.map(d => ({ x: d.x, y: d.y }))
      },
      {
        name: 'Volume',
        type: 'column',
        data: mockData.map((d, index) => ({
          x: d.x,
          y: d.volume,
          fillColor: volumeColors[index]
        }))
      }
    ]);

  }, [selectedSymbol, allStocks]);

  const handleStockChange = (e) => setSelectedSymbol(e.target.value);

  return (
    // MAIN WRAPPER: Replaced inline styles with Tailwind for Dark Mode
    <div className="p-6 max-w-7xl mx-auto min-h-screen font-sans transition-colors duration-200
      bg-gray-50 text-gray-900 
      dark:bg-[#0f172a] dark:text-white">
      
      {/* 1. HEADER CARD */}
      <div className="mb-8 p-6 rounded-2xl shadow-sm flex flex-wrap justify-between items-center gap-5 transition-colors duration-200
        bg-white dark:bg-[#1e293b] dark:shadow-none">
        
        <div>
          <h2 className="text-2xl font-bold mb-1 text-[#2B3674] dark:text-white">
            📊 Market Depth
          </h2>
          <p className="text-sm font-medium text-gray-400 dark:text-gray-400">
            Technical Analysis & Volume Indicators
          </p>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <select 
            value={selectedSymbol} 
            onChange={handleStockChange}
            className="appearance-none outline-none cursor-pointer py-3 px-6 rounded-xl text-sm font-bold border-none min-w-[180px] transition-colors duration-200
            bg-gray-100 text-[#2B3674] hover:bg-gray-200
            dark:bg-[#334155] dark:text-white dark:hover:bg-[#475569]"
          >
            {allStocks.map(stock => (
              <option key={stock._id} value={stock.symbol}>{stock.symbol}</option>
            ))}
          </select>
          {/* Custom Arrow Icon for Dropdown */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#2B3674] dark:text-white">
             ▼
          </div>
        </div>
      </div>

      {/* 2. CHART CARD */}
      {loading ? (
        <div className="text-center py-12 text-gray-400 animate-pulse">Loading Market Data...</div>
      ) : (
        <div className="p-6 rounded-2xl shadow-sm min-h-[500px] transition-colors duration-200
          bg-white dark:bg-[#1e293b] dark:shadow-none">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-6 bg-[#4318FF] rounded-full"></div>
            <h3 className="text-lg font-semibold text-[#2B3674] dark:text-white m-0">
              Price Movement
            </h3>
          </div>

          {chartSeries.length > 0 && (
            <div className="w-full">
              <ReactApexChart 
                options={chartOptions} 
                series={chartSeries} 
                type="candlestick" 
                height={450} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketView;