import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import { parse } from "csv-parse";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Review from "../models/Review.js";
import Complaint from "../models/Complaint.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected.");

    console.log("Clearing old data.");
    await User.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Complaint.deleteMany({});
    console.log("Collections cleared.");

    console.log("Creating mock users.");
    const users = await User.create([
      { name: "Mahi S.", email: "mahi30@example.com", role: "consumer", verified: true },
      { name: "Shreeya S.", email: "shreeya@example.com", role: "consumer", verified: true },
      { name: "Qudsiya S.", email: "anjali@example.com", role: "consumer", verified: true },
      { name: "KitchenPro_Official", email: "support@kitchenpro.com", role: "company", verified: true },
    ]);
    const consumerUsers = users.filter(u => u.role === 'consumer');
    const companyUser = users.find(u => u.role === 'company');
    console.log(`Created ${users.length} mock users.`);

    console.log("Reading products_for_import.csv.");
    const productsParser = fs.createReadStream("./scripts/data/products_for_import.csv").pipe(parse({ columns: true, cast: true, trim: true }));
    const productsToCreate = [];
    for await (const row of productsParser) {
      const specObject = JSON.parse(row.specifications.replace(/'/g, '"'));
      productsToCreate.push({ ...row, specifications: specObject });
    }
    const products = await Product.insertMany(productsToCreate);
    console.log(`Seeded ${products.length} products.`);

    const productMap = new Map(products.map(p => [p.id, p._id]));

    console.log("Reading reviews_for_import.csv.");
    const reviewsParser = fs.createReadStream("./scripts/data/reviews_for_import.csv").pipe(parse({ columns: true, cast: true, trim: true }));
    const reviewsToCreate = [];
    for await (const row of reviewsParser) {
      if (!productMap.has(row.product_id)) continue; 
      
      const pipelineOutput = JSON.parse(row.pipeline_output);
      
      reviewsToCreate.push({
        productId: productMap.get(row.product_id),
        userId: consumerUsers[Math.floor(Math.random() * consumerUsers.length)]._id, 
        overall_rating: row.overall_rating || 0,
        ratings: JSON.parse(row.ratings.replace(/'/g, '"')),
        text: row.text,
        pipeline_output: pipelineOutput,
      });
    }
    await Review.insertMany(reviewsToCreate);
    console.log(`Seeded ${reviewsToCreate.length} reviews.`);

    console.log("Reading complaints_for_import.csv.");
    const complaintsParser = fs.createReadStream("./scripts/data/complaints_for_import.csv").pipe(parse({ columns: true, cast: true, trim: true }));
    const complaintsToCreate = [];
    for await (const row of complaintsParser) {
        if (!productMap.has(row.product_id)) continue;

        complaintsToCreate.push({
            productId: productMap.get(row.product_id),
            userId: consumerUsers[Math.floor(Math.random() * consumerUsers.length)]._id,
            companyId: companyUser._id, 
            productName: row.productName,
            selectedIssues: JSON.parse(row.selectedIssues.replace(/'/g, '"')),
            severityLevel: row.severityLevel,
            incidentDate: new Date(row.incidentDate),
            description: row.description,
            status: row.status,
            upvotes: row.upvotes
        });
    }
    await Complaint.insertMany(complaintsToCreate);
    console.log(`Seeded ${complaintsToCreate.length} complaints.`);

  } catch (error) {
    console.error("An error occurred during seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed. Seeding complete.");
  }
};

seedDatabase();