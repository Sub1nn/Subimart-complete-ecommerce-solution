import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/snackbar.slice";
import productReducer from "./slices/productSlice";

export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
    product: productReducer,
  },
});
