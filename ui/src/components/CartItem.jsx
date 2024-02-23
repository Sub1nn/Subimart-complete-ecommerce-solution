import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import $axios from "../../lib/axios.instance";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice";
import Loader from "./Loader";

const CartItem = ({
  _id,
  name,
  brand,
  price,
  category,
  orderedQuantity,
  productId,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isLoading, mutate: deleteItem } = useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: async () => {
      return await $axios.delete(`/cart/remove/${_id}`);
    },
    onSuccess: (response) => {
      dispatch(openSuccessSnackbar(response?.data?.message));
      queryClient.invalidateQueries("cart-item-list");
      queryClient.invalidateQueries("cart-item-count");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error.response.data.message));
    },
  });

  const { isLoading: isLoadingQuantity, mutate: updateCartItemQuantity } =
    useMutation({
      mutationKey: ["update-item-quantity"],
      mutationFn: async (action) => {
        return await $axios.put("/cart/item/update-quantity", {
          productId: productId,
          action: action,
        });
      },
      onSuccess: (response) => {
        // dispatch(openSuccessSnackbar(response?.data?.message));
        queryClient.invalidateQueries("cart-item-list");
      },
      onError: (error) => {
        dispatch(openErrorSnackbar(error?.response?.data?.message));
      },
    });

  if (isLoadingQuantity || isLoading) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <Box>
      <Grid
        container
        sx={{
          // background: "blue",
          // flexDirection: "row",
          // mt: "8rem",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          // width: "100%",
          // height: "110px",
          borderRadius: "10px",
          padding: "1rem",
          boxShadow:
            " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }}
      >
        <Grid item>
          <img
            src="https://cdn.thewirecutter.com/wp-content/media/2023/09/lcdledtv-2048px-tclQM8-2109-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024"
            alt=""
            style={{ height: "70px", width: "100px" }}
          />
        </Grid>
        <Grid item>
          <Stack
            sx={{ gap: "1rem", justifyContent: "center", alignItems: "center" }}
          >
            <Typography variant="h6">{name}</Typography>

            <Chip label={brand} color="secondary" />
          </Stack>
        </Grid>
        <Grid>
          <Typography variant="h6">${price}</Typography>
        </Grid>
        <Grid item>
          <Stack
            spacing={2}
            direction={"row"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => {
                updateCartItemQuantity("inc");
              }}
            >
              <AddIcon />
            </IconButton>
            <Typography variant="h6">{orderedQuantity}</Typography>
            <IconButton
              onClick={() => {
                updateCartItemQuantity("dec");
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item>
          <IconButton color="error" onClick={deleteItem}>
            <CancelRoundedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
