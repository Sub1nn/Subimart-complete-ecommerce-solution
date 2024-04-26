import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useMutation } from "react-query"
import { Formik } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
import $axios from "../../lib/axios.instance"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice"
import axios from "axios"

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

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
]

const AddProduct = () => {
  const [productImage, setProductImage] = useState(null)
  const [localUrl, setLocalUrl] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)

  // console.log(localUrl);
  const [category, setCategory] = React.useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"))
  const isMedium = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  )
  const isLarge = useMediaQuery((theme) =>
    theme.breakpoints.between("md", "lg")
  )
  const isExtraLarge = useMediaQuery((theme) => theme.breakpoints.up("lg"))

  const { isLoading, mutate: addProduct } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (values) => {
      return await $axios.post("/product/add", values)
    },
    onSuccess: (response) => {
      navigate("/product/list")
      dispatch(openSuccessSnackbar(response?.data?.message))
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message))
    },
  })

  const handleChange = (event) => {
    setCategory(event.target.value)
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {(isLoading || imageLoading) && <LinearProgress color="secondary" />}
      <Formik
        initialValues={{
          name: "",
          brand: "",
          price: 0,
          quantity: 1,
          category: "",
          image: null,
          description: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(30, "Name must be at max 30 characters.")
            .required("Name is required.")
            .trim(),
          brand: Yup.string()
            .max(30, "Brand must be at max 30 characters.")
            .required("Brand is required.")
            .trim(),

          price: Yup.number()
            .min(0, "Price must be a positive number")
            .required("Price is required."),
          quantity: Yup.number()
            .min(1, "Quantity must be at least 1")
            .required("Quantity is required."),
          category: Yup.string()
            .oneOf(categories)
            .required("Category is required"),
          image: Yup.string().nullable(),
          description: Yup.string()
            .required("Description is required.")
            .trim()
            .max(1000, "Description must be at max 1000 characters."),
        })}
        onSubmit={async (values) => {
          let imageUrl = ""
          if (productImage) {
            const cloudName = "de9pwc3cf"

            // creates form data object
            const data = new FormData()
            data.append("file", productImage)
            data.append("upload_preset", "subi-mart")
            data.append("cloud_name", cloudName)

            try {
              setImageLoading(true)
              const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                data
              )

              imageUrl = response?.data?.secure_url
              setImageLoading(false)
            } catch (error) {
              setImageLoading(false)
              dispatch(openErrorSnackbar("Image upload failed"))
            }
          }

          values.image = imageUrl
          addProduct(values)
        }}
      >
        {({ errors, touched, getFieldProps, handleSubmit }) => {
          return (
            <form
              style={{
                marginTop: "6rem",
                display: "flex",
                flexDirection: "column",
                width: isMobile ? "400px" : "600px",
                padding: "2rem",
                gap: "2rem",
                boxShadow:
                  " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
              onSubmit={handleSubmit}
            >
              <Typography variant="h4">Add Product</Typography>

              {productImage && (
                <img src={localUrl} alt="" style={{ width: "200px" }} />
              )}

              <FormControl>
                <input
                  type="file"
                  onChange={(event) => {
                    const file = event?.target?.files[0]
                    setProductImage(file)
                    setLocalUrl(URL.createObjectURL(file))
                  }}
                />
              </FormControl>

              <FormControl>
                <TextField
                  color="success"
                  variant="outlined"
                  label="Name"
                  error={!!touched.name && !!errors.name}
                  helperText={errors.name}
                  {...getFieldProps("name")}
                />
              </FormControl>
              <FormControl>
                <TextField
                  color="success"
                  variant="outlined"
                  label="Brand"
                  error={!!touched.brand && !!errors.brand}
                  helperText={errors.brand}
                  {...getFieldProps("brand")}
                />
              </FormControl>
              <FormControl>
                <InputLabel>Price</InputLabel>
                <OutlinedInput
                  type="number"
                  color="success"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Price"
                  {...getFieldProps("price")}
                />
                {touched.price && errors.price ? (
                  <FormHelperText error>{errors.price}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl>
                <TextField
                  color="success"
                  variant="outlined"
                  label="Quantity"
                  type="number"
                  error={!!touched.quantity && !!errors.quantity}
                  helperText={errors.quantity}
                  {...getFieldProps("quantity")}
                />
              </FormControl>
              <FormControl>
                <InputLabel>Categories</InputLabel>
                <Select
                  label="Category"
                  color="success"
                  onChange={handleChange}
                  {...getFieldProps("category")}
                >
                  {categories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        <Typography sx={{ textTransform: "capitalize" }}>
                          {item}
                        </Typography>
                      </MenuItem>
                    )
                  })}
                </Select>
                {touched.category && errors.category ? (
                  <FormHelperText error>{errors.category}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl>
                <TextField
                  color="success"
                  variant="outlined"
                  label="Description"
                  multiline
                  rows={6}
                  error={!!touched.description && !!errors.description}
                  helperText={errors.description}
                  {...getFieldProps("description")}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
              >
                Submit
              </Button>
            </form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default AddProduct
