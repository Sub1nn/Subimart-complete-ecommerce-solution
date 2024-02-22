import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "react-query";
import $axios from "../../lib/axios.instance";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice";
import Loader from "./Loader.jsx";

const DeleteProductDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, mutate: deleteProduct } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      return await $axios.delete(`/product/delete/${id}`);
    },
    onSuccess: (response) => {
      navigate("/product/list");
      dispatch(openSuccessSnackbar(response?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        size="medium"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        <Typography>Delete Product</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this product?"}
        </DialogTitle>

        <DialogActions sx={{ gap: "1rem" }}>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            size="large"
          >
            <Typography>No</Typography>
          </Button>
          <Button
            onClick={() => {
              deleteProduct();
              handleClose();
            }}
            autoFocus
            variant="contained"
            color="error"
            size="large"
          >
            <Typography>Yes</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteProductDialog;
