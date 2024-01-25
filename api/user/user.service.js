import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";

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

  // send response
  return res.status(200).send({ message: "user registered successfully!" });
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
  return res.status(200).send({ user: user, token: accessToken });
};
