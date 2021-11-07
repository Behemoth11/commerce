import mongoose from "mongoose";
var Schema = mongoose.Schema;

export type userType = {
  username: string;
  password: string;
  role: string;
  cart: [];
  _id: string;
  phonenumber: string;
  firstName: string;
  lastName: string;
};

export const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  cart: {
    type: Array,
    default: [],
  },
  phoneNumber: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  pr_pic: {
    type: String,
  },
  email:{
    type: String
  },
  Oauth: {
    method:{
      type: String
    },
    id:{
      type: String
    }
  }
});

// @ts-ignore
// mongoose.models = {};
// const User = mongoose.model("User", user);

// export default User;
