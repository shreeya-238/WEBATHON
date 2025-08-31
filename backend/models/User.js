import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String }, // null if using OAuth
  role: { type: String, enum: ["consumer", "company", "admin"], required: true },
  phone: { type: String },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
