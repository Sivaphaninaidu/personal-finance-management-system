import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ExpenseChart from "../components/ExpenseChart";
import FinancialChart from "../components/FinancialChart";
import MonthlyChart from "../components/MonthlyChart";
import BalanceHistoryChart from "../components/BalanceHistoryChart";
import BudgetAnalysis from "../components/BudgetAnalysis";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Dashboard() {

  

  const navigate = useNavigate();

  const [data, setData] = useState({
    total_accounts: 0,
    total_balance: 0,
    total_transactions: 0,
    total_bills: 0,
    total_expenses: 0,
    total_goals: 0,
    total_budgets: 0,

    avg_balance: 0,
    avg_expense: 0,

    latest_account: "",
    latest_transaction: "",
    latest_bill: "",
    latest_expense: "",
    latest_goal: "",

    notifications: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const userId =
        localStorage.getItem("user_id");

      const res = await api.get(
        `/dashboard/?user_id=${userId}`
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="dashboard-container">

        <h1>📊 Personal Finance Dashboard</h1>

        <div className="welcome-banner">
          <h2>Welcome Back 👋</h2>
          <p>
            Track your accounts, expenses,
            bills and goals in one place.
          </p>
        </div>

        <div className="quick-actions">

  <button
    onClick={() => navigate("/accounts")}
  >
    ➕ Add Account
  </button>

  <button
    onClick={() => navigate("/transactions")}
  >
    💳 Add Transaction
  </button>

  <button
    onClick={() => navigate("/expenses")}
  >
    💸 Add Expense
  </button>

  <button
    onClick={() => navigate("/goals")}
  >
    🎯 Add Goal
  </button>

</div>

        <button
          onClick={fetchDashboard}
          className="refresh-btn"
        >
          🔄 Refresh Dashboard
        </button>

        <div className="notification-card">

          <h2>🔔 Notifications</h2>

          {data.notifications?.length > 0 ? (

            data.notifications.map(
              (note, index) => (
                <p key={index}>
                  {note}
                </p>
              )
            )

          ) : (

            <p>No Notifications</p>

          )}

        </div>

        <div className="card-grid">


          <div className="card">
            <h3>💳 Total Accounts</h3>
            <p>{data.total_accounts}</p>
          </div>

          <div className="card">
            <h3>💰 Total Balance</h3>
            <p>₹ {data.total_balance}</p>
          </div>

          <div className="card">
            <h3>📈 Transactions</h3>
            <p>{data.total_transactions}</p>
          </div>

          <div className="card">
            <h3>🧾 Bills</h3>
            <p>{data.total_bills}</p>
          </div>

          <div className="card">
            <h3>💸 Expenses</h3>
            <p>₹ {data.total_expenses}</p>
          </div>

          <div className="card">
            <h3>🎯 Goals</h3>
            <p>{data.total_goals}</p>
          </div>

          <div
            className="card"
            style={{
              gridColumn: "span 3"
            }}
          >
            <h2>Expense Distribution</h2>
            <ExpenseChart />
          </div>
          <div className="card">
  <h3>💵 Budgets</h3>
  <p>{data.total_budgets}</p>
</div>

          <div
            className="card"
            style={{
              gridColumn: "span 3"
            }}
          >
            <h2>Financial Summary</h2>
            <FinancialChart />
          </div>

          <div
            className="card"
            style={{
              gridColumn: "span 3"
            }}
          >
            <h2>📅 Monthly Income vs Expense</h2>
            <MonthlyChart />
          </div>

          <div
            className="card"
            style={{
              gridColumn: "span 3"
            }}
          >
            <h2>📈 Balance History</h2>
            <BalanceHistoryChart />
          </div>

          <div
            className="card"
            style={{
              gridColumn: "span 3"
            }}
          >
            <h2>💰 Budget vs Expense Analysis</h2>
            <BudgetAnalysis />
          </div>

          <div
            className="card"
            style={{
              gridColumn: "span 3"
            }}
          >
            <h2>🕒 Recent Activities</h2>

            <div className="recent-grid">

  <div className="summary-card">
    <h2>Financial Health</h2>

    <p>
      Total Balance:
      ₹ {data.total_balance}
    </p>

    <p>
      Total Expenses:
      ₹ {data.total_expenses}
    </p>

    <p>
      Goals:
      {data.total_goals}
    </p>
  </div>

  <div className="activity-box">
    <strong>Latest Account</strong>
    <p>{data.latest_account}</p>
  </div>

  <div className="activity-box">
    <strong>Latest Transaction</strong>
    <p>{data.latest_transaction}</p>
  </div>

  <div className="activity-box">
    <strong>Latest Bill</strong>
    <p>{data.latest_bill}</p>
  </div>

  <div className="activity-box">
    <strong>Latest Expense</strong>
    <p>{data.latest_expense}</p>
  </div>

  <div className="activity-box">
    <strong>Latest Goal</strong>
    <p>{data.latest_goal}</p>
  </div>

</div>

            


          </div>

          <div className="card">
            <h3>📊 Average Balance</h3>
            <p>₹ {data.avg_balance}</p>
          </div>

          <div className="card">
            <h3>📉 Average Expense</h3>
            <p>₹ {data.avg_expense}</p>
          </div>

          

        </div>

      </div>
      <Footer />
    </>
  );
}

export default Dashboard;