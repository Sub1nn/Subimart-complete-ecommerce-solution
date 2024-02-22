import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Stack
      bgcolor="#A367B1"
      width="100vw"
      minHeight="100px"
      justifyContent="center"
      mt="70vh"
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Nepal Mart
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Stack>
  );
};

export default Footer;
