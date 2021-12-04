import mongoose from "mongoose";
var Schema = mongoose.Schema;

export const product = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    nature: {
      type: String, 
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    tags: {
      type: Array,
      required: false,
    },
    color: {
      type: Array,
      required: false
    },
    rating: {
      type: Number,
    },
    location: {
      type: String,
      default: "unknown",
    },
    fb: {
      published: {
        type: Boolean,
        default: false,
      },
      post_id: {
        type: Array,
        default: null,
      },
      date_published:{
        type: Number,
      }
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pr_image_url: {
      type: Array,
      minlength: 1,
      required: true,
    },
    all_pr_image_url: {
      type: Array,
    },
    representation: {
      type: String,
      default: "none",
    },
    addedAt: {
      type: Number,
      required: true,
    },
  }
);
