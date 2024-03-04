import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store/slices/productSlice";
import PriceRangePicker from "./PriceRangePicker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const categories = [
  "electronics",
  "clothing",
  "grocery",
  "cosmetics",
  "toys",
  "furniture",
  "sports",
  "stationery",
];

const ProductFilter = () => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Filter
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle variant="h5" sx={{ textAlign: "center" }}>
          Product Filter
        </DialogTitle>
        <DialogContent
          sx={{
            width: "500px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={selectedCategory}
              onChange={(event) => {
                setSelectedCategory(event.target.value);
              }}
            >
              {categories.map((category, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={category}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <PriceRangePicker />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              dispatch(setCategory(selectedCategory));
              handleClose();
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProductFilter;
