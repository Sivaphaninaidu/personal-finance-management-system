import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    user_id: localStorage.getItem("user_id"),
    goal_name: "",
    target_amount: "",
    saved_amount: "",
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const res = await api.get(`/goals/?user_id=${userId}`);
      setGoals(res.data);
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

  const saveGoal = async (e) => {
    e.preventDefault();

    try {
      if (editId) {

        const res = await api.put(
          `/goals/${editId}`,
          form
        );

        alert(res.data.message);

        setEditId(null);

      } else {

        const res = await api.post(
          "/goals/",
          form
        );

        alert(res.data.message);
      }

      fetchGoals();

      setForm({
        user_id: localStorage.getItem("user_id"),
        goal_name: "",
        target_amount: "",
        saved_amount: "",
      });

    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (goal) => {

    setEditId(goal.id);

    setForm({
      user_id: localStorage.getItem("user_id"),
      goal_name: goal.goal_name,
      target_amount: goal.target_amount,
      saved_amount: goal.saved_amount,
    });
  };

  const deleteGoal = async (id) => {

    try {

      const res = await api.delete(
        `/goals/${id}`
      );

      alert(res.data.message);

      fetchGoals();

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

        <h1>Goals</h1>

        <form
          onSubmit={saveGoal}
          className="account-form"
        >

          <input
            type="text"
            name="goal_name"
            placeholder="Goal Name"
            value={form.goal_name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="target_amount"
            placeholder="Target Amount"
            value={form.target_amount}
            onChange={handleChange}
          />

          <input
            type="number"
            name="saved_amount"
            placeholder="Saved Amount"
            value={form.saved_amount}
            onChange={handleChange}
          />
          <input
  type="text"
  placeholder="Search Goal..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-box"
/>

          <button type="submit">
            {editId ? "Update Goal" : "Add Goal"}
          </button>

        </form>

        <table className="data-table">

          <thead>
            <tr>
              <th>Goal Name</th>
              <th>Target Amount</th>
              <th>Saved Amount</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
  {goals
    .filter((goal) =>
      goal.goal_name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((goal) => {

      const progress =
        (goal.saved_amount /
          goal.target_amount) * 100;

      return (
        <tr key={goal.id}>

          <td>{goal.goal_name}</td>

          <td>
            ₹ {goal.target_amount}
          </td>

          <td>
            ₹ {goal.saved_amount}
          </td>

          <td>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`
                }}
              >
                {progress.toFixed(0)}%
              </div>
            </div>
          </td>

          <td>
            <div className="action-buttons">

              <button
                className="edit-btn"
                onClick={() =>
                  handleEdit(goal)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteGoal(goal.id)
                }
              >
                Delete
              </button>

            </div>
          </td>

        </tr>
      );
    })}
</tbody>

        </table>

      </div>
    </>
  );
}

export default Goals;