import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import { useAppContext } from "../hooks/AppContext";

function AddFinancialGoal() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [deadline, setDeadline] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/financial-goals", {
        description: description,
        name: name,
        targetAmount: targetAmount,
        deadline: deadline,
        userId: state.data.id,
      });
      console.log("FinancialGoal added:", response.data);
      navigate("/financial-goals");
    } catch (error) {
      console.error("Error adding financial-goal:", error);
      setError("Error adding financial-goal");
    }
  };

  return (
    <div className="mt-4 flex">
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
              <h2>Add Financial Goal</h2>
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
    </div>
  );
}

export default AddFinancialGoal;
