import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomSnackbar from "../components/CustomSnackbar";
import { Box, Stack } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <CustomSnackbar />
      <Stack spacing={6}>
        <Header />
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Box
            sx={{
              padding: "2rem",
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <Outlet />
          </Box>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
};

export default MainLayout;
