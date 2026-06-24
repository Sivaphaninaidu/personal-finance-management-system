import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ChangePassword() {

  const [form, setForm] = useState({
    user_id: localStorage.getItem("user_id"),
    old_password: "",
    new_password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
      e.target.value,
    });
  };

  const submit = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post(
        "/auth/change-password",
        form
      );

      alert(res.data.message);

      setForm({
        ...form,
        old_password: "",
        new_password: "",
      });

    } catch (error) {

      console.log(error);

      alert("Operation Failed");
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="dashboard-container">

        <h1>Change Password</h1>

        <form
          onSubmit={submit}
          className="account-form"
        >

          <input
            type="password"
            name="old_password"
            placeholder="Old Password"
            value={form.old_password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={form.new_password}
            onChange={handleChange}
          />

          <button type="submit">
            Change Password
          </button>

        </form>

      </div>
    </>
  );
}

export default ChangePassword;