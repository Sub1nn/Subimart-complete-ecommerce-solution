import { FormControl, Input, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSearchText } from "../store/slices/productSlice";
import useDebounce from "../../Hooks/useDebounce";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  // Use debounce hook with 500ms delay
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Dispatch setSearchText with debounced value
  React.useEffect(() => {
    console.log(debouncedSearchInput);
    dispatch(setSearchText(debouncedSearchInput));
  }, [debouncedSearchInput, dispatch]);

  return (
    <FormControl variant="standard">
      <Input
        value={searchInput}
        onChange={handleInputChange}
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
