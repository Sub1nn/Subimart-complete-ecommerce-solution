import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useMutation } from "react-query";
import $axios from "../../lib/axios.instance";
import Loader from "./Loader";

const CartCheckout = ({ subTotal, discount, grandTotal, orderProductList }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { isLoading, mutate: orderCheckout } = useMutation({
    mutationKey: ["initiate-payment"],
    mutationFn: async () => {
      return await $axios.post("/order/payment/create", {
        amount: +grandTotal,
        orderItems: orderProductList,
      });
    },
    onSuccess: (res) => {
      console.log(res);
      const paymentUrl = res?.data?.orderInfo?.payment_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        console.error("Payment URL not found in response");
      }
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        width: isMobile ? "95%" : "80%",
        // height: "500px",
        padding: "1rem",
        // ml: "2rem",

        borderRadius: "10px",
        boxShadow:
          "  rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      }}
    >
      <Typography variant="h5">Order Summary</Typography>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography>Sub total</Typography>
        <Typography>$ {subTotal}</Typography>
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography>Discount</Typography>
        <Typography>$ {discount}</Typography>
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography>Grand total</Typography>
        <Typography>$ {grandTotal}</Typography>
      </Stack>
      <Button
        variant="contained"
        color="success"
        sx={{ mt: "1rem" }}
        onClick={() => {
          orderCheckout();
        }}
      >
        Proceed to checkout
      </Button>
    </Box>
  );
};

export default CartCheckout;
