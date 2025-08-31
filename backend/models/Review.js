import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },

  // Ratings
  overall_rating: { type: Number, min: 0, max: 5, required: true },
  ratings: {
    type: Map,
    of: Number, // category-specific criteria
    default: {}
  },

  // Review Text
  text: { type: String, required: true },

  // Moderation & Analysis Pipeline Output
  pipeline_output: {
    status: { type: String, enum: ["Accepted", "Rejected"], required: true },

    // Only present if Rejected
    reason: { type: String },

    // If Accepted → enrichments
    sentiment: {
      label: { type: String, enum: ["POSITIVE", "NEGATIVE", "NEUTRAL"], default: "NEUTRAL" },
      score: { type: Number, default: 0 }
    },

    details: {
      spam_check: {
        label: { type: String, enum: ["spam", "ham"], default: "ham" },
        score: { type: Number, default: 0 }
      },
      keyword_flag: { type: Boolean, default: false },
      abuse_check: {
        label: { type: String, enum: ["offensive", "non-offensive"], default: "non-offensive" },
        score: { type: Number, default: 0 }
      }
    }
  }
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
