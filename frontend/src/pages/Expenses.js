import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import Link component from React Router
import axiosInstance from "../utils/axiosInstance";
import { useAppContext } from "../hooks/AppContext";
import Loading from "../components/Loading";
import { formatUSD } from "../utils/Formatter";

function Expenses() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.data != null) {
      fetchExpenses();
    }
  }, [state]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setExpenses([]);
      const response = await axiosInstance.get(
        "/expenses/user/" + state.data.id,
      );
      setExpenses(response.data);
      setLoading(false);
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
      {loading && <Loading />}

      {!loading && (
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Row className="justify-content-center">
              <Col className="text-md-start">
                <Button
                  as={Link}
                  to="/add-expense"
                  variant="primary"
                  className="mb-3"
                >
                  Add Expense
                </Button>
              </Col>
              <Col xs={6} className="text-center">
                <h2>Expenses</h2>
              </Col>
              <Col></Col>
            </Row>

            {error && <p className="error-message">{error}</p>}

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
                {expenses.map((expense, index) => (
                  <tr key={expense.id}>
                    <td>{index + 1}</td>
                    <td>{expense.date}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>{formatUSD(expense.amount)}</td>
                    <td style={{ width: "10%" }}>
                      <ButtonGroup className="mb-2" size="sm">
                        <Button
                          variant="success"
                          onClick={() =>
                            navigate("/edit-expense/" + expense.id)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteExpense(expense.id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Expenses;
