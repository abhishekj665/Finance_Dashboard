// components/common/RoleSwitcher.tsx

import { FormControl, MenuItem, Select } from "@mui/material";
import { useRole } from "../../context/RoleContext";
import { useThemeMode } from "../../context/ThemeContext";
import type { SelectChangeEvent } from "@mui/material/Select";

const RoleSwitcher = () => {
  const { role, setRole } = useRole();
  const { isDarkMode } = useThemeMode();

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as "viewer" | "admin");
  };

  return (
    <FormControl size="small" className="w-full sm:min-w-[140px] sm:w-auto">
      <Select
        value={role}
        onChange={handleChange}
        className={isDarkMode ? "rounded bg-slate-800" : "rounded bg-white"}
      >
        <MenuItem value="viewer">Viewer</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RoleSwitcher;
