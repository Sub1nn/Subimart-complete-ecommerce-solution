import mongoose from "mongoose";

export const checkMongoIdValidity = (req, res, next) => {
  //get the itemId from req.params.id or simply destructure the object
  const { id } = req.params;

  //check for mongod Id validity
  const isValidMongoId = mongoose.Types.ObjectId.isValid(id);

  // if not valid mongo id throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo Id" });
  }
  next();
};
