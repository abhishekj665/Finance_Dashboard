

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useSelector } from "react-redux";
import { selectMonthlyData } from "../../features/transactions/chartSelectors";
import { useThemeMode } from "../../context/ThemeContext";

const MonthlyChart = () => {
  const data = useSelector(selectMonthlyData);
  const { isDarkMode } = useThemeMode();
  const axisColor = isDarkMode ? "#cbd5e1" : "#475569";
  const gridColor = isDarkMode ? "#334155" : "#e5e7eb";
  const tooltipStyle = {
    backgroundColor: isDarkMode ? "#0f172a" : "#ffffff",
    border: `1px solid ${isDarkMode ? "#334155" : "#e5e7eb"}`,
    color: isDarkMode ? "#e2e8f0" : "#0f172a",
  };

  return (
    <div
      className={`h-75 rounded-2xl p-5 shadow-sm ${
        isDarkMode ? "bg-slate-900 text-slate-100" : "bg-white"
      }`}
    >
      <h2 className="mb-4 text-lg font-semibold">
        Monthly Overview
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />

          <XAxis dataKey="month" stroke={axisColor} />
          <YAxis stroke={axisColor} />

          <Tooltip contentStyle={tooltipStyle} />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#16a34a"
            strokeWidth={2}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#dc2626"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;
