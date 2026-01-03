import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// --- FIX START: FORCE .ENV LOADING ---

// 1. Recreate __dirname (It doesn't exist by default in ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Explicitly tell dotenv to look in the CURRENT folder for .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// 3. Debugging (Check if it worked)
console.log("------------------------------------------------");
console.log("📂 Server Location:", __dirname);
console.log("🔑 MONGO_URI Status:", process.env.MONGO_URI ? "✅ LOADED" : "❌ UNDEFINED");
console.log("------------------------------------------------");

// --- FIX END ---

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
if (!process.env.MONGO_URI) {
    console.error("⛔ FATAL ERROR: MONGO_URI is missing. Server cannot start.");
    process.exit(1); // Stop the server if no DB
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Server Connected to MongoDB"))
    .catch(err => console.error("❌ Server DB Error:", err));

// 2. Define Schema
const stockSchema = new mongoose.Schema({
    symbol: String,
    name: String,
    currentPrice: Number,
    highPrice: Number,
    lowPrice: Number,
    openPrice: Number,
    targetPrice: Number, 
    percentChange: String,
    timestamp: { type: Date, default: Date.now }
});

const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);

// 3. API Endpoint
app.get('/api/stocks', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));