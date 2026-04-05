import { Switch, FormControlLabel } from "@mui/material";
import { useThemeMode } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <FormControlLabel
      control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
      label="Dark"
      className="m-0 flex w-full justify-between text-white sm:w-auto sm:justify-start"
    />
  );
};

export default ThemeToggle;
