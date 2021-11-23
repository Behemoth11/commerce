import mongoose from 'mongoose';
require("dotenv").config()

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  
  await mongoose.connect(process.env.mongodburl, {
  }, () => console.log("I am connnected"));

  return await handler(req, res);
};

export default connectDB;