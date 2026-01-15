import { useEffect, useState } from "react";
import StockSelect from "../components/StockSelect";
import CompareTable from "../components/CompareTable";

export default function CompareStocksPage() {
  const [stockA, setStockA] = useState(null);
  const [stockB, setStockB] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stockA || !stockB || stockA === stockB) return;

    setLoading(true);
    fetch(`/api/stocks/compare?symbols=${stockA},${stockB}`)
      .then(res => res.json())
      .then(res => setData(res.stocks || []))
      .finally(() => setLoading(false));
  }, [stockA, stockB]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Compare Stocks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StockSelect
          label="Stock A"
          value={stockA}
          onChange={setStockA}
          exclude={stockB}
        />
        <StockSelect
          label="Stock B"
          value={stockB}
          onChange={setStockB}
          exclude={stockA}
        />
      </div>

      {loading && (
        <p className="text-sm opacity-70">Loading comparison...</p>
      )}

      {data.length === 2 && <CompareTable stocks={data} />}
    </div>
  );
}
