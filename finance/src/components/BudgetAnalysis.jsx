import { useEffect, useState } from "react";
import api from "../api/axios";

function BudgetAnalysis() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {

    const userId =
      localStorage.getItem("user_id");

    const res = await api.get(
      `/budgets/analysis?user_id=${userId}`
    );

    setData(res.data);
  };

  return (
    <table className="data-table">

      <thead>
        <tr>
          <th>Category</th>
          <th>Budget</th>
          <th>Spent</th>
          <th>Remaining</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>

        {data.map((item, index) => (

          <tr key={index}>

            <td>{item.category}</td>

            <td>
              ₹ {item.budget}
            </td>

            <td>
              ₹ {item.spent}
            </td>

            <td>
              ₹ {item.remaining}
            </td>

            <td>
              {item.status}
            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default BudgetAnalysis;