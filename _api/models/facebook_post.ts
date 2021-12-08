import mongoose from "mongoose";
var Schema = mongoose.Schema;

export const facebookPost = new Schema({
  grouping: {
    type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    required: true,
  },
  lastEdit: {
    type: Number,
    required: true,
  },
  host: {
    type: String,

  },
  published: {
    kdshop: {
      type: Boolean,
      default: false,
    },
    fb: {
      type: Boolean,
      default: false,
    },
  },
  fb_id: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  post_name: {
    type: "String",
  },
  post_type:{
    type: String,
    required: true,
  },
  post_date:{
    type: String,
  },
  frequency: {
    type: String,
  },
  selected_days:{
    type: [String],
  },
  selected_monthly: {
    type: String
  },
  custom_frequency: {
    type: Number,
  },
  next_date: {
    type: String,
  }
});
