import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log(("Connected to MongoDB"));
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected of MongoDB");
}
);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
}
);
app.listen(8800, () => {
  connect()
  console.log("Server is running on port 8800");
});
