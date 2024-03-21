import express from "express";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Order from "../order/order.model.js";
import { isBuyer } from "../middleware/authentication.middleware.js";

const router = express.Router();

// payment route

router.post("/order/payment/create", isBuyer, async (req, res) => {
  const { amount, orderItems } = req.body;

  const buyerId = req.loggedInUserId;

  try {
    // initiate the payment
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "http://localhost:5173/order/payment/success",
        website_url: "http://localhost:5173/",
        amount: amount * 100, // khalti converts amount to paisa
        purchase_order_id: uuidv4(),
        purchase_order_name: "order1",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "key 4e7eaf8120064cceae3b94e5fe483752 ",
        },
      }
    );

    const pidx = response.data.pidx;

    await Order.create({
      buyerId,
      pidx,
      orderItems,
      orderTotal: amount,
      orderStatus: "Initiated",
    });

    return res.status(200).send({
      message: "payment created successfully",
      orderInfo: response.data,
    });
  } catch (error) {
    // Send an error response back to the client
    return res.status(500).send({ error: error.message });
  }
});

export default router;
