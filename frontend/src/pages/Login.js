import React, { useContext, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import AppContext from "../hooks/AppContext";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axiosInstance
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        const token = response.data;
        const data = jwtDecode(token);
        localStorage.setItem("authToken", token);
        setToken({ token, data });
        navigate("/home");
      })
      .catch((error) => {
        setError(error.response.data.errorMessage);
      });
  };

  return (
    <div className="login-container mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form className="login-form" onSubmit={handleSubmit}>
            <h2 className="mb-4">Login</h2>

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
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
