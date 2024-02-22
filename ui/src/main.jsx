import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import guestRoutes from "./routes/GuestRoutes";
import mainRoutes from "./routes/MainRoutes";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "./store";

const queryClient = new QueryClient();
const theme = createTheme();

const applicationRoutes = [...mainRoutes, ...guestRoutes];

const router = createBrowserRouter(applicationRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </ThemeProvider>
);
