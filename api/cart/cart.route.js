import express from "express";

import { isBuyer } from "../middleware/authentication.middleware.js";
import Product from "./cart.model.js";

const router = express.Router();

//add item to cart

router.post(
  "/cart/add/item",
  isBuyer,
  async (req, res, next) => {
    const cartItem = req.body;
    try {
      const validatedData = await addProductToCartValidationSchema.validate(
        cartItem
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  async (req, res) => {
    // extract item from req.body
    const item = req.body;
    // add buyerId in the item
    item.buyerId = req.loggedInUserId;
    // check productId for mongoIdValidity
    const isValidMongoId = mongoose.Types.ObjectId.isValid(item.productId);
    // if not valid mongo id
    if (!isValidMongoId) {
      return res.status(400).send({ message: "Invalid mongo id" });
    }
    const product = await Product.findOne({ _id: item.productId });

    // if not product, throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }
  }
);

export default router;
