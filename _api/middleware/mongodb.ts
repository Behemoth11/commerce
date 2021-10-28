import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  
  await mongoose.connect(process.env.mongodburl, {
  }, () => console.log("I am connnected"));

  return handler(req, res);
};

export default connectDB;