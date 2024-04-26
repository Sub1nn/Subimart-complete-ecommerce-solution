import { Grid } from "@mui/material"
import React from "react"

const ProductImage = ({ imageUrl }) => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item>
        <img
          src={imageUrl || "https://bitsofco.de/img/Qo5mfYDE5v-350.png"}
          alt=""
          style={{
            objectFit: "cover",
            width: "80%",
            height: "auto",
            minHeight: "400px",
            borderRadius: "8px",
          }}
        />
      </Grid>
    </Grid>
  )
}

export default ProductImage
