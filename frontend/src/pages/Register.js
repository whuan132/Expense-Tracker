import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "../styles/Register.css"; // Import custom CSS file for additional styling

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axiosInstance
      .post("/auth/register", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.errorMessage);
      });
  };

  return (
    <div className="login-container mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form className="register-form" onSubmit={handleSubmit}>
            <h2 className="mb-4">Register</h2>

            <InputGroup className="mb-3">
              <InputGroup.Text style={{ width: 6 + "em" }}>
                Username
              </InputGroup.Text>
              <Form.Control
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text style={{ width: 6 + "em" }}>
                Email
              </InputGroup.Text>
              <Form.Control
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text style={{ width: 6 + "em" }}>
                Password
              </InputGroup.Text>
              <Form.Control
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            {error && <p className="error-message">{error}</p>}

            <Button variant="primary" type="submit" className="mt-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
