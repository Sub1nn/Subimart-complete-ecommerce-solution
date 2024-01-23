import * as Yup from "yup";
import { GenderOptions, UserRoles } from "../constants/general.constant.js";

export const userSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .trim()
    .max(55, "First name must be at max 55 characters"),
  lastName: Yup.string()
    .required("First name is required")
    .trim()
    .max(55, "First name must be at max 55 characters"),
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required")
    .trim()
    .lowercase()
    .max(55, "Email must be at max 55 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  gender: Yup.string().oneOf(GenderOptions).trim(),
  dob: Yup.date(),
  role: Yup.string().oneOf(UserRoles).required("Role is required").trim(),
});

// validating min, max values are not needed during login
export const loginUserSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required")
    .trim()
    .lowercase(),
  password: Yup.string().required("Password is required"),
});
