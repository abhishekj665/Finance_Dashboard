// pages/DashboardPage.tsx

import DashboardLayout from "../components/layout/DashboardLayout";
import MonthlyChart from "../components/charts/MonthlyChart";
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
        <div className="animate-fade-up animate-delay-1 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MonthlyChart />
          </div>

          <CategoryChart />
        </div>

        {/* Filters */}
        <div className="animate-fade-up animate-delay-2">
          <FiltersBar />
        </div>

        {/* Table + Insights */}
        <div className="animate-fade-up animate-delay-3 grid grid-cols-1 gap-6 lg:grid-cols-3">
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
