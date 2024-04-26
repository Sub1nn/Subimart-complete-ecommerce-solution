import { createSlice } from "@reduxjs/toolkit"

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    searchText: null,
    category: null,
    minPrice: 0,
    maxPrice: 0,
    isFilterApplied: false,
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
      state.isFilterApplied = true
    },
    clearFilter: (state, action) => {
      state.searchText = null
      state.category = null
      state.minPrice = 0
      state.maxPrice = 0
      state.isFilterApplied = false
    },
    setMinPrice: (state, action) => {
      state.minPrice = +action.payload
      state.isFilterApplied = true
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = +action.payload
      state.isFilterApplied = true
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setSearchText,
  setCategory,
  clearFilter,
  setMinPrice,
  setMaxPrice,
} = ProductSlice.actions

export default ProductSlice.reducer
