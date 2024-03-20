import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/email.js";

// register new user

export const registerUser = async (req, res) => {
  const newUser = req.body;
  // check if user is already registered with the email
  const user = await User.findOne({ email: newUser.email });
  //if user, throw an error
  if (user) {
    return res
      .status(409)
      .send({ message: "user with the email already exists" });
  }
  // hash password
  const hashedPassword = await bcrypt.hash(newUser.password, 10);

  // replace newUser password with the hashed password
  newUser.password = hashedPassword;

  // create user
  await User.create(newUser);

  // Send the verification link link to the user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/verify-email/${encodeURIComponent(newUser.email)}`;
  const message = `Click on the following link to verify your email: ${resetURL}`;

  try {
    await sendEmail({
      email: newUser.email,
      subject: "verify email",
      message,
    });

    return res
      .status(201)
      .json({ message: "Verification link send to your Email" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// login user

export const loginUser = async (req, res) => {
  // get login credentials from req.body
  const loginCredentials = req.body;
  // check if user exists
  const user = await User.findOne({ email: loginCredentials.email });
  if (!user) {
    return res.status(404).send({ message: "user not found" });
  }

  // Check if user's email is verified
  if (!user.verified) {
    // If email not verified, resend the verification link
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/verify-email/${encodeURIComponent(loginCredentials.email)}`;
    const message = `Click on the following link to verify your email: ${resetURL}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Verify your email",
        message,
      });
      return res
        .status(403)
        .send({ message: "Email not verified. Verification link sent again." });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // check if password matches
  const passwordMatch = await bcrypt.compare(
    loginCredentials.password,
    user.password
  );
  if (!passwordMatch) {
    return res.status(401).send({ message: "Invalid email or password" });
  }
  // remove password from user
  user.password = undefined;
  // create access token
  const accessToken = jwt.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );
  // return appropriate response and send user and accessToken as user and token
  return res
    .status(200)
    .send({ message: "Success", user: user, token: accessToken });
};
