import { Chip, Stack } from "@mui/material"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import * as React from "react"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ name, brand, price, image, description, _id }) => {
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        height: "100%",
        padding: "0rem 1rem 1rem 1rem",
        borderRadius: "10px",
        boxShadow:
          " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <img
        onClick={() => {
          navigate(`/product/detail/${_id}`)
        }}
        style={{
          objectFit: "cover",
          padding: "1rem 0",
          width: "100%",
          height: "250px",
          maxWidth: "400px",
          cursor: "pointer",
          borderRadius: "10px !important",
        }}
        src={image}
        alt=""
      />
      <CardContent sx={{ flex: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Chip
            label={brand}
            color="secondary"
            variant="outlined"
            width="40px"
          />
        </Stack>
        <Typography variant="h6" gutterBottom>
          $ {price}
        </Typography>
        <Typography>{description}...</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="medium"
          variant="contained"
          fullWidth
          color="success"
          onClick={() => {
            navigate(`/product/detail/${_id}`)
          }}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
