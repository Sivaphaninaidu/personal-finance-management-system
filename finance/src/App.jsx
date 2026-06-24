import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Bills from "./pages/Bills";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import ProtectedRoute from "./components/ProtectedRoute";
import Reports from "./pages/Reports";
import Budgets from "./pages/Budgets";
import Profile from "./pages/Profile";
import ChangePassword
from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
  path="/change-password"
  element={<ChangePassword />}
/>
        <Route
  path="/budgets"
  element={<Budgets />}
/>
        <Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route
  path="/accounts"
  element={
    <ProtectedRoute>
      <Accounts />
    </ProtectedRoute>
  }
/>
        <Route
  path="/transactions"
  element={
    <ProtectedRoute>
      <Transactions />
    </ProtectedRoute>
  }
/>
        <Route
  path="/bills"
  element={
    <ProtectedRoute>
      <Bills />
    </ProtectedRoute>
  }
/>
        <Route
  path="/expenses"
  element={
    <ProtectedRoute>
      <Expenses />
    </ProtectedRoute>
  }
/>
        <Route
  path="/goals"
  element={
    <ProtectedRoute>
      <Goals />
    </ProtectedRoute>
  }
/>

<Route
  path="*"
  element={<NotFound />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;