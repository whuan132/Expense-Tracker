import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import { useAppContext } from "../hooks/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

function EditFinancialGoal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [deadline, setDeadline] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance.get("/financial-goals/" + id).then((response) => {
      const d = response.data;
      setDeadline(d.deadline);
      setDescription(d.description);
      setTargetAmount(d.targetAmount);
      setName(d.name);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/financial-goals/" + id, {
        description: description,
        name: name,
        targetAmount: targetAmount,
        deadline: deadline,
        userId: state.data.id,
      });

      navigate("/financial-goals");
    } catch (error) {
      console.error(error);
      setError("Error adding financial-goal");
    }
  };

  return (
    <div className="mt-4 flex">
      {loading && <Loading />}

      {!loading && (
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Row className="justify-content-center">
              <Col className="text-md-start">
                <Button
                  as={Link}
                  to="/financial-goals"
                  variant="outline-danger"
                  className="mb-3"
                >
                  Back
                </Button>
              </Col>
              <Col xs={6} className="text-center">
                <h2>Update</h2>
              </Col>
              <Col></Col>
            </Row>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formDate" className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formAmount" className="mb-3">
                <Form.Label>Target Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </Form.Group>

              {error && <p className="error-message">{error}</p>}

              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default EditFinancialGoal;
