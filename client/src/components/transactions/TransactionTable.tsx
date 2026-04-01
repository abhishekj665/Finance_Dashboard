// components/transactions/TransactionsTable.tsx

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CategoryIcon from "@mui/icons-material/Category";

import { useSelector } from "react-redux";
import { selectFilteredTransactions } from "../../features/transactions/selector";

import { mockTransactions } from "../../data/mockData";

const TransactionsTable = () => {
  const transactions = useSelector(selectFilteredTransactions);

  if (transactions.length === 0) {
    return (
      <Paper className="p-6 rounded-2xl shadow-sm text-center">
        <p className="text-gray-500">No transactions found</p>
      </Paper>
    );
  }

  return (
    <Paper className="rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center px-5 pt-5 pb-2">
        <Typography variant="h6" className="font-semibold">
          Transactions
        </Typography>

        <Typography className="text-sm text-gray-500">
          {mockTransactions.length} total
        </Typography>
      </div>

      {/* Table */}
      <TableContainer>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {transactions.map((tx) => {
              const isIncome = tx.type === "income";

              return (
                <TableRow key={tx.id} hover className="transition">
                  {/* Date */}
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600">
                      {tx.date}
                    </Typography>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CategoryIcon
                        className="text-gray-400"
                        fontSize="small"
                      />
                      <Typography variant="body2">{tx.category}</Typography>
                    </div>
                  </TableCell>

                  {/* Type */}
                  <TableCell>
                    <Chip
                      label={tx.type}
                      size="small"
                      color={isIncome ? "success" : "error"}
                      variant="outlined"
                    />
                  </TableCell>

                  {/* Amount */}
                  <TableCell align="right">
                    <div className="flex justify-end items-center gap-1">
                      {isIncome ? (
                        <ArrowUpwardIcon
                          className="text-green-500"
                          fontSize="small"
                        />
                      ) : (
                        <ArrowDownwardIcon
                          className="text-red-500"
                          fontSize="small"
                        />
                      )}

                      <Typography
                        className={`font-semibold ${
                          isIncome ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isIncome ? "+" : "-"}₹ {tx.amount.toLocaleString()}
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionsTable;
