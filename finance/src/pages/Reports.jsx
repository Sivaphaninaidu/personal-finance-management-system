import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {

  const [report, setReport] = useState({
    total_accounts: 0,
    total_balance: 0,
    total_transactions: 0,
    total_bills: 0,
    total_expenses: 0,
    total_goals: 0,
    total_budgets: 0,
  });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {

    try {

      const userId =
        localStorage.getItem("user_id");

      const res = await api.get(
        `/dashboard/?user_id=${userId}`
      );

      setReport(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Personal Finance Report",
      20,
      20
    );

    autoTable(doc, {
      startY: 35,

      head: [["Field", "Value"]],

      body: [

        ["Username",
          localStorage.getItem("username")
        ],

        ["User ID",
          localStorage.getItem("user_id")
        ],

        ["Total Accounts",
          report.total_accounts
        ],

        ["Total Balance",
          `₹ ${report.total_balance}`
        ],

        ["Total Transactions",
          report.total_transactions
        ],

        ["Total Bills",
          report.total_bills
        ],

        ["Total Expenses",
          `₹ ${report.total_expenses}`
        ],

        ["Total Goals",
          report.total_goals
        ],

        ["Total Budgets",
          report.total_budgets
        ],

        ["Generated On",
          new Date().toLocaleString()
        ]

      ]
    });

    doc.save(
      "Finance_Report.pdf"
    );
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="dashboard-container">

        <h1>📄 Reports</h1>

        <div className="card-grid">

          <div className="card">
            <h3>Total Accounts</h3>
            <p>{report.total_accounts}</p>
          </div>

          <div className="card">
            <h3>Total Balance</h3>
            <p>₹ {report.total_balance}</p>
          </div>

          <div className="card">
            <h3>Total Transactions</h3>
            <p>{report.total_transactions}</p>
          </div>

          <div className="card">
            <h3>Total Bills</h3>
            <p>{report.total_bills}</p>
          </div>

          <div className="card">
            <h3>Total Expenses</h3>
            <p>₹ {report.total_expenses}</p>
          </div>

          <div className="card">
            <h3>Total Goals</h3>
            <p>{report.total_goals}</p>
          </div>

          <div className="card">
            <h3>Total Budgets</h3>
            <p>{report.total_budgets}</p>
          </div>

        </div>

        <br />

        <button
          onClick={exportPDF}
          className="edit-btn"
        >
          📥 Download PDF Report
        </button>

      </div>
    </>
  );
}

export default Reports;