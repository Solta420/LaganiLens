import mongoose from 'mongoose';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

// 1. Connect to the SAME Database as your Backend
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lagani_lens')
  .then(() => console.log("✅ Scraper Connected to MongoDB"))
  .catch(err => console.error("DB Error:", err));

// 2. Define Schemas (Must match backend server.js exactly)
const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  currentPrice: Number,
  targetPrice: Number, 
  percentChange: String,
  timestamp: { type: Date, default: Date.now }
});

const nepseSchema = new mongoose.Schema({
  indexValue: Number,
  timestamp: { type: Date, default: Date.now }
});

const Stock = mongoose.model("Stock", stockSchema);
const Nepse = mongoose.model("Nepse", nepseSchema);

// 3. The Scraping Function
const scrapeMeroLagani = async () => {
  console.log("🔄 Scraping MeroLagani...");
  try {
    // Fetch the Live Market Page
    const { data } = await axios.get('https://merolagani.com/LatestMarket.aspx');
    const $ = cheerio.load(data);

    // --- A. Scrape NEPSE Index (Usually in top header or specific div) ---
    // Note: Selectors on websites change. This is a common selector for MeroLagani index.
    // If this fails, inspect the website to find the new class name.
    const indexText = $('#index-turnover .indices-row .index-value').first().text(); 
    const cleanIndex = parseFloat(indexText.replace(/,/g, '')) || 2200; // Fallback if parse fails

    // Save NEPSE Data
    await Nepse.create({ indexValue: cleanIndex });
    console.log(`📈 Saved NEPSE Index: ${cleanIndex}`);

    // --- B. Scrape Stocks Table ---
    const stocksToSave = [];
    
    // Iterate over the main table rows
    $('.table-hover tbody tr').each((i, el) => {
      if (i > 10) return; // Limit to top 10 rows for demo speed
      
      const symbol = $(el).find('td').eq(0).text().trim();
      const priceText = $(el).find('td').eq(1).text().trim();
      const changeText = $(el).find('td').eq(2).text().trim();
      
      const price = parseFloat(priceText.replace(/,/g, ''));

      if (symbol && price) {
        stocksToSave.push({
          updateOne: {
            filter: { symbol: symbol }, // Find stock by Symbol
            update: { 
              symbol,
              name: symbol, // MeroLagani live table often lacks full name, using Symbol as placeholder
              currentPrice: price,
              targetPrice: price * 1.1, // Mock AI Prediction (Current + 10%)
              percentChange: `${changeText}%`
            },
            upsert: true // Create if new, update if exists
          }
        });
      }
    });

    if (stocksToSave.length > 0) {
      await Stock.bulkWrite(stocksToSave);
      console.log(`✅ Updated ${stocksToSave.length} stocks.`);
    }

  } catch (error) {
    console.error("❌ Scraping failed:", error.message);
  }
};

// 4. Run Scraper
scrapeMeroLagani();

// Optional: Run every 5 minutes automatically
setInterval(scrapeMeroLagani, 5 * 60 * 1000);