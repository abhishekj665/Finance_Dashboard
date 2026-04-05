import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

interface ThemeContextValue {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeModeContext = createContext<ThemeContextValue | undefined>(undefined);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: "#2563eb",
          },
          background: {
            default: isDarkMode ? "#0f172a" : "#f3f4f6",
            paper: isDarkMode ? "#111827" : "#ffffff",
          },
        },
        shape: {
          borderRadius: 16,
        },
      }),
    [isDarkMode]
  );

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleTheme: () => setIsDarkMode((current) => !current),
    }),
    [isDarkMode]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode must be used within an AppThemeProvider");
  }

  return context;
};
