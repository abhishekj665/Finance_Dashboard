

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

const MonthlyChart = () => {
  const data = useSelector(selectMonthlyData);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm h-75">
      <h2 className="text-lg font-semibold mb-4">
        Monthly Overview
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />
          <YAxis />

          <Tooltip />

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