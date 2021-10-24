import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var contactMessage = new Schema({
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
var ContactMessage = mongoose.model('ContactMessage', contactMessage);
export default ContactMessage;