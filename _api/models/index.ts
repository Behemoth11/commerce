const mongoose = require("mongoose")
import { user } from "./user";
import { product } from "./Product";
import { feedback } from "./feedback";
import { refreshToken } from "./refreshToken";
import { facebookPost } from "./facebook_post";
import { contactMessage } from "./contact_message";

//@ts-ignore
mongoose.models = {}

export const User = mongoose.model("User", user);
export const Product = mongoose.model("Product", product);
export const Feedback = mongoose.model("Feedback", feedback);
export const FacebookPost = mongoose.model("FacebookPost", facebookPost);
export const RefreshToken = mongoose.model("RefreshToken", refreshToken);
export const ContactMessage = mongoose.model("ContactMessage", contactMessage);