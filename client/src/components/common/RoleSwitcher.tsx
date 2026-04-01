// components/common/RoleSwitcher.tsx

import { Select, MenuItem } from "@mui/material";
import { useState } from "react";

const RoleSwitcher = () => {
  const [role, setRole] = useState("viewer");

  return (
    <Select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      size="small"
      className="bg-white rounded"
    >
      <MenuItem value="viewer">Viewer</MenuItem>
      <MenuItem value="admin">Admin</MenuItem>
    </Select>
  );
};

export default RoleSwitcher;