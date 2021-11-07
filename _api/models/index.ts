import mongoose from "mongoose";
import { user } from "./user";
import { product } from "./Product";
import { feedback } from "./feedback";
import { refreshToken } from "./refreshToken";
import { contactMessage } from "./contact_message";

export const User = mongoose.model("User", user);
export const Product = mongoose.model("Product", product);
export const Feedback = mongoose.model("Feedback", feedback);
export const RefreshToken = mongoose.model("RefreshToken", refreshToken);
export const ContactMessage = mongoose.model("ContactMessage", contactMessage);
