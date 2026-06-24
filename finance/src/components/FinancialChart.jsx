import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function FinancialChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const userId =
  localStorage.getItem("user_id");

const res = await api.get(
  `/dashboard/?user_id=${userId}`
);

      setData([
        {
          name: "Balance",
          value: res.data.total_balance
        },
        {
          name: "Expenses",
          value: res.data.total_expenses
        },
        {
          name: "Bills",
          value: res.data.total_bills
        }
      ]);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />

        <Bar dataKey="value" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default FinancialChart;