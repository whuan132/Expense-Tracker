import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Col, Row, Table } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import { useAppContext } from "../hooks/AppContext";
import Loading from "../components/Loading";
import { formatUSD } from "../utils/Formatter";

function Budgets() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.data != null) {
      fetchBudgets();
    }
  }, [state]);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      setBudgets([]);
      const response = await axiosInstance.get(
        "/budgets/user/" + state.data.id,
      );
      setBudgets(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Error fetching budgets");
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await axiosInstance.delete(`/budgets/${id}`);
      // After deletion, fetch the updated list of budgets
      fetchBudgets();
    } catch (error) {
      console.error(error);
      setError("Error deleting budget");
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
                  to="/add-budget"
                  variant="primary"
                  className="mb-3"
                >
                  Add Budget
                </Button>
              </Col>
              <Col xs={6} className="text-center">
                <h2>Budgets</h2>
              </Col>
              <Col></Col>
            </Row>

            {error && <p className="error-message">{error}</p>}

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Period</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((budget, index) => (
                  <tr key={budget.id}>
                    <td>{index + 1}</td>
                    <td>{budget.period}</td>
                    <td>{budget.description}</td>
                    <td>{budget.category}</td>
                    <td>{formatUSD(budget.amount)}</td>
                    <td style={{ width: "10%" }}>
                      <ButtonGroup className="mb-2" size="sm">
                        <Button
                          variant="success"
                          onClick={() => navigate("/edit-budget/" + budget.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteBudget(budget.id)}
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

export default Budgets;
