import React from "react"
import { Outlet } from "react-router-dom"
import CustomSnackbar from "../components/CustomSnackbar"
import { Box } from "@mui/material"

const MinimumLayout = () => {
  return (
    <>
      <CustomSnackbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}

export default MinimumLayout
