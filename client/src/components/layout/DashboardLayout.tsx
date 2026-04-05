// components/layout/DashboardLayout.tsx

import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RoleSwitcher from "../common/RoleSwitcher";
import ThemeToggle from "../common/ThemeToggle";
import { useThemeMode } from "../../context/ThemeContext";
import { useRole } from "../../context/RoleContext";

const SettingsPanel = ({
  isDarkMode,
  role,
}: {
  isDarkMode: boolean;
  role: string;
}) => {
  const surfaceClass = isDarkMode
    ? "border border-slate-800 bg-slate-900/90 text-slate-100"
    : "border border-slate-200 bg-white/95 text-slate-900";

  return (
    <Paper
      className={`transition-surface overflow-hidden rounded-3xl p-5 shadow-sm ${surfaceClass}`}
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Typography
            variant="overline"
            className={isDarkMode ? "text-slate-400" : "text-slate-500"}
          >
            Controls
          </Typography>
          <Typography variant="h6" className="font-semibold">
            Quick Settings
          </Typography>
        </div>
        <div
          className={
            role === "admin"
              ? "rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400"
              : "rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400"
          }
        >
          {role}
        </div>
      </div>

      <div className="space-y-4">
        <div
          className={
            isDarkMode
              ? "rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              : "rounded-2xl border border-slate-200 bg-slate-50 p-4"
          }
        >
          <div className="mb-2 flex items-center gap-2">
            <ShieldOutlinedIcon
              fontSize="small"
              className={isDarkMode ? "text-slate-400" : "text-slate-500"}
            />
            <Typography variant="subtitle2">Role Simulation</Typography>
          </div>
          <Typography
            variant="body2"
            className={isDarkMode ? "mb-3 text-slate-400" : "mb-3 text-slate-500"}
          >
            Switch between viewer and admin to preview access changes.
          </Typography>
          <RoleSwitcher />
        </div>

        <div
          className={
            isDarkMode
              ? "rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              : "rounded-2xl border border-slate-200 bg-slate-50 p-4"
          }
        >
          <div className="mb-2 flex items-center gap-2">
            <DarkModeOutlinedIcon
              fontSize="small"
              className={isDarkMode ? "text-slate-400" : "text-slate-500"}
            />
            <Typography variant="subtitle2">Appearance</Typography>
          </div>
          <Typography
            variant="body2"
            className={isDarkMode ? "mb-3 text-slate-400" : "mb-3 text-slate-500"}
          >
            Toggle the dashboard theme without changing the page flow.
          </Typography>
          <ThemeToggle />
        </div>
      </div>
    </Paper>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useThemeMode();
  const { role } = useRole();
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);
  const drawerPaperClass = isDarkMode ? "bg-slate-950" : "bg-slate-100";

  return (
    <Box
      className={
        isDarkMode
          ? "min-h-screen bg-slate-950 transition-surface"
          : "min-h-screen bg-gray-100 transition-surface"
      }
    >
      <AppBar position="sticky" color="primary" className="top-0 z-50">
        <Toolbar className="flex min-h-[72px] items-center justify-between px-4 py-3 sm:min-h-[64px] sm:px-6 sm:py-0">
          <Typography variant="h6" className="text-left">
            Finance Dashboard
          </Typography>

          <Button
            variant="outlined"
            startIcon={<SettingsOutlinedIcon />}
            onClick={() => setIsMobileSettingsOpen(true)}
            className="xl:hidden"
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.35)",
            }}
          >
            Settings
          </Button>
        </Toolbar>
      </AppBar>

      <Box className="animate-fade-up mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6">
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden xl:block xl:self-start">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-auto">
              <SettingsPanel isDarkMode={isDarkMode} role={role} />
            </div>
          </aside>

          <main>{children}</main>
        </div>
      </Box>

      <Drawer
        anchor="right"
        open={isMobileSettingsOpen}
        onClose={() => setIsMobileSettingsOpen(false)}
        PaperProps={{
          className: `w-full max-w-sm p-4 ${drawerPaperClass}`,
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h6">Quick Settings</Typography>
          <IconButton onClick={() => setIsMobileSettingsOpen(false)}>
            <CloseOutlinedIcon />
          </IconButton>
        </div>

        <SettingsPanel isDarkMode={isDarkMode} role={role} />
      </Drawer>
    </Box>
  );
};

export default DashboardLayout;
