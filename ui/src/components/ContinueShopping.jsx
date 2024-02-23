import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ContinueShopping = () => {
  const navigate = useNavigate();
  return (
    <Stack sx={{ width: "30%", margin: " 20rem auto" }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          navigate("/product/list");
        }}
      >
        Continue Shopping
      </Button>
    </Stack>
  );
};

export default ContinueShopping;
