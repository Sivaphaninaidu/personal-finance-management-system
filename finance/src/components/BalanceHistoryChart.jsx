import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function BalanceHistoryChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {

    try {

      const userId =
        localStorage.getItem("user_id");

      const res = await api.get(
        `/dashboard/balance-history?user_id=${userId}`
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="balance"
          stroke="#2563eb"
          strokeWidth={3}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}

export default BalanceHistoryChart;