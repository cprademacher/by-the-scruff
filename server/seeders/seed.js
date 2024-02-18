import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/Product.js";

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/driftwood-clothing-co");
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("Products are added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
