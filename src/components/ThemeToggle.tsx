"use client";

import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useColorMode } from "@/app/providers";
import { useTheme } from "@mui/material/styles";

const ThemeToggle = () => {
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeToggle;
