import mongoose from 'mongoose';
require("dotenv").config()

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
     await handler(req, res);
     return;
  }
  
  await mongoose.connect(process.env.mongodburl, {
  }, () => console.log("I am connnected"));

   await handler(req, res);
   return;
};

export const connectDB_frontend = async (...args) => {
   if (mongoose.connections[0].readyState) {
      return;
   }
   
   await mongoose.connect(process.env.mongodburl, {
   }, () => console.log("Database connected"));
    return;
}
export default connectDB;