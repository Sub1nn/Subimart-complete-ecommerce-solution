import { FormControl, Input, InputAdornment } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, setSearchText } from "../store/slices/productSlice";
import useDebounce from "../../Hooks/useDebounce";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.product.searchText);
  const [searchInput, setSearchInput] = useState(searchText || "");
  const inputRef = useRef(null);

  // Use debounce hook with 500ms delay
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Backspace" && searchInput === "") {
      dispatch(clearFilter());
    }
  };

  // Dispatch setSearchText with debounced value
  useEffect(() => {
    if (debouncedSearchInput !== null && debouncedSearchInput.trim() !== "") {
      dispatch(setSearchText(debouncedSearchInput));
    } else {
      dispatch(clearFilter());
    }
  }, [debouncedSearchInput, dispatch]);

  // Effect to focus input whenever searchInput changes
  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchInput]);

  // reset searchInput state when searchText changes
  useEffect(() => {
    setSearchInput(searchText || "");
  }, [searchText]);

  return (
    <Input
      ref={inputRef}
      value={searchInput}
      placeholder="Search"
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon color="success" />
        </InputAdornment>
      }
    />
  );
};

export default SearchProduct;
