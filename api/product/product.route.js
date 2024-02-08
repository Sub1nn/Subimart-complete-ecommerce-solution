import express from "express";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { productSchema } from "./product.validation.js";
import {
  isBuyer,
  isSeller,
  isUser,
} from "../middleware/authentication.middleware.js";
import Product from "./product.model.js";
// import mongoose from "mongoose";
import { checkMongoIdValidity } from "../utils/check.mongo.id.validity.js";
import { checkProductOwnership } from "../middleware/check.product.ownership.js";
import { paginationSchema } from "./product.validation.js";

const router = express.Router();

// add product

router.post(
  "/product/add",
  isSeller,
  validateReqBody(productSchema),
  async (req, res) => {
    //    extract new product from req.body
    const newProduct = req.body;

    // set loggedInUserId as newProduct.ownerId
    newProduct.ownerId = req.loggedInUser._id;

    // create product
    await Product.create(newProduct);

    return res.status(200).send({ message: "Product is added successfully." });
  }
);

// get a single product details from product :id

router.get(
  "/product/details/:id",
  isUser,
  checkMongoIdValidity,
  async (req, res) => {
    // extract id from req.params
    const productId = req.params.id;

    // find product and keep in a variable requiredProduct
    const requiredProduct = await Product.findOne({ _id: productId });

    // if not product, throw error

    if (!requiredProduct) {
      return res.status(404).send({ message: "Product does not exist." });
    }

    //   hide ownerId
    requiredProduct.ownerId = undefined;

    // send product details as response
    return res
      .status(200)
      .send({ message: "success", product: requiredProduct });
  }
);

// delete product

router.delete(
  "/product/delete/:id",
  isSeller,
  checkMongoIdValidity,
  checkProductOwnership,
  async (req, res) => {
    // get id from req.params
    const productId = req.params.id;
    // delete that one product
    await Product.deleteOne({ _id: productId });
    return res.status(200).send({ message: "Product is deleted successfully" });
  }
);

// edit a product

router.put(
  "/product/update/:id",
  isSeller,
  checkMongoIdValidity,
  checkProductOwnership,
  validateReqBody(productSchema),
  async (req, res) => {
    // get id from req.params
    const { id } = req.params;
    // get new values from req.body
    const newValues = req.body;
    // update product
    await Product.updateOne({ _id: id }, { $set: { ...newValues } });
    // send response with message
    return res.status(200).send({ message: "Product is updated successfully" });
  }
);

// get all product list by buyer

router.post(
  "/product/buyer/list",
  isBuyer,
  validateReqBody(paginationSchema),
  async (req, res) => {
    //   const { page, limit } = req.query;
    //   const skip = limit * (page - 1);
    //   const products = await Product.find({ ownerId: req.loggedInUser._id })
    //  .skip(skip)
    //  .limit(limit);
    //   return res.status(200).send({ products });

    // extract pagination data from req.body
    const { page, limit, searchText } = req.body;
    // calculate skip
    const skip = (page - 1) * limit;

    // filter stage

    let match = {};

    if (searchText) {
      match = { name: { $regex: searchText, $options: "i" } };
    }

    //create the query

    let products = await Product.aggregate([
      {
        $match: match,
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          name: 1,
          price: 1,
          brand: 1,
          image: 1,
          description: { $substr: ["$description", 0, 200] },
        },
      },
    ]);
    return res.status(200).send({ message: "success", products: products });
  }
);

// get all product list by seller
router.post(
  "/product/seller/list",
  isSeller,
  validateReqBody(paginationSchema),
  async (req, res) => {
    // extract pagination data from req.body
    const { page, limit, searchText } = req.body;

    // calculate skip
    const skip = (page - 1) * limit;

    // filter stage
    let match = { ownerId: req.loggedInUserId };

    if (searchText) {
      match = {
        ownerId: req.loggedInUserId,
        name: { $regex: searchText, $options: "i" },
      };
    }

    let products = await Product.aggregate([
      {
        $match: match,
      },
      {
        $skip: skip,
      },
      { $limit: limit },
      {
        $project: {
          name: 1,
          brand: 1,
          price: 1,
          image: 1,
        },
      },
    ]);

    return res.status(200).send({ message: "success", products: products });
  }
);

export default router;
