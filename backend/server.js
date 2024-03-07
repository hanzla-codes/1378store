import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import path from "path";
import errorHandler from "./middlewares/errorHandler.js";
import ConnectDb from "./config/db.js";

import productRoute from "./routes/product.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

ConnectDb();

const app = express();
app.use(morgan("common"));
// app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "API is running..." });
});

app.use("/api/products", productRoute);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

const __dir = path.resolve();
console.log(__dir);

if (process.env.NODE_MODE !== "development") {
  app.use("/", express.static(path.join(__dir, "client", "dist")));

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dir, "client", "dist", "index.html"));
  });
}

app.use(errorHandler);

const port = process.env.NODE_PORT || 5000;
app.listen(port, () => {
  console.log(
    `App is running in ${process.env.NODE_MODE} mode at ${port} port.`.bgGreen
  );
});
