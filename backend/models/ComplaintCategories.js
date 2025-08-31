import mongoose from "mongoose";

const complaintCategoriesSchema = new mongoose.Schema({
  productCategory: { type: String, required: true, unique: true },
  issues: [{ type: String, required: true }],
});

const ComplaintCategories = mongoose.models.ComplaintCategories || mongoose.model("ComplaintCategories", complaintCategoriesSchema);

export default ComplaintCategories;