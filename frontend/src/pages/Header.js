import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAppContext } from "../hooks/AppContext";
import logo from "../logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setState } = useAppContext();
  const [buttonLb, setButtonLb] = useState("Login");

  useEffect(() => {
    setButtonLb(location.pathname === "/login" ? "Register" : "Login");
    // set title
    const str = location.pathname.split("/").pop();
    document.title =
      "Expense Tracker - " + str.charAt(0).toUpperCase() + str.slice(1);
  }, [location]);

  const logoutHandler = () => {
    setState({ token: null, data: null });
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const buttonHandler = () => {
    buttonLb === "Login" ? navigate("/login") : navigate("/register");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {state.data != null ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/bugdet">Link</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}

        {state.data != null ? (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="/update-info">{state.data.email}</a>
            </Navbar.Text>
            <Button variant={"link"} onClick={logoutHandler}>
              Logout
            </Button>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-success" onClick={buttonHandler}>
              {buttonLb}
            </Button>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
