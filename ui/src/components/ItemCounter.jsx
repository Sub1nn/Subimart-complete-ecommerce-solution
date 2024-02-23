import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import $axios from "../../lib/axios.instance";
import Loader from "./Loader";

const ItemCounter = ({ availableQuantity }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    mutate: addItemToCart,
  } = useMutation({
    mutationKey: ["add-item-cart"],
    mutationFn: async () => {
      return await $axios.post("/cart/add/item", {
        productId: id,
        orderedQuantity: count,
      });
    },
    onSuccess: (response) => {
      dispatch(openSuccessSnackbar(response?.data?.message));
      // navigate("/cart");
      queryClient.invalidateQueries("cart-item-count");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Stack
        spacing={2}
        direction={"row"}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            if (count === availableQuantity) {
              dispatch(openErrorSnackbar("Maximum item limit reached."));

              return count;
              //setCount(availableQuantity);
            }
            setCount((prev) => prev + 1);
          }}
        >
          <AddIcon />
        </Button>
        <Typography variant="h5">{count}</Typography>
        <Button
          onClick={() => {
            count > 0
              ? setCount((prev) => prev - 1)
              : dispatch(openErrorSnackbar("Count cant be negative"));
          }}
        >
          <RemoveIcon />
        </Button>
      </Stack>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          addItemToCart();
        }}
      >
        Add to cart
      </Button>
    </>
  );
};

export default ItemCounter;
