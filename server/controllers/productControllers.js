import Product from "../models/Product.js";

// Get all products => /api/products
export const getProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    products,
  });
};

// Create new product => /api/admin/products
export const newProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
};
