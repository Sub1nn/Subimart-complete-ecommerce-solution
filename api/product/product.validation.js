import * as Yup from "yup";
import { productCategories } from "../constants/general.constant.js";

export let productSchema = Yup.object({
  name: Yup.string()
    .max(30, "Name must be at max 30 characters.")
    .required("Name is required.")
    .trim(),
  brand: Yup.string()
    .max(30, "Brand must be at max 30 characters.")
    .required("Brand is required.")
    .trim(),

  price: Yup.number().min(0).required("Price is required."),
  quantity: Yup.number().min(1).required("Quantity is required."),
  category: Yup.string().oneOf(productCategories),
  image: Yup.string().nullable(),
  description: Yup.string()
    .required("Description is required.")
    .trim()
    .max(1000, "Description must be at max 1000 characters."),
});

export let paginationSchema = Yup.object({
  page: Yup.number().default(1).min(1),
  limit: Yup.number().default(10).min(1),
  searchText: Yup.string().nullable().trim().default(null),
  category: Yup.string().oneOf(productCategories).default(null).nullable(),
});
export let buyerPaginationSchema = Yup.object({
  page: Yup.number().default(1).min(1),
  limit: Yup.number().default(10).min(1),
  searchText: Yup.string().nullable().trim().default(null),
  category: Yup.string().oneOf(productCategories).default(null).nullable(),
  minPrice: Yup.number()
    .min(0, "Price cannot be negative")
    .default(0)
    .nullable(),
  maxPrice: Yup.number()
    .min(0, "Price cannot be negative")
    .test({
      name: "maxPrice",
      message: "Max price must be greater than min price.",
      test: function (value) {
        return value >= this.parent.minPrice;
      },
    })
    .default(0)
    .nullable(),
});
