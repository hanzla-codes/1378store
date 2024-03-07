import Product from "../models/product.js";
import asyncHandler from "express-async-handler";

//PATH      /api/products
//METHOD    GET
//ACCESS    Public
//DESC      Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true });
  return res.json(products);
});

//PATH      /api/products/:id
//METHOD    GET
//ACCESS    Public
//DESC      Get product by id
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product && product.isActive) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});
