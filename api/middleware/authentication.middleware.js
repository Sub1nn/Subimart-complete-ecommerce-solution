import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";

// user role
export const isUser = async (req, res, next) => {
  //  extract token from req.headers

  const authorization = req.headers.authorization;

  const splittedToken = authorization?.split(" ");

  const token = splittedToken?.length === 2 ? splittedToken[1] : null;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  const user = await User.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUser = user;

  next();
};

// seller role

export const isSeller = async (req, res, next) => {
  // extract token from req.headers

  const authorization = req.headers.authorization;
  const splittedToken = authorization?.split(" ");
  const token = splittedToken?.length === 2 ? splittedToken[1] : null;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //   find user
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "seller") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUser = user;
  req.loggedInUserId = user._id;

  next();
};

// buyer role

export const isBuyer = async (req, res, next) => {
  // get the authorization from req.headers.authorization and split it and get the token from eg "bearer token"
  const authorization = req.headers.authorization;
  const splittedToken = authorization?.split(" ");
  const token = splittedToken.length === 2 ? splittedToken[1] : null;
  // if not token throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized token holder" });
  }
  // let a payload to store token information after jwt verification
  let payload;
  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status.send({ message: "Unauthorized" });
  }
  // find user
  const user = await User.findOne({ email: payload.email });
  // if not user throw error
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  // if user role is not buyer throw error
  if (user.role !== "buyer") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // put the user information as loggedInUser inside req, explicitly you can put the more specific user information like user._id as loggedInUserId inside req.
  req.loggedInUser = user;
  req.loggedInUserId = user._id;
  next();
};
