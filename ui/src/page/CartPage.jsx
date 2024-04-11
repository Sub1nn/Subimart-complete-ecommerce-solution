// ... (import statements)
import React, { useState } from "react"
import CartItem from "../components/CartItem"
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import CartCheckout from "../components/CartCheckout"
import { useMutation, useQuery, useQueryClient } from "react-query"
import $axios from "../../lib/axios.instance"
import Loader from "../components/Loader"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice"
import ContinueShopping from "../components/ContinueShopping"

const CartPage = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"))
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
      // console.log({ requiredData: requiredData });
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
        }}
      >
        Shopping Cart
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          mt: "2rem",
          px: isMobile ? "1rem" : "2rem",
        }}
      >
        <Stack
          sx={{
            gap: "2rem",
            width: isMobile ? "100%" : "50%",
            m: isMobile ? "0" : "0 5rem 0 0rem",
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
          {cartData.length > 0 &&
            cartData.map((item) => {
              return <CartItem key={item._id} {...item} />
            })}
        </Stack>
        <Stack
          sx={{
            width: isMobile ? "100%" : "50%",
            mt: isMobile ? "1rem" : 0,
          }}
        >
          <CartCheckout
            orderProductList={orderProductList}
            subTotal={orderSummary?.subTotal}
            discount={orderSummary?.discount}
            grandTotal={orderSummary?.grandTotal}
          />
        </Stack>
      </Box>
    </>
  )
}

export default CartPage
