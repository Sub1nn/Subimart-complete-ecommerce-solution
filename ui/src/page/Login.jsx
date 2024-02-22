import {
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../../lib/axios.instance";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbar.slice";

const Login = () => {
  const dispatch = useDispatch(); // needed to hit the function of slices
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    mutate: loginUser,
  } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (response) => {
      // onSuccess we get a response
      navigate("/");
      dispatch(openSuccessSnackbar("User is logged in successfully"));
      localStorage.setItem("token", response?.data?.token); // providing key-value
      localStorage.setItem("name", response?.data?.user?.firstName);
      localStorage.setItem("role", response?.data?.user?.role);
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error.response.data.message));
    },
  });

  return (
    <>
      {isLoading && <LinearProgress color="secondary" />}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Must be a valid email")
            .required("Email is required")
            .trim()
            .lowercase(),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values) => {
          loginUser(values);
        }}
      >
        {({ handleSubmit, touched, getFieldProps, errors, setFieldValue }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "400px",
              padding: "2rem",
              gap: "2rem",
              boxShadow:
                " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
          >
            <Typography variant="h4">Sign in</Typography>
            <FormControl>
              <TextField
                variant="outlined"
                label="Email"
                {...getFieldProps("email")}
              />
              {touched.email && errors.email ? (
                <FormHelperText error>{errors.email}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl>
              <TextField
                variant="outlined"
                label="Password"
                {...getFieldProps("password")}
              />
              {touched.password && errors.password ? (
                <FormHelperText error>{errors.password}</FormHelperText>
              ) : null}
            </FormControl>
            <Stack spacing={1}>
              <Button
                variant="contained"
                type="submit"
                color="success"
                disableRipple
                disabled={isLoading}
              >
                Log in
              </Button>
              <Link to="/register">
                <Typography color="#9c27b0" variant="subtitle2">
                  New here? Register
                </Typography>
              </Link>
            </Stack>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
