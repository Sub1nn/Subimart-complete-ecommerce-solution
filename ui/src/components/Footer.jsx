import { Grid, Stack, Typography } from "@mui/material"
import React from "react"

const Footer = () => {
  return (
    <Stack
      sx={{
        background: "#A367B1",
        minHeight: 100,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: 0,
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff" }}>
        Copyright @ Subi mart 2024
      </Typography>
    </Stack>
  )
}

export default Footer
