import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      orderedQuantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  orderStatus: {
    type: String,
    required: true,
    enum: [
      "Pending",
      "Completed",
      "User canceled",
      "Initiated",
      "Refunded",
      "Expired",
    ],
  },
  orderTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  pidx: {
    type: String,
    required: true,
    trim: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
