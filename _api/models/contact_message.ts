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
  },
  contact: {
    type: Array,
    required: true,
  },
  sender_id:{
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
