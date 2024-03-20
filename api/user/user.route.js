import express from "express";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { loginUser, registerUser } from "./user.service.js";
import { loginUserSchema, userSchema } from "./user.validation.js";
import { User } from "./user.model.js";
import sendEmail from "../utils/email.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// register user
// router.route('/user/register').post(validateReqBody(userSchema), registerUser);

router.post(
  "/user/register",
  // registering user takes two functions, one for validating and another for creating the user. Here we are using the validateReqBody global validation function and passing the userSchema to the function for validation.
  validateReqBody(userSchema),
  registerUser
);

// login user

router.post(
  "/user/login",
  // login user takes two functions, one for validating and another for logging in the user. Here we are using the validateReqBody global validation function and passing the userSchema to the function for validation.
  validateReqBody(loginUserSchema),
  loginUser
);

// change user password

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate password reset token
  const resetToken = user.generatePasswordResetToken();

  await user.save({ validateBeforeSave: false });

  // Send the password reset link to the user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;
  const message = `Forgot your password? Click on the following link to reset your password: ${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    return res
      .status(200)
      .json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route for handling the password reset link
router.patch("/reset-password/:token", async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const resetToken = req.params.token;
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Validate that newPassword and confirmPassword are present
  if (!newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Both newPassword and confirmPassword are required" });
  }

  // Validate that newPassword and confirmPassword match
  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "New password and confirm password do not match" });
  }

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Hash the new password before saving it
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  // Log in the user by generating a new authentication token
  const accessToken = jwt.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );

  // Include the token in the response along with other necessary information
  return res.status(200).json({
    message: "Password changed successfully",
    token: accessToken,
  });
});

// Email verification route

router.get("/verify-email", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email parameter is missing" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already verified
    if (user.verified) {
      return res
        .status(200)
        .json({ message: "Email already verified", redirect: "/login" });
    }

    // Update user's email verification status
    user.verified = true;
    await user.save();

    return res
      .status(200)
      .json({ message: "Email verified successfully", redirect: "/login" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
