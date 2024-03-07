import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

//PATH      /api/admin/products
//METHOD    GET
//ACCESS    Private
//DESC      Get products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});

//PATH      /api/admin/orders
//METHOD    GET
//ACCESS    Private
//DESC      Get orders
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "_id name email");
  return res.json(orders);
});

//PATH      /api/admin/users
//METHOD    GET
//ACCESS    Private
//DESC      Get users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  return res.json(users);
});

//PATH      /api/admin/products
//METHOD    POST
//ACCESS    Private
//DESC      Create new product
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Product",
    price: 0,
    user: req.user._id,
  });
  const newProduct = await product.save();
  return res.json({ productId: newProduct._id });
});

//PATH      /api/admin/products/:id
//METHOD    PUT
//ACCESS    Private
//DESC      Update a product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    category,
    fabric,
    color,
    countInStock,
    image,
    isActive,
  } = req.body;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.fabric = fabric || product.fabric;
  product.color = color || product.color;
  product.image = image || product.image;
  product.countInStock = countInStock || product.countInStock;
  product.isActive = isActive;

  const updatedProduct = await product.save();
  return res.json(updatedProduct);
});

//PATH      /api/admin/products/:id
//METHOD    GET
//ACCESS    Private
//DESC      Get product for edit
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});
