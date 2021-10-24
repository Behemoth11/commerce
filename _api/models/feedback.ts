import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var feedback = new Schema({
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
var Feedback = mongoose.model('feedback', feedback);
export default Feedback;