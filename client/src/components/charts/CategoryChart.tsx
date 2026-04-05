// components/charts/CategoryChart.tsx

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSelector } from "react-redux";
import { selectCategoryData } from "../../features/transactions/chartSelectors";
import { useThemeMode } from "../../context/ThemeContext";

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981"];

const CategoryChart = () => {
  const data = useSelector(selectCategoryData);
  const { isDarkMode } = useThemeMode();
  const tooltipStyle = {
    backgroundColor: isDarkMode ? "#0f172a" : "#ffffff",
    border: `1px solid ${isDarkMode ? "#334155" : "#e5e7eb"}`,
    color: isDarkMode ? "#e2e8f0" : "#0f172a",
  };

  return (
    <div
      className={`h-[300px] rounded-2xl p-5 shadow-sm ${
        isDarkMode ? "bg-slate-900 text-slate-100" : "bg-white"
      }`}
    >
      <h2 className="mb-4 text-lg font-semibold">
        Expense Breakdown
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label={{ fill: isDarkMode ? "#e2e8f0" : "#334155", fontSize: 12 }}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
