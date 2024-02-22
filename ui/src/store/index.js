import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/snackbar.slice";

export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});
