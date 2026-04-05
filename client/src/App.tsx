import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import { AppThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <AppThemeProvider>
      <RoleProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </Router>
      </RoleProvider>
    </AppThemeProvider>
  );
}

export default App;
