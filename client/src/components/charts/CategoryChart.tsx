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

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981"];

const CategoryChart = () => {
  const data = useSelector(selectCategoryData);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm h-[300px]">
      <h2 className="text-lg font-semibold mb-4">
        Expense Breakdown
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;