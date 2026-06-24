import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { saveAs } from "file-saver";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    user_id: localStorage.getItem("user_id"),
    account_name: "",
    account_number: "",
    card_type: "",
    balance: "",
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

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

 const saveAccount = async (e) => {
  e.preventDefault();

  try {

    if (editId !== null) {

      const res = await api.put(
        `/accounts/${editId}`,
        form
      );

      alert(res.data.message);

      setEditId(null);

    } else {

      const res = await api.post(
        "/accounts/",
        form
      );

      alert(res.data.message);
    }

    fetchAccounts();

    setForm({
      user_id: localStorage.getItem("user_id"),
      account_name: "",
      account_number: "",
      card_type: "",
      balance: "",
    });

  } catch (err) {
    console.log(err);
    alert("Operation Failed");
  }
};
  const deleteAccount = async (id) => {
  try {
    const res = await api.delete(`/accounts/${id}`);

    alert(res.data.message);

    fetchAccounts();

  } catch (error) {
    console.log(error);
    alert("Delete Failed");
  }
};
const handleEdit = (acc) => {
  setEditId(acc.id);

  setForm({
    user_id: localStorage.getItem("user_id"),
    account_name: acc.account_name,
    account_number: acc.account_number,
    card_type: acc.card_type,
    balance: acc.balance,
  });
};

const exportCSV = () => {

  let csv =
    "Name,Number,Balance\n";

  accounts.forEach(acc => {

    csv +=
      `${acc.account_name},${acc.account_number},${acc.balance}\n`;

  });

  const blob = new Blob(
    [csv],
    { type: "text/csv;charset=utf-8;" }
  );

  saveAs(
    blob,
    "accounts.csv"
  );
};


  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="dashboard-container">

        <h1>Accounts</h1>

        <form onSubmit={saveAccount} className="account-form">

          <input
            type="text"
            name="account_name"
            placeholder="Account Name"
            value={form.account_name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="account_number"
            placeholder="Account Number"
            value={form.account_number}
            onChange={handleChange}
          />

          <input
            type="text"
            name="card_type"
            placeholder="Card Type"
            value={form.card_type}
            onChange={handleChange}
          />

          <input
            type="number"
            name="balance"
            placeholder="Balance"
            value={form.balance}
            onChange={handleChange}
          />
          <input
  type="text"
  placeholder="Search Account..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-box"
/>

          <button type="submit">
  {editId ? "Update Account" : "Add Account"}
</button>
<button onClick={exportCSV}>
 Export CSV
</button>

        </form>

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Account Number</th>
              <th>Card Type</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {accounts
  .filter((acc) =>
    acc.account_name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((acc) => (
              <tr key={acc.id}>
                <td>{acc.account_name}</td>
                <td>{acc.account_number}</td>
                <td>{acc.card_type}</td>
                <td>₹ {acc.balance}</td>
                <td className="action-buttons">

  <button
    type="button"
    className="edit-btn"
    onClick={() => handleEdit(acc)}
  >
    Edit
  </button>

  <button
    type="button"
    className="delete-btn"
    onClick={() => deleteAccount(acc.id)}
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

export default Accounts;