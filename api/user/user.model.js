import mongoose from "mongoose";
import { GenderOptions, UserRoles } from "../constants/general.constant.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 55,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 55,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 55,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: false,
      enum: GenderOptions,
      default: null,
    },
    dob: {
      type: Date,
      required: false,
      default: null,
    },
    role: {
      type: String,
      required: true,
      enum: UserRoles,
      default: "buyer",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
