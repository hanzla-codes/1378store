import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name is atleast 3 charactor long"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Passowrd is required"],
        minLength: [6, "Password is atleast 6 charactor long"],
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default User;
