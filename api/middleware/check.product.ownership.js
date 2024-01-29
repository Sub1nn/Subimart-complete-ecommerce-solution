import Product from "../product/product.model.js";

export const checkProductOwnership = async (req, res, next) => {
  //get product id from req.params.id
  const productId = req.params.id;

  // find product
  const product = await Product.findById(productId);

  // if not product, throw error
  if (!product) {
    return res.status(404).send({ message: "Product does not exist" });
  }

  // get the user _id which was set inside req as loggedInUserId during authentication
  const ownerId = req.loggedInUserId;

  // check product ownership
  const isOwner = ownerId.equals(product.ownerId);

  // if not owner throw error
  if (!isOwner) {
    return res
      .status(403)
      .send({ message: "You are not the owner of this product" });
  }
  next();
};
