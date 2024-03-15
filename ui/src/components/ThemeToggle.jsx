import React from "react";
import { IconButton } from "@mui/material";
import {
  Brightness4 as SunIcon,
  Brightness7 as MoonIcon,
} from "@mui/icons-material";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <IconButton aria-label="toggle theme" color="inherit" onClick={toggleTheme}>
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
