import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // brand/company account

    // Auto-filled from product
    productName: { type: String, required: true },

    // Complaint type(s) based on category
    selectedIssues: [{ type: String, required: true }],

    severityLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    incidentDate: { type: Date, required: true },

    description: {
      type: String,
      minlength: 50,
      required: true,
    },

    batchNumber: { type: String },
    location: { type: String },

    // Uploads
    evidenceFiles: [
      {
        fileUrl: String,
        fileType: {
          type: String,
          enum: ["image/jpeg", "image/png", "video/mp4"],
        },
        fileSize: Number, // in bytes
      },
    ],

    purchaseVerification: {
      fileUrl: String,
      fileType: { type: String, enum: ["image/jpeg", "image/png", "application/pdf"] },
      fileSize: Number
    },

    // Contact Info (stored redundantly in case user deletes account later)
    contactInfo: {
      name: String,
      email: String,
      phone: String,
    },

    // Complaint status lifecycle
    status: {
      type: String,
      enum: [
        "pending",
        "investigating",
        "resolved",
        "disputed",
      ],
      default: "pending",
    },

    resolutionNotes: String, // company/admin notes

    // For future analytics
    upvotes: { type: Number, default: 0 },
    riskScore: { type: Number, default: 0 },

    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

export const Complaint = mongoose.model("Complaint", complaintSchema);
