import express from "express";
import {
  getOrders,
  getProducts,
  getUsers,
  createProduct,
  getProduct,
  updateProduct,
} from "../controller/admin.js";
import adminHandler from "../middlewares/adminHandler.js";
const router = express.Router();

router.get("/orders", adminHandler, getOrders);
router.get("/products", adminHandler, getProducts);
router.get("/users", adminHandler, getUsers);

router.get("/products/:id", adminHandler, getProduct);
router.post("/products", adminHandler, createProduct);
router.put("/products/:id", adminHandler, updateProduct);

export default router;
