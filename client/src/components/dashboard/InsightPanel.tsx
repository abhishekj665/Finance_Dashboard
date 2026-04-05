// components/dashboard/InsightsPanel.tsx

import { Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectInsights } from "../../features/transactions/insightSelector";

const InsightsPanel = () => {
  const insights = useSelector(selectInsights);

  if (!insights) return null;

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent>
        <Typography variant="h6" className="mb-3">
          Insights
        </Typography>

        <div className="space-y-2 text-sm">
          <p>
            Highest spending category:{" "}
            <span className="font-semibold">{insights.topCategory}</span>{" "}
            (â‚¹ {insights.topCategoryAmount})
          </p>

          <p>
            Monthly expense change:{" "}
            <span
              className={`font-semibold ${
                Number(insights.change) > 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {insights.change}%
            </span>
          </p>

          <p>
            Current balance:{" "}
            <span className="font-semibold text-blue-600">
              â‚¹ {insights.balance}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;
