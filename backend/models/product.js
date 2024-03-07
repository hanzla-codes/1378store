import mongoose from "mongoose";

const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name is atleast 3 charactor long"],
      },
      price: {
        type: Number,
        required: [true, "Price is required"],
      },
      description: {
        type: String,
      },
      category: {
        type: String,
      },
      fabric: {
        type: String,
      },
      color: {
        type: String,
      },
      image: {
        type: String,
      },
      countInStock: {
        type: Number,
        default: 0,
      },
      rating: {
        type: Number,
        default: 0,
      },
      numReviews: {
        type: Number,
        default: 0,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Product;
