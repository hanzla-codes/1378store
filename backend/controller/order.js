import Order from "../models/order.js";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51IutRpCcy8OEmYvUq77adzYjJTDLe8TJl5UW6eg99TzYWTfIofFKeY4G30I70p7ajKhlAuw8lXfCjgpRDxAyxZUX004L1dEEEP"
);

//PATH      /api/orders
//METHOD    POST
//ACCESS    Private
//DESC      Create new order
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    saleTax,
    shippingPrice,
    subTotal,
    totalPrice,
    paymentMethod,
  } = req.body;

  await stripe.paymentIntents.create({
    currency: "PKR",
    amount: totalPrice * 100,
    confirm: true,
    payment_method: paymentMethod.id,
    description: `Payment received for ${orderItems.length} items.`,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });

  const order = new Order({
    orderItems,
    shippingAddress,
    saleTax,
    shippingPrice,
    subTotal,
    totalPrice,
    paymentMethod,
    user: req.user._id,
    isPaid: true,
    paidAt: new Date(),
  });
  const createdOrder = await order.save();
  return res.json({ _id: createdOrder._id });
});

//PATH      /api/orders/:id
//METHOD    GET
//ACCESS    Private
//DESC      Get order by id
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "_id, name email");
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (order.user._id == req.user._id || req.user.isAdmin) {
    return res.json(order);
  }

  res.status(403);
  throw new Error("You don't have permission to view this order");
});

//PATH      /api/orders
//METHOD    GET
//ACCESS    Private
//DESC      Get my orders
export const getMyOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  return res.json(orders);
});
