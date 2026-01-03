import mongoose from 'mongoose';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Stop if URI is missing
if (!process.env.MONGO_URI) {
    console.error("⛔ ERROR: MONGO_URI is missing.");
    process.exit(1);
}

// --- 2. UPDATED SCHEMAS ---
const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  currentPrice: Number, // LTP (Last Traded Price)
  highPrice: Number,    // New Field
  lowPrice: Number,     // New Field
  openPrice: Number,    // New Field
  targetPrice: Number, 
  percentChange: String,
  timestamp: { type: Date, default: Date.now }
});

const nepseSchema = new mongoose.Schema({
  indexValue: Number,
  timestamp: { type: Date, default: Date.now }
});

// Use .models to prevent overwrite errors during dev re-runs
const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);
const Nepse = mongoose.models.Nepse || mongoose.model("Nepse", nepseSchema);

// --- 3. SCRAPING FUNCTION ---
const scrapeMeroLagani = async () => {
  console.log("🔄 Scraping MeroLagani...");
  try {
    const { data } = await axios.get('https://merolagani.com/LatestMarket.aspx');
    const $ = cheerio.load(data);

    // --- A. Scrape NEPSE Index ---
    const indexText = $('#index-turnover .indices-row .index-value').first().text(); 
    const cleanIndex = parseFloat(indexText.replace(/,/g, '')); 

    if (cleanIndex) {
        await Nepse.create({ indexValue: cleanIndex });
        console.log(`📈 Saved NEPSE Index: ${cleanIndex}`);
    }

    // --- B. Scrape Stocks Table ---
    const stocksToSave = [];
    
    // Select the correct table (usually the first table-hover)
    $('.table-hover tbody tr').each((i, el) => {
      const tds = $(el).find('td');
      
      // MeroLagani Table Structure often changes, but usually:
      // 0: Symbol | 1: LTP | 2: % Change | 3: High | 4: Low | 5: Open | 6: Qty
      
      const symbol = tds.eq(0).text().trim();
      const ltpText = tds.eq(1).text().trim();
      const changeText = tds.eq(2).text().trim();
      const highText = tds.eq(3).text().trim();
      const lowText = tds.eq(4).text().trim();
      const openText = tds.eq(5).text().trim();

      // Parse Numbers (Remove commas)
      const currentPrice = parseFloat(ltpText.replace(/,/g, ''));
      const highPrice = parseFloat(highText.replace(/,/g, ''));
      const lowPrice = parseFloat(lowText.replace(/,/g, ''));
      const openPrice = parseFloat(openText.replace(/,/g, ''));

      // Validate that we have at least a Symbol and a Price
      if (symbol && currentPrice) {
        stocksToSave.push({
          updateOne: {
            filter: { symbol: symbol },
            update: { 
              symbol,
              name: symbol, // Could fetch full name if needed
              currentPrice,
              highPrice: highPrice || currentPrice, // Fallback if 0/empty
              lowPrice: lowPrice || currentPrice,   // Fallback if 0/empty
              openPrice: openPrice || currentPrice, // Fallback if 0/empty
              targetPrice: currentPrice * 1.1,      // Mock AI Prediction
              percentChange: changeText,
              timestamp: new Date()
            },
            upsert: true
          }
        });
      }
    });

    if (stocksToSave.length > 0) {
      await Stock.bulkWrite(stocksToSave);
      console.log(`✅ Updated ${stocksToSave.length} stocks with OHLC data.`);
    } else {
      console.log("⚠️ No stocks found. Check selectors.");
    }

  } catch (error) {
    console.error("❌ Scraping failed:", error.message);
  }
};

// --- 4. EXECUTION ---
const run = async () => {
    try {
        console.log("🔌 Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        await scrapeMeroLagani();
        
        console.log("👋 Done. Closing connection.");
        mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error("❌ Fatal Error:", error);
        process.exit(1);
    }
};

run();