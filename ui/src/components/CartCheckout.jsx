import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const CartCheckout = ({ subTotal, discount, grandTotal }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
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
      <Button variant="contained" color="success" sx={{ mt: "1rem" }}>
        Proceed to checkout
      </Button>
    </Box>
  );
};

export default CartCheckout;
