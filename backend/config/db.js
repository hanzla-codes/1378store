import mongoose from "mongoose";
import colors from "colors";

const ConnectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((mongo) => {
      console.log(
        `Database connected with host ${mongo.connection.host}`.bgGreen
      );
    })
    .catch((err) => {
      console.error(`Unable to connect : ${err.message}`.bgRed);
      process.exit(1);
    });
};

export default ConnectDb;
