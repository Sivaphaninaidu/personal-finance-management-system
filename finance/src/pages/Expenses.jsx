import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    user_id: localStorage.getItem("user_id"),
    category: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const res = await api.get(
  `/expenses/?user_id=${userId}`
);
      setExpenses(res.data);
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

  const saveExpense = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const res = Expense.objects.filter(user_id=user_id).get(id=editId).update(
          category=form.category,
          amount=form.amount,
          date=form.date);

        alert(res.data.message);

        setEditId(null);

      } else {

        const res = await api.post(
          "/expenses/",
          form
        );

        alert(res.data.message);
      }

      fetchExpenses();

      setForm({
        user_id: localStorage.getItem("user_id"),
        category: "",
        amount: "",
        date: "",
      });

    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (expense) => {

    setEditId(expense.id);

    setForm({
      user_id: localStorage.getItem("user_id"),
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
    });
  };

  const deleteExpense = async (id) => {

    try {

      const res = await api.delete(
        `/expenses/${id}`
      );

      alert(res.data.message);

      fetchExpenses();

    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="dashboard-container">

        <h1>Expenses</h1>

        <form
          onSubmit={saveExpense}
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
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <input
  type="text"
  placeholder="Search Expense..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-box"
/>

          <button type="submit">
            {editId ? "Update Expense" : "Add Expense"}
          </button>

        </form>

        <table className="data-table">

          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {expenses
  .filter((expense) =>
    expense.category
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((expense) => (
              <tr key={expense.id}>

                <td>{expense.category}</td>
                <td>₹ {expense.amount}</td>
                <td>{expense.date}</td>

                <td>

                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(expense)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() =>
                      deleteExpense(expense.id)
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

export default Expenses;