import express from "express";

import { isBuyer } from "../middleware/authentication.middleware.js";
import Product from "./cart.model.js";

const router = express.Router();

//add item to cart

router.post(
  "/cart/add/item",
  isBuyer,
  async (req, res, next) => {
    // extract item from req.body
    const cartItem = req.body;

    // validate item
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
    // check if product exists
    const product = await Product.findOne({ _id: item.productId });

    // if not product, throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }
    // ? check for product quantity
    // if (product.quantity < item.orderedQuantity) {
    //   return res
    //  .status(400)
    //  .send({ message: "Not enough product in stock." });
    // }
    // ? add item to cart
    // const newItem = new Product(item);
    // await newItem.save();
    // res.status(201).send(newItem);

    // if quantity not available throw error
    if (item.orderedQuantity > product.quantity) {
      return res.status(422).send({ message: "Product is outnumbered." });
    }

    // check if product is already added for this user
    const cartItem = await Cart.findOne({
      productId: item.productId,
      buyerId: item.buyerId,
    });
    if (cartItem) {
      return res.status(409).send({ message: "Product already in cart." });
    }
    // Create the cart, add item to the cart
    await Cart.create(item);
    // return response
    return res
      .status(201)
      .send({ message: "Item is added to the cart successfully." });
  }
);

export default router;
