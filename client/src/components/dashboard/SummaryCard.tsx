// components/dashboard/SummaryCards.tsx

import { Card, CardContent, Typography } from "@mui/material";
import { useFinancialSummary } from "../../hooks/useFinancialSummary";

const CardItem = ({ title, value }: { title: string; value: number }) => (
  <Card className="shadow-md">
    <CardContent>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h5">₹ {value}</Typography>
    </CardContent>
  </Card>
);

const SummaryCards = () => {
  const { income, expense, balance } = useFinancialSummary();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CardItem title="Income" value={income} />
      <CardItem title="Expenses" value={expense} />
      <CardItem title="Balance" value={balance} />
    </div>
  );
};

export default SummaryCards;