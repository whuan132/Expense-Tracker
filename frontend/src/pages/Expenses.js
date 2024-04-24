import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link component from React Router
import axiosInstance from "../utils/axiosInstance";
import { useAppContext } from "../hooks/AppContext";

function Expenses() {
  const { state } = useAppContext();
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.data != null) {
      fetchExpenses();
    }
  }, [state]);

  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get(
        "/expenses/user/" + state.data.id,
      );
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
      setError("Error fetching expenses");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`/expenses/${id}`);
      // After deletion, fetch the updated list of expenses
      fetchExpenses();
    } catch (error) {
      console.error(error);
      setError("Error deleting expense");
    }
  };

  return (
    <div className="mt-4">
      <div className="text-center">
        <h2>Expenses</h2>
      </div>
      {error && <p className="error-message">{error}</p>}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          {" "}
          {/* Set width to 80% on medium and large screens */}
          <Button
            as={Link}
            to="/add-expense"
            variant="primary"
            className="mb-3"
          >
            Add Expense
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{expense.date}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>${expense.amount}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default Expenses;
