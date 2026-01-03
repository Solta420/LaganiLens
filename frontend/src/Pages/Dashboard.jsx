import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { signOut } from 'firebase/auth';        // 2. Import signOut
import { auth } from '../firebase';             // 3. Import auth

// Components
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

// Views
import MarketView from '../Components/views/MarketView';
import PortfolioView from '../Components/views/PortfolioView';
import NewsView from '../Components/views/NewsView';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Market');
  const [nepseData, setNepseData] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  
  const navigate = useNavigate(); // Hook for redirection

  // --- Logic: Handle Logout ---
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // --- Logic: Check Market Time ---
  const checkMarketStatus = () => {
    const now = new Date();
    // Convert to Nepal Time
    const nepalTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kathmandu"}));
    const day = nepalTime.getDay();
    const hour = nepalTime.getHours();
    
    // Sunday(0) to Thursday(4), 11am to 3pm
    if (day >= 0 && day <= 4 && hour >= 11 && hour < 15) {
      setIsMarketOpen(true);
    } else {
      setIsMarketOpen(false);
    }
  };

  // --- Logic: Fetch Data ---
  useEffect(() => {
    checkMarketStatus();
    
    const fetchData = async () => {
      try {
        const chartRes = await axios.get('http://localhost:5000/api/nepse-history');
        const formattedChart = chartRes.data.map(item => ({
          time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: item.indexValue
        }));
        setNepseData(formattedChart);

        const stockRes = await axios.get('http://localhost:5000/api/stocks');
        setStockList(stockRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); 
    return () => clearInterval(interval);
  }, []);

  // --- Logic: Switch Views ---
  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <MarketView nepseData={nepseData} stockList={stockList} loading={loading} isMarketOpen={isMarketOpen} />;
      case 'Market':
        return <MarketView nepseData={nepseData} stockList={stockList} loading={loading} isMarketOpen={isMarketOpen} />;
      case 'Portfolio':
        return <PortfolioView />;
      case 'News':
        return <NewsView />;
      default:
        return <MarketView nepseData={nepseData} stockList={stockList} loading={loading} isMarketOpen={isMarketOpen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans flex overflow-hidden">
      
      {/* Sidebar now controls activeTab AND handles Logout */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />

        <Navbar />

        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full z-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}