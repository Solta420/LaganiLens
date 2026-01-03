import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Components
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header'; // Imported the Header with Dark Mode Toggle

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
  
  const user = auth.currentUser; 
  const navigate = useNavigate();

  // --- Logout ---
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // --- Check Market Time ---
  const checkMarketStatus = () => {
    const now = new Date();
    const nepalTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kathmandu"}));
    const day = nepalTime.getDay();
    const hour = nepalTime.getHours();
    
    // Market Open: Sun(0) - Thu(4), 11am - 3pm
    if (day >= 0 && day <= 4 && hour >= 11 && hour < 15) {
      setIsMarketOpen(true);
    } else {
      setIsMarketOpen(false);
    }
  };

  // --- Fetch Data ---
  useEffect(() => {
    checkMarketStatus();
    
    const fetchData = async () => {
      try {
        const chartRes = await axios.get('http://localhost:5000/api/nepse-history');
        setNepseData(chartRes.data);

        const stockRes = await axios.get('http://localhost:5000/api/stocks');
        setStockList(stockRes.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
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
    // MAIN LAYOUT CONTAINER
    // Light Mode: bg-gray-50 | Dark Mode: bg-[#0f172a]
    <div className="flex w-full h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white overflow-hidden transition-colors duration-200">
      
      {/* 1. LEFT SIDEBAR */}
      <div className="flex-shrink-0">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 2. RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen relative w-full">
        
        {/* Header (Contains Dark Mode Toggle) */}
        <div className="sticky top-0 z-30 w-full">
            <Header /> 
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth w-full">
            
            {/* Background Glow - Subtle in Light, Visible in Dark */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-200/20 dark:from-blue-900/10 to-transparent pointer-events-none -z-10" />
            
            <div className="max-w-7xl mx-auto animate-fade-in pb-20">
              {renderContent()}
            </div>
        </div>

      </div>
    </div>
  );
}