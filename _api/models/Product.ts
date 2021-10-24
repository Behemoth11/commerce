import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const product = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: true,
  },
  description:{
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
    required: true
  },
  rating:{
    type: Number,
  },
  location:{
    type: String,
    default: "unknown",
  },
  related:{
    type: Array,
  },
  owner: {
    type: String,
    required: true,
  },
  pr_image_url:{
    type: Array,
    required: true
  },
  all_pr_image_url:{
    type: Array,
    required: true,
    minlength: 2,
  },
  representation:{
    type: String,
    default: "none",
  }
},{ strict: false });

// @ts-ignore
mongoose.models = {};

var Product = mongoose.model('Product', product);
// Product.watch().
//     on('change', data => console.log(new Date(), data));
export default Product;

