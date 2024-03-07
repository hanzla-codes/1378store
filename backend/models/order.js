import mongoose from "mongoose";

const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      orderItems: [
        {
          name: String,
          image: String,
          qty: Number,
          price: Number,
          countInStock: Number,
          product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
        },
      ],
      shippingAddress: {
        street: String,
        city: String,
        country: String,
        phone: String,
        extraDetails: String,
      },
      saleTax: Number,
      shippingPrice: Number,
      subTotal: Number,
      totalPrice: Number,
      paymentMethod: {
        id: String,
        card: String,
        last4: String,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      isDeliver: {
        type: Boolean,
        default: false,
      },
      paidAt: {
        type: Date,
      },
      deliverAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Order;
