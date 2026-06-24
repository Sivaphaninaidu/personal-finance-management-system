import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function MonthlyChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const userId =
        localStorage.getItem("user_id");

      const res = await api.get(
        `/dashboard/monthly-summary?user_id=${userId}`
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />
        <YAxis />

        <Tooltip />
        <Legend />

        <Bar
          dataKey="income"
          fill="#22c55e"
        />

        <Bar
          dataKey="expense"
          fill="#ef4444"
        />

      </BarChart>
    </ResponsiveContainer>
  );
}

export default MonthlyChart;