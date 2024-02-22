import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: "",
    severity: "",
  },
  reducers: {
    openSuccessSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload;
      state.severity = "success";
    },
    openErrorSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload || "Something went wrong";
      state.severity = "error";
    },
    closeSnackbar: (state, action) => {
      state.open = false;
      state.message = "";
      state.severity = "";
    },
  },
});

export const { openSuccessSnackbar, openErrorSnackbar, closeSnackbar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
