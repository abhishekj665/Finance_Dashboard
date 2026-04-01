// components/layout/DashboardLayout.tsx

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import RoleSwitcher from "../common/RoleSwitcher";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="min-h-screen bg-gray-100">
      
      <AppBar position="static">
        <Toolbar className="flex justify-between">
          <Typography variant="h6">Finance Dashboard</Typography>
          <RoleSwitcher />
        </Toolbar>
      </AppBar>

      <Box className="p-6 max-w-7xl mx-auto">
        {children}
      </Box>

    </Box>
  );
};

export default DashboardLayout;