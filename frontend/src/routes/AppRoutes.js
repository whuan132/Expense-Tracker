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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
