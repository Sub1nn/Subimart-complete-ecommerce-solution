import React from "react";
import CartItem from "../components/CartItem";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CartCheckout from "../components/CartCheckout";
import { useMutation, useQuery, useQueryClient } from "react-query";
import $axios from "../../lib/axios.instance";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice";

const CartPage = () => {
  // const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { isLoading: flushLoading, mutate: flushCart } = useMutation({
    mutationKey: ["flush-cart"],
    mutationFn: async () => {
      return await $axios.delete("/cart/flush");
    },
    onSuccess: (response) => {
      dispatch(openSuccessSnackbar(response?.data?.message));
      queryClient.invalidateQueries("cart-item-list");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["cart-item-list"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  });

  const cartData = data?.data?.cartData;

  if (isLoading || flushLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        mt: "4rem",

        // textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          background: "linear-gradient(to right bottom, #ea0b0b, #370ed8)",
          pt: "2rem",
          ml: "4rem",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Shopping Cart
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          // alignItems: "center",
          mt: "2rem",
          pl: isMobile ? "1rem" : "0",

          borderRadius: "20px",
        }}
      >
        <Stack
          sx={{
            gap: "2rem",
            width: isMobile ? "100%" : "50%",
            m: isMobile ? "0" : "0 5rem 0 4rem",
          }}
        >
          {cartData.length > 0 && (
            <Button
              variant="contained"
              color="error"
              sx={{ width: "40%" }}
              onClick={flushCart}
            >
              Clear Cart
            </Button>
          )}
          {cartData.length > 0 ? (
            cartData.map((item) => {
              return <CartItem key={item._id} {...item} />;
            })
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                navigate("/product/list");
              }}
            >
              continue shopping
            </Button>
          )}
        </Stack>
        <Stack
          sx={{
            width: isMobile ? "100%" : "50%",
            mt: isMobile ? "1rem" : 0,
          }}
        >
          <CartCheckout />
        </Stack>
      </Box>
    </Box>
  );
};

export default CartPage;
