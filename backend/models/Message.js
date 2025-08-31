import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint", required: true },
  from: { type: String, enum: ["user", "company"], required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
}, { timestamps: { createdAt: "timestamp", updatedAt: false } });

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
