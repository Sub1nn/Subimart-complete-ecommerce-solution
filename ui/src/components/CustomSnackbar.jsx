import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../store/slices/snackbar.slice";

const CustomSnackbar = () => {
  const { message, open, severity } = useSelector((state) => state.snackbar);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSnackbar());
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
