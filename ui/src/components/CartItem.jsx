import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"
import RemoveIcon from "@mui/icons-material/Remove"
import {
  Box,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material"
import React from "react"
import { useMutation, useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import $axios from "../../lib/axios.instance"
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice"

const CartItem = ({
  _id,
  name,
  brand,
  price,
  category,
  orderedQuantity,
  productId,
  image,
}) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { isLoading, mutate: deleteCartItem } = useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: async () => {
      return await $axios.delete(`/cart/remove/${_id}`)
    },
    onSuccess: (response) => {
      dispatch(openSuccessSnackbar(response?.data?.message))
      queryClient.invalidateQueries("cart-item-list")
      queryClient.invalidateQueries("cart-item-count")
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error.response.data.message))
    },
  })

  const { isLoading: isUpdateQuantityLoading, mutate: updateCartItemQuantity } =
    useMutation({
      mutationKey: ["update-item-quantity"],
      mutationFn: async (action) => {
        return await $axios.put("/cart/item/update-quantity", {
          productId: productId,
          action: action,
        })
      },
      onSuccess: (response) => {
        // dispatch(openSuccessSnackbar(response?.data?.message));
        queryClient.invalidateQueries("cart-item-list")
      },
      onError: (error) => {
        dispatch(openErrorSnackbar(error?.response?.data?.message))
      },
    })

  if (isUpdateQuantityLoading || isLoading) {
    return <LinearProgress color="secondary" />
  }

  return (
    <Box sx={{ mt: "1rem", width: { xs: "100%", md: "auto", lg: "900px" } }}>
      {(isUpdateQuantityLoading || isLoading) && (
        <LinearProgress color="secondary" />
      )}
      <Grid
        container
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          width: {
            xs: "100%",
          },
          padding: "1rem",

          justifyContent: {
            sx: "center",
            lg: "space-around",
          },
          alignItems: "center",
          borderRadius: "10px",
          gap: "2rem",

          boxShadow: {
            xs: "none",
            md: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
          },
        }}
      >
        <Grid item>
          <img
            src={
              image ||
              "https://www.dcgpac.com/media/catalog/product/placeholder/default/original_4.png"
            }
            alt={name}
            style={{
              height: "200px",
              width: "200px",
              objectFit: "contain",
            }}
          />
        </Grid>

        <Grid item>
          <Stack sx={{ gap: "1.5rem" }}>
            <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h6">{name}</Typography>
            </Stack>
            <Stack>
              <Chip label={brand} color="secondary" />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <IconButton
                disabled={isUpdateQuantityLoading}
                onClick={() => {
                  updateCartItemQuantity("inc")
                }}
              >
                <AddIcon />
              </IconButton>
              <Typography variant="h5">{orderedQuantity}</Typography>
              <IconButton
                onClick={() => {
                  updateCartItemQuantity("dec")
                }}
                disabled={orderedQuantity === 1 || isUpdateQuantityLoading}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton color="error" onClick={deleteCartItem}>
                <ClearIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
          <Typography variant="h6" fontWeight={"bold"}>
            $ {price}
          </Typography>
        </Grid>

        <Grid item></Grid>
      </Grid>
    </Box>
  )
}

export default CartItem
