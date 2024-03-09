import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "counter",
  initialState: {
    searchText: "",
    category: "",
    minPrice: 0,
    maxPrice: 0,
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearFilter: (state, action) => {
      state.searchText = "";
      state.category = "";
    },
    setMinPrice: (state, action) => {
      state.minPrice = +action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = +action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchText,
  setCategory,
  clearFilter,
  setMinPrice,
  setMaxPrice,
} = ProductSlice.actions;

export default ProductSlice.reducer;
