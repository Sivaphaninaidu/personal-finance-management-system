import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



function Navbar() {
  

  const navigate = useNavigate();

  useEffect(() => {

  const savedTheme =
    localStorage.getItem("theme");

  if (savedTheme === "dark") {

    document.body.classList.add(
      "dark-mode"
    );
  }

}, []);

  const username =
    localStorage.getItem("username");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");

    navigate("/");
  };
  const toggleTheme = () => {

  document.body.classList.toggle(
    "dark-mode"
  );

  localStorage.setItem(
    "theme",
    document.body.classList.contains(
      "dark-mode"
    )
      ? "dark"
      : "light"
  );
};

  return (
    <div className="navbar">

      <h2
  className="logo-title"
  onClick={() => navigate("/dashboard")}
>
  PFMS
</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}
      >

        <div className="user-profile">

          <div className="avatar">
            {username
              ? username.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <h4>{username}</h4>
            <p>Personal Finance User</p>
          </div>

        </div>

        <div className="navbar-right">

  <span>
    {new Date().toLocaleDateString()}
  </span>

  <span>
    {new Date().toLocaleTimeString()}
  </span>

</div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
        <button
  className="theme-btn"
  onClick={toggleTheme}
>
  🌙
</button>

      </div>

    </div>
  );
}

export default Navbar;