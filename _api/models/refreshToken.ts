import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const refreshToken = new Schema({
  token:{
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  generatedAt: {
    type: Date,
    default:new Date(),
  }
});

// @ts-ignore
// mongoose.models = {};
// var RefreshToken = mongoose.model('refreshToken', refreshToken);
// export default RefreshToken;