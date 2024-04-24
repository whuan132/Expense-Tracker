import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import { useAppContext } from "../hooks/AppContext";
import { useNavigate } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.data != null) {
      setUsername(state.data.username);
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axiosInstance
      .put("/users/" + state.data.id, {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/home");
      })
      .catch((response) => {
        console.error(error);
        setError(error.response.data.errorMessage);
      });
  };

  return (
    <div className="login-container mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form className="login-form" onSubmit={handleSubmit}>
            <h2 className="mb-4">Update</h2>

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
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Update;
