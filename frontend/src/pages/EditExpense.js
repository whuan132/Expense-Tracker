import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import { useAppContext } from "../hooks/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance.get("/expenses/" + id).then((response) => {
      const expense = response.data;
      setDate(expense.date);
      setDescription(expense.description);
      setCategory(expense.category);
      setAmount(expense.amount);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/expenses/" + id, {
        date: date,
        description: description,
        category: category,
        amount: amount,
        userId: state.data.id,
      });

      navigate("/expenses");
    } catch (error) {
      console.error(error);
      setError("Error adding expense");
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
                to="/expenses"
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
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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

export default EditExpense;
