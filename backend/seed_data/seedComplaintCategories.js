import mongoose from "mongoose";
import { ComplaintCategories } from "./models/ComplaintCategories.js";

dotenv.config();

const complaintCategoriesData = [
  {
    productCategory: "Food & Beverages",
    issues: [
      "Expired",
      "Contaminated / Spoiled",
      "Caused Illness",
      "Stale / Rotten",
      "Tasteless / Poor Flavor",
      "Not as Advertised (e.g., 'Sugar-Free', 'Organic')",
      "Packaging Issue",
      "Other",
    ],
  },
  {
    productCategory: "Cosmetics & Personal Care",
    issues: [
      "Allergic Reaction / Irritation",
      "Harmful Chemicals",
      "Ineffective (Doesn’t Work)",
      "Not Long-Lasting",
      "Wrong Shade / Fragrance",
      "Packaging Issue",
      "Other",
    ],
  },
  {
    productCategory: "Clothing & Apparel",
    issues: [
      "Poor Fabric Quality",
      "Bad Stitching / Loose Threads",
      "Wrong Size",
      "Poor Fit",
      "Shrinks After Wash",
      "Fades / Color Bleeding",
      "Other",
    ],
  },
  {
    productCategory: "Electronics & Gadgets",
    issues: [
      "Slow / Laggy Performance",
      "Poor Battery Life",
      "Doesn’t Function as Promised",
      "Breaks Easily",
      "Overheating",
      "Electric Shock / Fire Hazard",
      "Other",
    ],
  },
  {
    productCategory: "Home Appliances",
    issues: [
      "Doesn’t Clean / Cook Properly",
      "Weak Power / Low Performance",
      "Breaks Down Frequently",
      "Short Lifespan",
      "Fire Hazard",
      "Gas Leak / Shock Risk",
      "Other",
    ],
  },
  {
    productCategory: "Toys & Baby Products",
    issues: [
      "Choking Hazard",
      "Sharp Edges",
      "Toxic Material / Paint",
      "Poor Build Quality",
      "Breaks Easily",
      "Parts Falling Off",
      "Other",
    ],
  },
  {
    productCategory: "Furniture & Home Décor",
    issues: [
      "Cheap Material / Poor Finish",
      "Weak / Wobbly",
      "Breaks Easily",
      "Wrong Size / Dimensions",
      "Doesn’t Match Order",
      "Other",
    ],
  },
  {
    productCategory: "Pharmaceuticals & Health Products",
    issues: [
      "Expired",
      "Caused Side Effects",
      "Wrong Dosage Info",
      "Ineffective (Didn’t Work)",
      "Misleading Claims",
      "Wrong / Missing Instructions",
      "Other",
    ],
  },
];


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear old data
    await ComplaintCategories.deleteMany({});

    // Insert fresh
    await ComplaintCategories.insertMany(complaintCategoriesData);

    console.log("✅ Complaint categories seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding complaint categories:", err);
    process.exit(1);
  }
}

seed();
