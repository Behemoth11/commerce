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

// @ts-ignore
mongoose.models = {};
var Feedback = mongoose.model('Feedback', feedback);
export default Feedback;