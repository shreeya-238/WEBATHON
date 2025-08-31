import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: String, unique: true },
  name: { type: String, required: true },              // Product name
  brand: { type: String, required: true },             // Brand name
  category: { type: String, required: true },          // Main category
  subcategory: { type: String },                       // Sub category
  description: { type: String },                       // Product description
  price: { type: Number },                             // Price value
  currency: { type: String, default: "INR" },          // Default INR
  image_url: { type: String },                         // Image URL
  barcode: { type: String, unique: true, sparse: true }, // Unique product code

  specifications: { type: Map, of: String },           // Flexible attributes

  // Boolean flags
  made_in_india: { type: Boolean, default: false },
  eco_friendly: { type: Boolean, default: false },
  FSSAI_certified: { type: Boolean, default: false },

  // Ratings
  avg_overall_rating: { type: Number, default: 0, min: 0, max: 5 },
  avg_rating_criteria1: { type: Number, default: 0, min: 0, max: 5 },
  avg_rating_criteria2: { type: Number, default: 0, min: 0, max: 5 },
  avg_rating_criteria3: { type: Number, default: 0, min: 0, max: 5 },

  // Engagement
  total_reviews: { type: Number, default: 0 },
  total_complaints: { type: Number, default: 0 },
  risk_score: { type: Number, default: 0 },

  // Metadata
  source: { type: String },                            // Manual / Scraped / API
}, { 
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
