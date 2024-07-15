import { Button, Chip, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteProductDialogue from "./DeleteProductDialogue";
import ItemCounter from "./ItemCounter";

const ProductDescription = ({
  name,
  brand,
  category,
  price,
  description,
  quantity,
  _id,
}) => {
  const userRole = localStorage.getItem("role");

  const navigate = useNavigate();
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Grid item>
        <Typography variant="h4">{name}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">{brand}</Typography>
      </Grid>

      <Grid item sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <Typography variant="h6">$</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {price}
        </Typography>
      </Grid>

      <Grid item>
        <Typography textAlign="justify" variant="h6">
          {description}
        </Typography>
      </Grid>

      <Grid item sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <Typography variant="h6">Available quantity:</Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {quantity}
        </Typography>
      </Grid>

      <Grid item>
        <Chip
          sx={{ textTransform: "capitalize", fontSize: "1.2rem" }}
          label={category}
          color="warning"
          variant="outlined"
          size="medium"
        />
      </Grid>
      {userRole === "buyer" && <ItemCounter availableQuantity={quantity} />}

      <Grid item mt="1rem">
        {userRole === "seller" && (
          <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                navigate(`/product/edit/${_id}`);
              }}
              startIcon={<EditIcon />}
            >
              <Typography>Edit Product</Typography>
            </Button>

            <DeleteProductDialogue />
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductDescription;
