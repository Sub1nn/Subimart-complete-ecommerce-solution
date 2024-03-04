import { FormControl, Input, InputAdornment } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSearchText } from "../store/slices/productSlice";

const SearchProduct = () => {
  const dispatch = useDispatch();

  return (
    <FormControl variant="standard">
      <Input
        onChange={(event) => {
          const searchText = event?.target?.value;

          dispatch(setSearchText(searchText));
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchProduct;
