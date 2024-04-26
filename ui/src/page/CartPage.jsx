import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import React, { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import $axios from "../../lib/axios.instance"
import CartCheckout from "../components/CartCheckout"
import CartItem from "../components/CartItem"
import ContinueShopping from "../components/ContinueShopping"
import Loader from "../components/Loader"
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice"
import { useNavigate } from "react-router-dom"
import { CancelOutlined, FilterAltOffOutlined } from "@mui/icons-material"

const CartPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const [orderProductList, setOrderProductList] = useState([])

  const { isLoading: flushLoading, mutate: flushCart } = useMutation({
    mutationKey: ["flush-cart"],
    mutationFn: async () => {
      return await $axios.delete("/cart/flush")
    },
    onSuccess: (response) => {
      dispatch(openSuccessSnackbar(response?.data?.message))
      queryClient.invalidateQueries("cart-item-list")
      queryClient.invalidateQueries("cart-item-count")
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message))
    },
  })

  const { data, isLoading } = useQuery({
    queryKey: ["cart-item-list"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list")
    },
    onSuccess: (res) => {
      const requiredData = res?.data?.cartData.map((item) => {
        return {
          productId: item.productId,
          orderedQuantity: item.orderedQuantity,
        }
      })
      setOrderProductList(requiredData)
    },
  })

  const cartData = data?.data?.cartData
  const orderSummary = data?.data?.orderSummary

  if (isLoading || flushLoading) {
    return <Loader />
  }
  if (cartData?.length === 0) {
    return <ContinueShopping />
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          background: "linear-gradient(to right bottom, #ea0b0b, #370ed8)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Shopping Cart
      </Typography>
      {cartData.length > 0 && (
        <Stack
          sx={{
            mb: "1rem",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            startIcon={<CancelOutlined />}
            onClick={flushCart}
            sx={{ width: "150px" }}
            color="error"
          >
            Clear cart
          </Button>
        </Stack>
      )}
      <Box width={"100%"}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {cartData.map((item) => {
                return <CartItem key={item._id} {...item} />
              })}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack m={0}>
              <CartCheckout
                orderProductList={orderProductList}
                subTotal={orderSummary?.subTotal}
                discount={orderSummary?.discount}
                grandTotal={orderSummary?.grandTotal}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CartPage
