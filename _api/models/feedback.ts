import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const feedback = new Schema({
  msg:{
    type: String,
    required: true,
  },
  focus:{
    type: Array,
    required: true,
  }
});
