import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {

  const username =
    localStorage.getItem("username");

  const email =
    localStorage.getItem("email");

  const userId =
    localStorage.getItem("user_id");

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="dashboard-container">

        <h1>Profile</h1>

        <div className="card">

          <h2>{username}</h2>

          <p>
            Email: {email}
          </p>

          <p>
            User ID: {userId}
          </p>

        </div>

      </div>
    </>
  );
}

export default Profile;