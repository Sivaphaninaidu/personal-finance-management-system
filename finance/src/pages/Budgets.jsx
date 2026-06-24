import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Budgets() {

  const [budgets, setBudgets] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    user_id: localStorage.getItem("user_id"),
    category: "",
    budget_amount: "",
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {

    try {

      const userId =
        localStorage.getItem("user_id");

      const res = await api.get(
        `/budgets/?user_id=${userId}`
      );

      setBudgets(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveBudget = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await api.put(
          `/budgets/${editId}`,
          form
        );

        alert(
          "Budget Updated Successfully"
        );

        setEditId(null);

      } else {

        await api.post(
          "/budgets/",
          form
        );

        alert(
          "Budget Added Successfully"
        );
      }

      fetchBudgets();

      setForm({
        user_id:
          localStorage.getItem("user_id"),
        category: "",
        budget_amount: "",
      });

    } catch (error) {

      console.log(error);

      alert(
        "Operation Failed"
      );
    }
  };

  const handleEdit = (budget) => {

    setEditId(budget.id);

    setForm({
      user_id:
        localStorage.getItem("user_id"),
      category: budget.category,
      budget_amount:
        budget.budget_amount,
    });
  };

  const deleteBudget = async (id) => {

    try {

      const res = await api.delete(
        `/budgets/${id}`
      );

      alert(res.data.message);

      fetchBudgets();

    } catch (error) {

      console.log(error);

      alert(
        "Delete Failed"
      );
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="dashboard-container">

        <h1>Budgets</h1>

        <form
          onSubmit={saveBudget}
          className="account-form"
        >

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            type="number"
            name="budget_amount"
            placeholder="Budget Amount"
            value={form.budget_amount}
            onChange={handleChange}
          />

          <button type="submit">
            {
              editId
                ? "Update Budget"
                : "Add Budget"
            }
          </button>

        </form>

        <table className="data-table">

          <thead>
            <tr>
              <th>Category</th>
              <th>Budget Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {budgets.map((budget) => (

              <tr key={budget.id}>

                <td>
                  {budget.category}
                </td>

                <td>
                  ₹ {budget.budget_amount}
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(budget)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteBudget(
                        budget.id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Budgets;