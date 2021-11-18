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
    rating: {
      type: Number,
    },
    location: {
      type: String,
      default: "unknown",
    },
    related: {
      type: Array,
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
  },
  { strict: true }
);

// @ts-ignore
mongoose.models = {
  owner: "",
};

var Product = mongoose.model("Product", product);

// Product.watch().
//     on('change', data => console.log(new Date(), data));
export default Product;
