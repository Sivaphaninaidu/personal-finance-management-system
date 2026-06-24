import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Bills() {
  const [bills, setBills] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    user_id: localStorage.getItem("user_id"),
    bill_name: "",
    description: "",
    amount: "",
    due_date: "",
  });

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const res = await api.get(`/bills/?user_id=${userId}`);
      setBills(res.data);
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

  const saveBill = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const res = await api.put(
          `/bills/${editId}`,
          form
        );

        alert(res.data.message);

        setEditId(null);

      } else {

        const res = await api.post(
          "/bills/",
          form
        );

        alert(res.data.message);
      }

      fetchBills();

      setForm({
        user_id: localStorage.getItem("user_id"),
        bill_name: "",
        description: "",
        amount: "",
        due_date: "",
      });

    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (bill) => {

    setEditId(bill.id);

    setForm({
      user_id: localStorage.getItem("user_id"),
      bill_name: bill.bill_name,
      description: bill.description,
      amount: bill.amount,
      due_date: bill.due_date,
    });
  };

  const deleteBill = async (id) => {

    try {

      const res = await api.delete(
        `/bills/${id}`
      );

      alert(res.data.message);

      fetchBills();

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

        <h1>Bills</h1>

        <form
          onSubmit={saveBill}
          className="account-form"
        >

          <input
            type="text"
            name="bill_name"
            placeholder="Bill Name"
            value={form.bill_name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
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
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
          />
          <input
  type="text"
  placeholder="Search Bill..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-box"
/>

          <button type="submit">
            {editId ? "Update Bill" : "Add Bill"}
          </button>

        </form>

        <table className="data-table">

          <thead>
            <tr>
              <th>Bill Name</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {bills
  .filter((bill) =>
    bill.bill_name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((bill) => (
              <tr key={bill.id}>

                <td>{bill.bill_name}</td>
                <td>{bill.description}</td>
                <td>₹ {bill.amount}</td>
                <td>{bill.due_date}</td>

                <td>

                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(bill)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() =>
                      deleteBill(bill.id)
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

export default Bills;