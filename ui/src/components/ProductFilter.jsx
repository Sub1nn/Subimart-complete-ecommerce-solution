import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { Formik } from "formik"
import * as React from "react"
import { useDispatch } from "react-redux"
import * as Yup from "yup"
import { setCategory, setMaxPrice } from "../store/slices/productSlice"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const categories = [
  "electronics",
  "clothing",
  "grocery",
  "cosmetics",
  "toys",
  "furniture",
  "sports",
  "stationery",
]

const ProductFilter = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
            width: {
              xs: "400px",
              md: "500px",
            },
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Formik
            initialValues={{
              minPrice: 0,
              maxPrice: 0,
              category: "",
            }}
            validationSchema={Yup.object({
              category: Yup.string().oneOf(categories),
              minPrice: Yup.number().min(0, "Price cannot be negative"),
              maxPrice: Yup.number()
                .min(0, "Price cannot be negative")
                .test({
                  name: "maxPrice",
                  message: "Max price must be greater than min price.",
                  test: function (value) {
                    return value >= this.parent.minPrice
                  },
                }),
            })}
            onSubmit={(values, { resetForm }) => {
              if (values.minPrice) {
                dispatch(setMaxPrice(values?.minPrice))
              }
              if (values.maxPrice) {
                dispatch(setMaxPrice(values?.maxPrice))
              }
              if (values.category) {
                dispatch(setCategory(values?.category))
              }
              handleClose()
              resetForm()
            }}
          >
            {({ handleSubmit, getFieldProps, touched, errors }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexDirection: "column",
                }}
                name="price-range-picker"
              >
                <FormControl fullWidth sx={{ marginTop: "0.3rem" }}>
                  <InputLabel>Category</InputLabel>
                  <Select label="Category" {...getFieldProps("category")}>
                    {categories.map((category, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={category}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {category}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <TextField
                    type="number"
                    label="Min Price"
                    {...getFieldProps("minPrice")}
                  />
                  {touched.minPrice && errors.minPrice ? (
                    <FormHelperText error>{errors.minPrice}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl>
                  <TextField
                    type="number"
                    label="Max Price"
                    {...getFieldProps("maxPrice")}
                  />
                  {touched.maxPrice && errors.maxPrice ? (
                    <FormHelperText error>{errors.maxPrice}</FormHelperText>
                  ) : null}
                </FormControl>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    color="error"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button color="success" variant="contained" type="submit">
                    Apply
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default ProductFilter
