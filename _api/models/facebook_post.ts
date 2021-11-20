import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const facebookPost = new Schema({
  msg:{
    type: String,
    required: true,
  },
  focus:{
    type: Array,
    required: true,
  }
});
