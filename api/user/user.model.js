import mongoose from "mongoose";
import { GenderOptions, UserRoles } from "../constants/general.constant.js";
import crypto from "crypto";

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
    verified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  { timestamps: true }
);

// Method to generate a password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(64).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
