import mongoose from "mongoose";

const categoryCriteriaSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true }, 
  criteria: [{ type: String ,required: true}] // list of criteria names
});

export default mongoose.models.CategoryCriteria || mongoose.model("CategoryCriteria", categoryCriteriaSchema);
