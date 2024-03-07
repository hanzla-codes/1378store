import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import Product from "./models/product.js";
import User from "./models/user.js";
import products from "./data/products.js";
import users from "./data/users.js";

dotenv.config();
ConnectDb();

const SeedData = async () => {
  try {
    const dbUsers = await User.insertMany(users);
    const [adminUser] = dbUsers;

    const updatedProduct = products.map((product) => {
      return {
        ...product,
        user: adminUser._id,
        isActive: true,
      };
    });

    await Product.insertMany(updatedProduct);
    console.log("Data seeded".bgGreen);
    process.exit();
  } catch (error) {
    console.log(`Unable to seed data ${error.message}`.bgRed);
    process.exit(1);
  }
};

const DeleteData = async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log("Data deleted".bgGreen);
    process.exit();
  } catch (error) {
    console.log(`Unable to delete data ${error.message}`.bgRed);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  DeleteData();
} else {
  SeedData();
}
