// models/ComplaintCategory.js
import mongoose from "mongoose";

const complaintCategorySchema = new mongoose.Schema({
  productCategory: { type: String, required: true, unique: true },
  issues: [{ type: String, required: true }],
});

export const ComplaintCategory = mongoose.model("ComplaintCategory", complaintCategorySchema);
