import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ==========================================
// 1. DEFINE SCHEMAS (Data Models)
// ==========================================
// These must match exactly what your Scraper saves to MongoDB

// Schema for Stock Predictions/Cards
const stockSchema = new mongoose.Schema({
  symbol: String,       // e.g., "NABIL"
  name: String,         // e.g., "Nabil Bank Ltd"
  currentPrice: Number, // e.g., 985
  targetPrice: Number,  // e.g., 1045
  percentChange: String,// e.g., "+6.09%"
  timestamp: { type: Date, default: Date.now }
});

// Schema for NEPSE Chart History
const nepseSchema = new mongoose.Schema({
  indexValue: Number,   // e.g., 2223.00
  timestamp: { type: Date, default: Date.now }
});

// Create Models
// Note: Mongoose automatically looks for the plural, lowercase version of these names 
// (e.g., 'Stock' -> 'stocks' collection)
const Stock = mongoose.model("Stock", stockSchema);
const Nepse = mongoose.model("Nepse", nepseSchema);

// ==========================================
// 2. API ROUTES (The Bridge to Frontend)
// ==========================================

// Test route
app.get("/", (req, res) => {
  res.send("LaganiLens API is running 🚀");
});

// GET: Fetch all stocks for the Dashboard Cards
app.get("/api/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Fetch NEPSE history for the Chart
app.get("/api/nepse-history", async (req, res) => {
  try {
    // Get the last 20 entries, sorted by oldest to newest for the chart
    const history = await Nepse.find().sort({ timestamp: -1 }).limit(20);
    // Reverse it so it displays left-to-right correctly on the chart
    res.json(history.reverse());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 3. START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);