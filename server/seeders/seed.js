import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/Product.js";

const seedProducts = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://cprademacher36:Mustangs1!@bythescruff.ywrymgk.mongodb.net/ByTheScruff?retryWrites=true&w=majority&appName=ByTheScruff"
    );
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
