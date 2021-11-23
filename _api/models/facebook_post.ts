import mongoose from "mongoose";
var Schema = mongoose.Schema;

export const facebookPost = new Schema({
  grouping: {
    type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    required: true,
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
});
