import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function ExpenseChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {
    try {
      const userId =
  localStorage.getItem("user_id");

const res = await api.get(
  `/dashboard/expense-chart?user_id=${userId}`
);

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const COLORS = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4"
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={
                COLORS[
                  index % COLORS.length
                ]
              }
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;