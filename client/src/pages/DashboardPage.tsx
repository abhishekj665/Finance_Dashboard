// pages/DashboardPage.tsx

import DashboardLayout from "../components/layout/DashboardLayout";
import MonthlyChart from "../components/charts/monthlyChart";
import CategoryChart from "../components/charts/CategoryChart";
import SummaryCards from "../components/dashboard/SummaryCard";
import TransactionsTable from "../components/transactions/TransactionTable";
import FiltersBar from "../components/dashboard/FilterBar";
import InsightsPanel from "../components/dashboard/InsightPanel";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Summary */}
        <SummaryCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MonthlyChart />
          </div>

          <CategoryChart />
        </div>

        {/* Filters */}
        <FiltersBar />

        {/* Table + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionsTable />
          </div>

          <InsightsPanel />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;