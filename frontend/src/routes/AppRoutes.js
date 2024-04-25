import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import About from "../pages/About";
import Update from "../pages/Update";
import Expenses from "../pages/Expenses";
import AddExpense from "../pages/AddExpense";
import EditExpense from "../pages/EditExpense";
import Budgets from "../pages/Budgets";
import AddBudget from "../pages/AddBudget";
import EditBudget from "../pages/EditBudget";
import FinancialGoals from "../pages/FinancialGoals";
import AddFinancialGoal from "../pages/AddFinancialGoal";
import EditFinancialGoal from "../pages/EditFinancialGoal";
import Report from "../pages/Report";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-info" element={<Update />} />

        <Route path="/expenses" element={<Expenses />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/edit-expense/:id" element={<EditExpense />} />

        <Route path="/budgets" element={<Budgets />} />
        <Route path="/add-budget" element={<AddBudget />} />
        <Route path="/edit-budget/:id" element={<EditBudget />} />

        <Route path="/financial-goals" element={<FinancialGoals />} />
        <Route path="/add-financial-goal" element={<AddFinancialGoal />} />
        <Route
          path="/edit-financial-goal/:id"
          element={<EditFinancialGoal />}
        />

        <Route path="/report" element={<Report />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
