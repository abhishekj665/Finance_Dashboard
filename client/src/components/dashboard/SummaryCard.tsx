// components/dashboard/SummaryCards.tsx

import { Card, CardContent, Typography } from "@mui/material";
import { useFinancialSummary } from "../../hooks/useFinancialSummary";

const CardItem = ({
  title,
  value,
  className,
}: {
  title: string;
  value: number;
  className?: string;
}) => (
  <Card
    className={`animate-fade-up transition-surface shadow-md hover:-translate-y-0.5 ${className ?? ""}`}
  >
    <CardContent>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h5">Rs. {value}</Typography>
    </CardContent>
  </Card>
);

const SummaryCards = () => {
  const { income, expense, balance } = useFinancialSummary();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <CardItem title="Income" value={income} />
      <CardItem title="Expenses" value={expense} className="animate-delay-1" />
      <CardItem title="Balance" value={balance} className="animate-delay-2" />
    </div>
  );
};

export default SummaryCards;
