import express from "express";
import { loginUserSchema, userSchema } from "./user.validation.js";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { registerUser } from "./user.service.js";

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
  validateReqBody(loginUserSchema),

  (req, res, next) => {
    console.log(req.body);
    return res.status(200).send({ message: "Login successful" });
  }
);

export default router;
