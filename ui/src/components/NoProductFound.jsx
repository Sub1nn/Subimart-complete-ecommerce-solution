import { Box, Typography } from "@mui/material";
import React from "react";

const NoProductFound = () => {
  return (
    <Box
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        padding: "1rem",
        color: "grey",
      }}
    >
      <Typography variant="h3">No product found...</Typography>
    </Box>
  );
};

export default NoProductFound;
