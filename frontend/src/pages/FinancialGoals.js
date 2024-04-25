import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Col, Row, Table } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import { useAppContext } from "../hooks/AppContext";
import Loading from "../components/Loading";
import { formatUSD } from "../utils/Formatter";

function FinancialGoals() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [financialGoals, setFinancialGoals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.data != null) {
      fetchFinancialGoals();
    }
  }, [state]);

  const fetchFinancialGoals = async () => {
    try {
      setLoading(true);
      setFinancialGoals([]);
      const response = await axiosInstance.get(
        "/financial-goals/user/" + state.data.id,
      );
      setFinancialGoals(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Error fetching financial-goals");
    }
  };

  const handleDeleteFinancialGoal = async (id) => {
    try {
      await axiosInstance.delete(`/financial-goals/${id}`);
      // After deletion, fetch the updated list of budgets
      fetchFinancialGoals();
    } catch (error) {
      console.error(error);
      setError("Error deleting financial-goal");
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
                  to="/add-financial-goal"
                  variant="primary"
                  className="mb-3"
                >
                  Add Financial Goal
                </Button>
              </Col>
              <Col xs={6} className="text-center">
                <h2>Financial Goals</h2>
              </Col>
              <Col></Col>
            </Row>

            {error && <p className="error-message">{error}</p>}

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Deadline</th>
                  <th>Description</th>
                  <th>Target Amount</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {financialGoals.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.deadline}</td>
                    <td>{item.description}</td>
                    <td>{formatUSD(item.targetAmount)}</td>
                    <td style={{ width: "10%" }}>
                      <ButtonGroup className="mb-2" size="sm">
                        <Button
                          variant="success"
                          onClick={() =>
                            navigate("/edit-financial-goal/" + item.id)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteFinancialGoal(item.id)}
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

export default FinancialGoals;
