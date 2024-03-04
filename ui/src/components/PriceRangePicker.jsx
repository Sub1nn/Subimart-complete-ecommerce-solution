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
        maxPrice: Yup.number()
          .min(0, "Price cannot be negative")
          .test({
            name: "maxPrice",
            message: "Max price must be greater than min price.",
            test: function (value) {
              return value >= this.parent.minPrice;
            },
          }),
      })}
    >
      {({ handleSubmit, getFieldProps, touched, errors }) => (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem" }}>
          <FormControl>
            <TextField
              type="number"
              label="Min Price"
              {...getFieldProps("minPrice")}
              onChange={() => {}}
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
              onChange={() => {}}
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
