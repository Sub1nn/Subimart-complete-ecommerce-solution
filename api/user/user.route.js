import express from "express";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { loginUser, registerUser } from "./user.service.js";
import { loginUserSchema, userSchema } from "./user.validation.js";

const router = express.Router();

// register user

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

export default router;
tr78iu