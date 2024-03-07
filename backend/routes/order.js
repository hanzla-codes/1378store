import express from "express";
import { createOrder, getMyOrder, getOrderById } from "../controller/order.js";
import authHandler from "../middlewares/authHandler.js";
const router = express.Router();

router.post("/", authHandler, createOrder);
router.get("/:id", authHandler, getOrderById);
router.get("/", authHandler, getMyOrder);

export default router;
