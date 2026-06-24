import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  try {

    const res = await api.post(
      "/auth/login",
      form
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user_id",
      res.data.user_id
    );

    localStorage.setItem(
      "username",
      res.data.username
    );

    localStorage.setItem(
      "email",
      res.data.email
    );

    navigate("/dashboard");

  } catch (error) {
    console.log(error);
    alert("Login Failed");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Login</h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p style={{ marginTop: "15px" }}>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;