import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import { useAppContext } from "../hooks/AppContext";

function AddBudget() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [period, setPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/budgets", {
        description: description,
        category: category,
        amount: amount,
        period: period,
        userId: state.data.id,
      });
      console.log("Budget added:", response.data);
      navigate("/budgets");
    } catch (error) {
      console.error("Error adding budget:", error);
      setError("Error adding budget");
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
                to="/budgets"
                variant="outline-danger"
                className="mb-3"
              >
                Back
              </Button>
            </Col>
            <Col xs={6} className="text-center">
              <h2>Add Budget</h2>
            </Col>
            <Col></Col>
          </Row>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Period</Form.Label>
              <Form.Control
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
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
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAmount" className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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

export default AddBudget;
