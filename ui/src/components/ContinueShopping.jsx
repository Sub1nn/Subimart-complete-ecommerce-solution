import { Button, Stack, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

const ContinueShopping = () => {
  const navigate = useNavigate()
  return (
    <Stack
      sx={{
        minWidth: "400px",
        height: "100px",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: "5rem",
        borderRadius: "5px",
        boxShadow: {
          xs: "none",
          md: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        },
      }}
    >
      <Typography variant="h5" textAlign="center">
        No item is added to cart
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => {
          navigate("/product/list")
        }}
      >
        Continue Shopping
      </Button>
    </Stack>
  )
}

export default ContinueShopping
