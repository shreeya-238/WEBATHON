import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Import Routes (we'll add later)
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
