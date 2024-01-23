import bcrypt from "bcrypt";
import { User } from "./user.model.js";

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
