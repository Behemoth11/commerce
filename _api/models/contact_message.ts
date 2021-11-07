import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const contactMessage = new Schema({
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