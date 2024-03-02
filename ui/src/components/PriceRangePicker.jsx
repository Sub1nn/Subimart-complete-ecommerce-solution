/* eslint-disable no-undef */
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const PriceRangePicker = () => {
  return (
    <Formik
      initialValues={{
        minPrice: 0,
        maxPrice: 0,
      }}
      validationSchema={Yup.object({
        minPrice: Yup.number().min(0, "Price cannot be negative"),
        maxPrice: Yup.number().when("minPrice", {
          is: true,
          then: (schema) =>
            schema.min(minPrice, "maxPrice must be greater than minPrice"),
          otherwise: (schema) => schema.min(0, "Price cannot be negative"),
        }),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit, getFieldProps, touched, errors }) => (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem" }}>
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
        </form>
      )}
    </Formik>
  );
};

export default PriceRangePicker;
