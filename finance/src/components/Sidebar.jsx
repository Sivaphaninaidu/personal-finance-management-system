import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/accounts">Accounts</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/bills">Bills</Link>
      <Link to="/goals">Goals</Link>
       <li>
  <Link to="/budgets">
    Budgets
  </Link>
</li>
 <li>
  <Link to="/reports">
    📄 Reports
  </Link>
</li>
<li>
  <Link to="/profile">Profile</Link>
</li>
      <li>
  <Link to="/change-password">
    🔒 Change Password
  </Link>
</li>


<div className="sidebar-footer">
  <p>PFMS v1.0</p>
</div>
    </div>
    

    
  );
}

export default Sidebar;