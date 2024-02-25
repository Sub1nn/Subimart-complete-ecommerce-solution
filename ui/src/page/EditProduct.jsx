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
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../../lib/axios.instance";
import Loader from "../components/Loader";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice";

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

const EditProduct = () => {
  // const [category, setCategory] = React.useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isLarge = useMediaQuery((theme) =>
    theme.breakpoints.between("md", "lg")
  );
  const isExtraLarge = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const { isLoading, data } = useQuery({
    queryKey: ["product-details"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${id}`);
    },
  });

  const productData = data?.data?.product;

  const { isLoading: editProductLoading, mutate: editProduct } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values) => {
      return await $axios.put(`/product/update/${id}`, {
        ...values,
      });
    },
    onSuccess: (response) => {
      navigate(`/product/detail/${id}`);
      queryClient.invalidateQueries("edit-product");
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
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {editProductLoading && <LinearProgress color="secondary" />}
        <Formik
          enableReinitialize
          initialValues={{
            name: productData?.name || "",
            brand: productData?.brand || "",
            price: productData.price || 0,
            quantity: productData.quantity || 1,
            category: productData.category || "",
            image: productData.image || null,
            description: productData.description || "",
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
          onSubmit={(values) => {
            editProduct(values);
          }}
        >
          {({ errors, touched, getFieldProps, handleSubmit }) => {
            return (
              <form
                style={{
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
                <Typography variant="h4">Edit Product</Typography>

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
                    // onChange={handleChange}
                    {...getFieldProps("category")}
                  >
                    {categories.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          <Typography sx={{ textTransform: "capitalize" }}>
                            {item}
                          </Typography>
                        </MenuItem>
                      );
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
                  disabled={editProductLoading}
                >
                  Submit
                </Button>
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default EditProduct;
