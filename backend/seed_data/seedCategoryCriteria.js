// seedCategoryCriteria.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import CategoryCriteria from "../models/CategoryCriteria.js";

dotenv.config();

const data = [
  {
    category: "Food & Beverages",
    criteria: ["Safety", "Freshness", "Taste/Nutrition"],
  },
  {
    category: "Cosmetics & Personal Care",
    criteria: ["Safety", "Effectiveness", "Skin Compatibility"],
  },
  {
    category: "Clothing & Apparel",
    criteria: ["Material Quality", "Size & Fit", "Durability"],
  },
  {
    category: "Electronics & Gadgets",
    criteria: ["Performance", "Durability", "Safety"],
  },
  {
    category: "Home Appliances",
    criteria: ["Performance", "Durability", "Safety"],
  },
  {
    category: "Toys & Baby Products",
    criteria: ["Safety", "Build Quality", "Durability"],
  },
  {
    category: "Furniture & Home Décor",
    criteria: ["Material Quality", "Durability", "Size/Dimensions"],
  },
  {
    category: "Pharmaceuticals & Health Products",
    criteria: ["Safety", "Effectiveness", "Label Accuracy"],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await CategoryCriteria.deleteMany({});
    await CategoryCriteria.insertMany(data);
    console.log("✅ CategoryCriteria seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding CategoryCriteria:", error);
    process.exit(1);
  }
}

seed();
