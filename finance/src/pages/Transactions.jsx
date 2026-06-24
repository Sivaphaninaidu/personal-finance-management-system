import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    account_id: "",
    transaction_type: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    fetchTransactions();
    fetchAccounts();
  }, []);

 const fetchTransactions = async () => {

  const userId =
    localStorage.getItem("user_id");

  const res = await api.get(
    `/transactions/?user_id=${userId}`
  );

  setTransactions(res.data);
};

  const fetchAccounts = async () => {
  try {

    const userId =
      localStorage.getItem("user_id");

    const res = await api.get(
      `/accounts/?user_id=${userId}`
    );

    setAccounts(res.data);

  } catch (err) {
    console.log(err);
  }
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveTransaction = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/transactions/${editId}`, form);

        alert("Transaction Updated Successfully");

        setEditId(null);
      } else {
        await api.post("/transactions/", form);

       alert(
  `${res.data.message}
Current Balance: ₹ ${res.data.new_balance}`
);
      }

      fetchTransactions();

      setForm({
        account_id: "",
        transaction_type: "",
        amount: "",
        date: "",
      });

    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const handleEdit = (tx) => {
    setEditId(tx.id);

    setForm({
      account_id: tx.account_id,
      transaction_type: tx.transaction_type,
      amount: tx.amount,
      date: tx.date,
    });
  };

  const deleteTransaction = async (id) => {
    try {
      const res = await api.delete(`/transactions/${id}`);

      alert(res.data.message);

      fetchTransactions();

    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="dashboard-container">

        <h1>Transactions</h1>

        <form onSubmit={saveTransaction} className="account-form">

          <select
            name="account_id"
            value={form.account_id}
            onChange={handleChange}
          >
            <option value="">Select Account</option>

            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.account_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="transaction_type"
            placeholder="Credit / Debit"
            value={form.transaction_type}
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
  placeholder="Search Transaction..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-box"
/>

          <button type="submit">
            {editId ? "Update Transaction" : "Add Transaction"}
          </button>

        </form>

        <table className="data-table">

          <thead>
            <tr>
              <th>Account</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

           {transactions
  .filter((tx) =>
    tx.transaction_type
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((tx) => (
              <tr key={tx.id}>
                <td>{tx.account}</td>
                <td>{tx.transaction_type}</td>
                <td>₹ {tx.amount}</td>
                <td>{tx.date}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(tx)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTransaction(tx.id)}
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

export default Transactions;